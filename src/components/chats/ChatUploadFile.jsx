import { useState, useEffect, useContext } from "react";
import { serverTimestamp } from "firebase/database";
import { get, query, ref, update, set, onChildAdded, push } from "firebase/database";
import { db, storage } from "../../service/firebase-config";
import { AppContext } from "../../AppContext";
import { updateUserData } from "../../service/users.service";
import { uploadFile } from "../../service/auth.service";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

export function ChatUploadFile({handleFileUploaded}) {
    // Upload File State: Create a state to store the file and loading state.
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const { user } = useContext(AppContext);
    const [picURL, setPicURL] = useState('');
    // handleFileUploaded = picURL //?

    function handleUploadFile(e) {

        e.preventDefault();

        if (e.target.files[0] !== null) {
          const file = e.target.files[0];
          uploadMessagePhoto(photoURL => {
            setPicURL(photoURL);
            setFile({});
          }, file);
        }
        // uploadFileURL()
    handleFileUploaded(picURL)
    }

     const uploadMessagePhoto = (listenFn, file) => {
        const fileRef = storageRef(storage, user.uid + '/' + file.name);
      
        return uploadBytes(fileRef, file)
          .then(() => getDownloadURL(fileRef))
          .then((photoURL) => listenFn(photoURL))
          .catch(e => console.error('Error uploading file:', e.message));
      }
      const handleMessageSend = () => {
        if (!picURL) return;
            const messageToSend = picURL //? `${message}\n${picURL}` : message;
        
    };

    // const handleAcceptMessage = async (newMessage) => {
    //     if (!newMessage.trim()) return;
    //     await sendMessage(newMessage, id, user)
    //     setNewMessage("");
    // };

    function uploadFileURL() {
        if (!file) {
            console.error('No file selected.');
            return;
        }
        setLoading(true);


        // Assuming uploadFile is a function that handles the file upload
        uploadFile(file, user, setLoading)
            .then((photoURL) => {
                if (user) {
                    user.fileURL = photoURL; // Update with the correct property name (e.g., fileURL)
                    updateUserData(user?.uid, user);
                } else {
                    console.error('Error updating user data: User is undefined');
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
                setLoading(false);
            });
    }
    return (

        <div className="inline-block" title="Attached File">
            <input onChange={handleUploadFile} type="file"  accept="image/jpeg, image/png, image/jpg" className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className="border-transparent btn group/tooltip group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16">
                <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                    <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                        Attached File
                    </span>
                </div>
                <i className="ri-attachment-line"></i>
            </label>

            {file && (
                <button onClick={handleMessageSend} type="submit" className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600 ml-2">
                    {loading ? 'Uploading...' : <i className="ri-send-plane-fill"></i>}
                </button>
            )}
        </div>
    )
}