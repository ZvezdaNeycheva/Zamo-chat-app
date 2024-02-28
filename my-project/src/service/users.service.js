import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { format } from 'date-fns';

export const getUserByHandle = (username = 'pesho') => {
  return get(ref(db, `users/${username}`));
};

export const createUserProfile = (uid, username = 'defaultUsername', FullName = 'defaultFullName', email, password, mobile, role = 'user', status = '', fiendsRequests = [], frendsList = []) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return set(ref(db, `users/${username}`), {
    uid,
    username,
    FullName,
    email,
    password,
    mobile,
    createdOnReadable: readableDate,
    role,
    status,
    fiendsRequests,
    frendsList,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserData = async (username, data) => {
  const userRef = ref(db, `users/${username}`);

  try {
    await update(userRef, data);
    console.log("User data updated successfully.");
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserRole = async (uid, newRole) => {
  return update(ref(db, `users/${uid}`), { role: newRole });
};

export const getUsersCount = async () => {
  const snapshot = await get(query(ref(db, 'users')));
  return snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
};