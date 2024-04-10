import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { uploadProfileImage, uploadBackgroundPhoto } from "../../service/auth.service";
import { updateUserData } from "../../service/users.service";

export function Profile() {
  const { user, setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [open, setOpen] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openAboutDropdown, setOpenAboutDropdown] = useState(false);
  const [openFilesDropdown, setOpenFilesDropdown] = useState(false);
  const [openFileDetailsDropdown, setFileDetailsDropdown] = useState(false);

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editLocation, setEditLocation] = useState(false);

  const [newUsername, setNewUsername] = useState(user ? user.username : "");
  const [newEmail, setNewEmail] = useState(user ? user.email : "");
  const [newLocation, setNewLocation] = useState(user ? user.location : "");

  const [editedUsername, setEditedUsername] = useState(user ? user.username : "");
  const [editedEmail, setEditedEmail] = useState(user ? user.email : "");
  const [editedLocation, setEditedLocation] = useState(user ? user.location : "");

  const [attachedFiles, setAttachedFiles] = useState([]);

  const [localStatus, setLocalStatus] = useState(user ? user.status : "Loading...");

  const toggleDropdown = (dropdownSetter) => {
    dropdownSetter(prevState => !prevState);
  };

  async function handleUploadPhoto(e) {
    if (!user) return;
    const photo = e.target.files[0];
    if (photo) {
      try {
        const profilePhotoURL = await uploadProfileImage(photo, user, setLoading);
        await updateUserData(user?.uid, { profilePhotoURL });
        setUser({ ...user, profilePhotoURL });
      } catch (e) {
        console.error('Error uploading profile image:', e);
      }
    }
  }

  async function handleBackgroundPhoto(e) {
    if (!user) return;
    const photo = e.target.files[0];
    if (photo) {
      try {
        const profileBackgroundURL = await uploadBackgroundPhoto(photo, user, setLoading2);
        await updateUserData(user?.uid, { profileBackgroundURL });
        setUser({ ...user, profileBackgroundURL });
      } catch (e) {
        console.error('Error uploading background image:', e);
      }
    }
  }

  useEffect(() => {
    if (user && user.fileURL) {
      const filesArray = Array.isArray(user.fileURL) ? user.fileURL : [user.fileURL];
      setAttachedFiles(filesArray);
    }
  }, [user]);

  const handleUsernameUpdate = async () => {
    try {
      await updateUserData(user?.uid, { username: editedUsername });
      setEditUsername(false);
      setUser({ ...user, username: editedUsername });
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleEmailUpdate = async () => {
    try {
      await updateUserData(user?.uid, { email: editedEmail });
      setEditEmail(false);
      setUser({ ...user, email: editedEmail });
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleLocationUpdate = async () => {
    try {
      await updateUserData(user?.uid, { location: editedLocation });
      setEditLocation(false);
      setUser({ ...user, location: editedLocation });
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setLocalStatus(status);
      await updateUserData(user.uid, { status });
      setOpenStatusDropdown(false);
      setUser({ ...user, status });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const currentUser = firebase.auth().currentUser;
      await currentUser.delete();
      await firebase.firestore().collection("users").doc(currentUser.uid).delete();
      await firebase.database().ref("users").child(currentUser.uid).remove();
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <div>
        {/* Start profile Header */}
        <div className="bg-cover bg-center relative">
          <img src={user?.profileBackgroundURL || "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} className="w-full h-80 object-cover absolute" alt="background" />

          {/* Add Background Img */}
          <div className="absolute h-32 w-32 right-20 top-40">
            <input type="file" onChange={handleBackgroundPhoto} id="file" name="file" className="hidden" />
            <label disabled={loading2} htmlFor="file"
              className="left-40 absolute bottom-6 pt-2 pl-3 ri-pencil-fill w-10 h-10 bg-gray-100 rounded-full dark:bg-zinc-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200" />
          </div>

          {/* Drop Down for Delete Profile */}
          <div className="px-6 pt-6">
            <div className="ltr:float-right rtl:float-left">
              <div className={`relative flex-shrink-0 dropdown `}>
                <button onClick={() => toggleDropdown(setOpen)} className="mr-10 mt-5 text-white" data-bs-toggle="dropdown" id="dropdownMenuButtonA">
                  <i className="text-3xl ri-more-2-fill" />
                </button>
                <ul className={`${open ? "visible" : "invisible"} absolute z-50 block w-40 py-2 text-left list-none bg-red-700 border border-transparent rounded shadow-lg rtl:right-auto rtl:left-0 ltr:left-auto ltr:right-0 my-7 bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600`} aria-labelledby="dropdownMenuButtonA">
                  <li>
                    <button onClick={handleDeleteAccount} className="block w-full px-4 py-2 text-sm font-normal text-white bg-transparent dropdown-item whitespace-nowrap hover:bg-red-800 dark:text-black-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" type="button">
                      Delete your account
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Title */}
            <div className="relative">
              <h4 className="mb-0 text-center text-white absolute left-0 top-0 h-16 text-4xl "> My Profile </h4>
            </div>
          </div>

          {/* Profile picture */}
          <div className="p-6 text-center">
            <div className="mb-4 relative flex flex-col items-start justify-end top-24">
              <input type="file" onChange={handleUploadPhoto} id="file" name="file" className="hidden" />
              <label disabled={loading} htmlFor="file" className="left-40 absolute bottom-6 pt-2 ri-pencil-fill w-10 h-10 bg-gray-100 rounded-full dark:bg-zinc-800 dark:text-gray-100 cursor-pointer hover:bg-gray-200" />
              <img src={user?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} className="sm:w-30 sm:h-30 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-70 xl:h-70 2xl:w-80 2xl:h-80 p-1 border border-gray-100 rounded-full dark:border-zinc-800" alt="Avatar" />
            </div>
          </div>

        </div>
        {/* End profile Header */}


        <div className="grid grid-cols-2">
          {/* Username and Status*/}
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg w-80 h-auto mt-20 ml-5">

            <h5 className="mb-1 text-lg font-semibold text-black-700 dark:text-gray-50 border-b-2 ">About</h5>

            {/* Dropdown menu for status*/}
            <div className="relative mb-1 flex mt-2">
              <div className="mb-1 text-lg font-semibold text-gray-800 dark:text-gray-50 mt-1">Status: </div>

              <div className="relative ml-2">
                <button onClick={() => toggleDropdown(setOpenStatusDropdown)} className="flex items-center justify-between px-4 py-2 text-sm font-medium bg-gray-50 dark:text-gray-300 rounded-md focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-600 transition duration-300 ease-in-out">
                  <span className="flex items-center">
                    <span className={`text-${localStatus === 'Online' ? 'green' : 'red'}-500 mr-2`}>
                      <i className={`ri-record-circle-fill text-10`} />
                    </span>
                    {localStatus}
                  </span>
                  <i className={`mdi mdi-chevron-down ${openStatusDropdown ? "transform rotate-180" : ""} text-gray-400`} />
                </button>
                <div className={`${openStatusDropdown ? "" : "hidden"} absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-md`}>
                  <ul className="py-1">
                    <li>
                      <button onClick={() => handleStatusChange('Online')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                        <i className="text-green-500 ri-record-circle-fill text-10 mr-2" />
                        Online
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleStatusChange('Busy')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                        <i className="text-orange-500 ri-error-warning-fill text-10 mr-2" />
                        Busy
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleStatusChange('Away')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                        <i className="text-yellow-500 ri-time-fill text-10 mr-2" />
                        Away
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleStatusChange('Offline')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left">
                        <i className="text-red-500 ri-record-circle-fill text-10 mr-2" />
                        Offline
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <div>
                <div>
                  <div className="mb-2 flex items-center">
                    <span className="inline-block w-3 h-6 mr-2">
                      <i className="ri-user-fill text-gray-500 dark:text-gray-400"></i>
                    </span>
                    <p className="text-gray-500 dark:text-gray-300">Username</p>
                  </div>
                  {editUsername ? (
                    <>
                      <input value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} type="text" className="w-full p-2 mb-2 border rounded border-gray-100 dark:border-zinc-600" />
                      <button onClick={handleUsernameUpdate} className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50">
                        Save
                      </button>
                      <button onClick={() => { setEditUsername(false); setEditedUsername(user ? user.username : "") }} className="ml-2 py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50" >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <h5 className="text- dark:text-gray-50">{user ? user.username : "N/A"}</h5>
                      <button onClick={() => setEditUsername(true)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center">
                    <span className="inline-block w-3 h-6 mr-2">
                      <i className="ri-mail-fill text-gray-500 dark:text-gray-400"></i>
                    </span>
                    <p className="text-gray-500 dark:text-gray-300">Email</p>
                  </div>
                  {editEmail ? (
                    <>
                      <input value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} type="text" className="w-full p-2 mb-2 border rounded border-gray-100 dark:border-zinc-600" />
                      <button onClick={handleEmailUpdate} className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50" >
                        Save
                      </button>
                      <button onClick={() => { setEditEmail(false); setEditedEmail(user ? user.email : "") }} className="ml-2 py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50" >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <h5 className="dark:text-gray-50">{user ? user.email : "N/A"}</h5>
                      <button onClick={() => setEditEmail(true)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100" >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center">
                    <span className="inline-block w-3 h-6 mr-2">
                      <i className="ri-map-pin-2-fill text-gray-500 dark:text-gray-400"></i>
                    </span>
                    <p className="text-gray-500 dark:text-gray-300">Location</p>
                  </div>
                  {editLocation ? (
                    <>
                      <input value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} type="text" className="w-full p-2 mb-2 border rounded border-gray-100 dark:border-zinc-600" />
                      <button onClick={handleLocationUpdate} className="py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50" >
                        Save
                      </button>
                      <button onClick={() => { setEditLocation(false); setEditedLocation(user ? user.location : "") }} className="ml-2 py-1.5 btn bg-slate-100 border-transparent rounded hover:bg-gray-50 transition-all ease-in-out dark:bg-zinc-600 dark:text-gray-50 dark:hover:bg-zinc-500/50">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <h5 className=" dark:text-gray-50">{user ? user.location : "N/A"}</h5>
                      <button onClick={() => setEditLocation(true)} className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Time */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center">
                    <span className="inline-block w-3 h-6 mr-2">
                      <i className="ri-calendar-fill text-gray-500 dark:text-gray-400"></i>
                    </span>
                    <p className="text-gray-500 dark:text-gray-300">Create Profile Date</p>
                  </div>
                  <h5 className="dark:text-gray-50">{user ? user.createdOnReadable : "N/A"}</h5>
                </div>
              </div>
            </div>
          </div>
          {/* End Profile Status and Username*/}

          {/* Start user-profile-desc */}
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg w-auto h-auto mr-10">
            <h5 className="mb-1 text-lg font-semibold text-black-700 dark:text-gray-50 border-b-2">Profile Information</h5>

          </div>
        </div>
      </div>
    </>
  );
}