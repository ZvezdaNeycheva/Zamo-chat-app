import { get, set, ref, query, equalTo, orderByChild, update, getDatabase, push, child, onValue } from 'firebase/database';
import { db } from './firebase-config';
import { format } from 'date-fns';

export const getAllUsers = async () => {
  const snapshot = await get(query(ref(db, "users")));
  if (!snapshot.exists()) {
    return [];
  }
  const users = Object.keys(snapshot.val()).map((key) => ({
    id: key,
    ...snapshot.val()[key],
  }));

  return users;
}

export const getUserByUid = async (uid) => {
  const snapshot = await get(ref(db, `users/${uid}`));
  if (!snapshot.exists()) {
    throw new Error('User ' + uid + ' does not exist.');
  }
  return snapshot.val();
};

export const createUserProfile = (uid, username, email, phoneNumber, password, role = 'user', status, friendsList, sentRequests, pendingRequests) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return set(ref(db, `users/${uid}`), {
    uid,
    username,
    email,
    password,
    phoneNumber,
    createdOnReadable: readableDate,
    role,
    status,
    friendsList,
    sentRequests,
    pendingRequests,
    profilePhotoURL: '',
    fileURL: '',
    location: '',
  });
};

export const updateUserData = async (uid, data) => {
  const userRef = ref(db, `users/${uid}`);

  try {
    await update(userRef, data);
    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  const usersRef = query(ref(db, 'users'), orderByChild('username'), equalTo(username));
  const snapshot = await get(usersRef);
  if (!snapshot.exists()) {
    throw new Error('User with username ' + username + ' does not exist.');
  }
  return snapshot.val();
};

// Friends List Management
const addFriend = async (currentUserUid, friendUid) => {
  try {
    const currentUserData = await getUserByUid(currentUserUid);
    const updatedFriendsList = [...(currentUserData.friendsList || []), friendUid];
    await updateUserData(currentUserUid, { friendsList: updatedFriendsList });
    console.log(`Friend added to ${currentUserUid}'s friendsList successfully.`);
  } catch (error) {
    console.error(`Error adding friend to ${currentUserUid}'s friendsList:`, error);
  }
};

export const removeFriend = async (currentUserUid, friendUid) => {
  try {
    // Remove friendUid from currentUser's friend list
    const currentUserData = await getUserByUid(currentUserUid);
    const updatedCurrentUserFriendsList = (currentUserData.friendsList || []).filter(uid => uid !== friendUid);
    await updateUserData(currentUserUid, { friendsList: updatedCurrentUserFriendsList });

    // Remove currentUserUid from friend's friend list
    const friendData = await getUserByUid(friendUid);
    const updatedFriendFriendsList = (friendData.friendsList || []).filter(uid => uid !== currentUserUid);
    await updateUserData(friendUid, { friendsList: updatedFriendFriendsList });

    console.log(`Friend ${friendUid} removed successfully.`);
  } catch (error) {
    console.error('Error deleting friend:', error);
    throw error;
  }
};


export const acceptFriendRequest = async (currentUserUid, senderUid) => {
  try {
    console.log('Attempting to accept friend request...');
    const senderUserData = await getUserByUid(senderUid);
    const currentUserData = await getUserByUid(currentUserUid);

    await addFriend(senderUid, currentUserUid);
    await addFriend(currentUserUid, senderUid);

    const updatedPendingRequests = (currentUserData.pendingRequests || []).filter(request => request !== senderUid);
    await updateUserData(currentUserUid, { pendingRequests: updatedPendingRequests });

    // Remove current user's UID from sender's sentRequests array
    const updatedSenderSentRequests = (senderUserData.sentRequests || []).filter(request => request !== currentUserUid);
    await updateUserData(senderUid, { sentRequests: updatedSenderSentRequests });

    console.log('Friend request accepted successfully.');
  } catch (error) {
    console.error('Error accepting friend request:', error);
  }
};

export const rejectFriendRequest = async (currentUserUid, senderUid, currentUserData) => {
  try {
    const updatedPendingRequests = currentUserData.pendingRequests.filter(request => request !== senderUid);
    await updateUserData(currentUserUid, { pendingRequests: updatedPendingRequests });

    // Remove current user's UID from sender's sentRequests array
    const senderUserData = await getUserByUid(senderUid);
    const updatedSenderSentRequests = (senderUserData.sentRequests || []).filter(request => request !== currentUserUid);
    await updateUserData(senderUid, { sentRequests: updatedSenderSentRequests });

    console.log('Friend request rejected successfully.');
  } catch (error) {
    console.error('Error rejecting friend request:', error);
  }
};


export const FriendsList = async (uid, onChange) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    onValue(userRef, async (snapshot) => {
      const userData = snapshot.val();
      const friendsList = userData.friendsList || {};

      const friendIds = Object.values(friendsList);

      const friendsData = await Promise.all(friendIds.map(async (friendUid) => {
        try {
          return await getUserByUid(friendUid);
        } catch (error) {
          console.error('Error fetching friend data:', error);
          return null;
        }
      }));

      const filteredFriendsData = friendsData.filter((friend) => friend !== null);
      onChange(filteredFriendsData);
    });
  } catch (error) {
    console.error('Error getting friends list:', error);
    throw error;
  }
};