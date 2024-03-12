import { get, set, ref, query, equalTo, orderByChild, update, getDatabase, push, child } from 'firebase/database';
import { db } from './firebase-config';
import { format } from 'date-fns';
import { auth } from './firebase-config';

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

export const getUserByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
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

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
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

export const getUserByEmail = async (email) => {
  try {
    const userSnapshot = await get(
      query(ref(db, 'users'), orderByChild('email'), equalTo(email))
    );
    return userSnapshot;
  } catch (error) {
    console.error('Error getting user by email:', error.message);
    throw error;
  }
};

// Friends List Management
export const addFriend = async (currentUserUid, friendUid) => {
  try {
    const currentUserDataSnapshot = await getUserByUid(currentUserUid);
    const currentUserData = currentUserDataSnapshot.val();
    const updatedFriendsList = [...(currentUserData.friendsList || []), friendUid];
    await updateUserData(currentUserUid, { friendsList: updatedFriendsList });
    console.log(`Friend added to ${currentUserUid}'s friendsList successfully.`);
  } catch (error) {
    console.error(`Error adding friend to ${currentUserUid}'s friendsList:`, error);
  }
};

export const removeFriend = async (currentUserUid, friendUid) => {
  try {
    const currentUserData = await getUserByUid(currentUserUid);
    const updatedFriendsList = currentUserData.friendsList.filter(id => id !== friendUid);
    await updateUserData(currentUserUid, { friendsList: updatedFriendsList });
    console.log(`Friend removed from ${currentUserUid}'s friendsList successfully.`);
  } catch (error) {
    console.error(`Error removing friend from ${currentUserUid}'s friendsList:`, error);
  }
};

export const handleAcceptFriendRequest = async (currentUserUid, senderUid) => {
  try {
    console.log('Attempting to accept friend request...');
    const senderUserDataSnapshot = await getUserByUid(senderUid);
    const senderUserData = senderUserDataSnapshot.val();
    const currentUserDataSnapshot = await getUserByUid(currentUserUid);
    const currentUserData = currentUserDataSnapshot.val();

    await addFriend(senderUid, currentUserUid);
    await addFriend(currentUserUid, senderUid);

    const updatedPendingRequests = (currentUserData.pendingRequests || []).filter(request => request !== senderUid);
    await updateUserData(currentUserUid, { pendingRequests: updatedPendingRequests });

    console.log('Friend request accepted successfully.');
  } catch (error) {
    console.error('Error accepting friend request:', error);
  }
};

export const handleRejectFriendRequest = async (currentUserUid, senderUid) => {
  try {
    const updatedPendingRequests = currentUserData.pendingRequests.filter(request => request !== senderUid);
    await updateUserData(currentUserUid, { pendingRequests: updatedPendingRequests });

    console.log('Friend request rejected successfully.');
  } catch (error) {
    console.error('Error rejecting friend request:', error);
  }
};

export const handleRemoveFriend = async (currentUserUid, friendUid) => {
  try {
    console.log('Removing friend...');

    await removeFriend(currentUserUid, friendUid);
    await removeFriend(friendUid, currentUserUid);

    console.log('Friend removed successfully.');
  } catch (error) {
    console.error('Error removing friend:', error);
  }
};

export const FriendsList = async (uid, setFriendsList) => {
  try {
    const userRef = ref(db, `users/${uid}`);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      const friendsList = userData.friendsList || {};

      const friendsPromises = friendsList.map((friendUid) => {
        const friendRef = ref(db, `users/${friendUid}`);
        return onValue(friendRef, (friendSnapshot) => friendSnapshot.val());
      });

      Promise.all(friendsPromises)
        .then((friendsData) => {
          setFriendsList(friendsData.filter((friend) => friend !== null));
        })
        .catch((error) => {
          console.error('Error fetching friends list:', error);
        });
    });
  } catch (error) {
    console.error('Error getting friends list:', error);
    throw error;
  }
};