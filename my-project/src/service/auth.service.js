import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, updateEmail } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { storage } from '../config/firebase-config';
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { updateUserData } from './users.service';

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const updateUserEmail = async (newEmail) => {
  const user = getAuth().currentUser;

  try {
    await updateEmail(user, newEmail);
    console.log("Email updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating email:", error);
    return false;
  }
};

// Storage
export async function uploadProfileImage(file, user, setLoading) {
  const fileRef = storageRef(storage, user.uid + '.png');

  setLoading(true);

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, file);

    // Get the download URL of the uploaded file
    const photoURL = await getDownloadURL(fileRef);

    // Update user's profile photo URL in the Realtime Database
    await updateUserData(user.displayName, { profilePhotoURL: photoURL });

    setLoading(false);
    alert('Profile image uploaded successfully.');
  } catch (error) {
    console.error("Error uploading profile image:", error);
    setLoading(false);
    // Handle the error accordingly
  }
}