import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChannelsIdsByGroup, fetchChannelsAll, createChannel, deleteChannel } from "../service/channel.service";
import { AppContext } from "../AppContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export function Channels() {
  const [channels, setChannels] = useState({});
  let { groupId } = useParams();
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // console.log({channels});

  useEffect(() => {
    const getChannels = async () => {
      const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
      const fetchedChannels = await fetchChannelsAll();
      const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
        if (fetchedChannels[key]) {
          acc[key] = fetchedChannels[key];
        }
        return acc;
      }
        , {});

      setChannels(filteredChannels);
    };
    getChannels();
  }, [groupId]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Set the entire user object
      } else {
        // No user is signed in.
        setCurrentUser(null);
      }
    });
  }, []);

  const handleCreateChannel = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    if (!userData) {
      console.error("No current user found. Cannot create channel.");
      return; // Exit the function if there's no current user
    }

    try {
      const creatorId = currentUser?.uid;
      const creatorName = userData.username;
      console.log("Creating channel with creator ID:", currentUser?.uid);
      console.log("Creating channel with creator name:", userData.username);
      await createChannel(groupId, creatorName, [userData.uid], channelName, creatorId);

      // Now, re-fetch the channels to update the UI
      fetchAndUpdateChannels();
      console.log("Channel created:", channelName);
      setIsModalVisible(false); // Close the modal
      setChannelName(''); // Reset the channel name input field
    } catch (error) {
      console.error("Failed to create channel:", error);
    }
  };

  const fetchAndUpdateChannels = async () => {
    const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
    const fetchedChannels = await fetchChannelsAll();
    const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
      if (fetchedChannels[key]) {
        acc[key] = fetchedChannels[key];
      }
      return acc;
    }, {});

    setChannels(filteredChannels);
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId);
      console.log("Channel deleted successfully");
      const updatedChannelIds = await fetchChannelsIdsByGroup(groupId);
      const allChannels = await fetchChannelsAll();

      const updatedChannels = Object.keys(updatedChannelIds).reduce((acc, key) => {
        if (allChannels[key]) {
          acc[key] = allChannels[key];
        }
        return acc;
      }, {});

      setChannels(updatedChannels);
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Create New Channel
        </button>
        {/* addChannel = (groupId, isPublic, creatorName, members, channelName) */}
        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Create New Channel</h2>
                <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900">
                  &times;
                </button>
              </div>
              <form onSubmit={handleCreateChannel} className="mt-4 flex flex-col">
                <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">Channel Name</label>
                <input
                  id="channelName"
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Channel Name"
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Create Channel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Channels</h3>

          <div className="mt-2">
            {/* Display channels here */}
            {Object.entries(channels).map(([key, channel]) => (

              <div key={key} idChannel={key} onClick={() => navigate(`/groups/${groupId}/channels/${key}`)} className="p-4 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out mb-3 cursor-pointer">

                <h5 className="mb-2 text-xl font-semibold tracking-tight text-blue-600">{channel.name}</h5>
                {
                  channel?.creatorId === currentUser?.uid && (
                    <div className="text-right">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChannel(key)
                      }}
                        className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 transition-colors duration-150 ease-in-out">
                        Delete the Channel
                      </button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}



// The new view for the Channels component 


// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchChannelsIdsByGroup, fetchChannelsAll, createChannel, deleteChannel } from "../service/channel.service";
// import { AppContext } from "../AppContext";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// export function Channels() {
//   const [channels, setChannels] = useState({});
//   let { groupId } = useParams();
//   const navigate = useNavigate();
//   const { userData } = useContext(AppContext);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [channelName, setChannelName] = useState('');
//   const [currentUser, setCurrentUser] = useState(null);
//   const [groupMembers, setGroupMembers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [visibleChannelDropdown, setVisibleChannelDropdown] = useState(null);

//   const [isMemberPickerVisible, setIsMemberPickerVisible] = useState(false);

//   const [chosenMember, setChosenMember] = useState([]);
//   // useEffect(() => {
//   //   const fetchMembers = async () => {
//   //     try {
//   //       // Fetch group members based on groupId
//   //       const members = await fetchGroupMembers(groupId);
//   //       setGroupMembers(members);
//   //     } catch (error) {
//   //       console.error('Error fetching group members:', error);
//   //     }
//   //   };
//   //   fetchMembers();
//   // }, [groupId]);

//   useEffect(() => {
//     if (isModalVisible) {
//       setIsMemberPickerVisible(false);
//       setChosenMember([]);
//     }
//   }, [isModalVisible]);


//   const handleSearch = () => {
//     const filteredChannels = Object.entries(allChannels).reduce((acc, [key, channel]) => {
//       if (channel.name.toLowerCase().includes(searchQuery.toLowerCase())) {
//         acc[key] = channel;
//       }
//       return acc;
//     }, {});

//     setChannels(filteredChannels);
//   };

//   const handleClickCannelDropdown = (event, index) => {
//     event.stopPropagation();
//     if (visibleChannelDropdown === index) {
//       setVisibleChannelDropdown(null);
//     } else {
//       setVisibleChannelDropdown(index);
//     }
//   };

//   useEffect(() => {
//     const getChannels = async () => {
//       const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
//       const fetchedChannels = await fetchChannelsAll();
//       const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
//         if (fetchedChannels[key]) {
//           acc[key] = fetchedChannels[key];
//         }
//         return acc;
//       }, {});

//       setChannels(filteredChannels);
//     };
//     getChannels();
//   }, [groupId]);

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user); // Set the entire user object
//       } else {
//         // No user is signed in.
//         setCurrentUser(null);
//       }
//     });
//   }, []);

//   const handleCreateChannel = async (event) => {
//     event.preventDefault(); // Prevent the form from submitting in the traditional way
//     if (!userData) {
//       console.error("No current user found. Cannot create channel.");
//       return; // Exit the function if there's no current user
//     }

//     try {
//       const creatorId = currentUser?.uid;
//       const creatorName = userData.username;
//       console.log("Creating channel with creator ID:", currentUser?.uid);
//       console.log("Creating channel with creator name:", userData.username);
//       await createChannel(groupId, creatorName, [userData.uid], channelName, creatorId); // need to add isPrivate

//       // Now, re-fetch the channels to update the UI
//       fetchAndUpdateChannels();
//       console.log("Channel created:", channelName);
//       setIsModalVisible(false); // Close the modal
//       setChannelName(''); // Reset the channel name input field
//     } catch (error) {
//       console.error("Failed to create channel:", error);
//     }
//   };

//   const fetchAndUpdateChannels = async () => {
//     const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
//     const fetchedChannels = await fetchChannelsAll();
//     const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
//       if (fetchedChannels[key]) {
//         acc[key] = fetchedChannels[key];
//       }
//       return acc;
//     }, {});

//     setChannels(filteredChannels);
//   };

//   const handleDeleteChannel = async (channelId) => {
//     try {
//       await deleteChannel(channelId);
//       console.log("Channel deleted successfully");
//       const updatedChannelIds = await fetchChannelsIdsByGroup(groupId);
//       const allChannels = await fetchChannelsAll();

//       const updatedChannels = Object.keys(updatedChannelIds).reduce((acc, key) => {
//         if (allChannels[key]) {
//           acc[key] = allChannels[key];
//         }
//         return acc;
//       }, {});

//       setChannels(updatedChannels);
//     } catch (error) {
//       console.error("Error deleting channel:", error);
//     }
//   };

//   return (
//     <>
//       <div className="h-screen lg:h-auto">
//         <div className="p-6">
//           <div className="ltr:float-right rtl:float-left">
//             <div className="relative">
//               {/* Button trigger modal */}
//               <button onClick={toggleModal} type="button" className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300" data-tw-toggle="modal" data-tw-target="#modal-id" >
//                 <i className="ri-group-line me-1 ms-0" />
//                 <span className="absolute items-center hidden mb-6 top-8 channel-hover/tag:flex ltr:-left-8 rtl:-right-8">
//                   <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
//                     Create Channel
//                   </span>
//                   <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12" />
//                 </span>
//               </button>
//             </div>
//           </div>

//           <h4 className="mb-6 dark:text-gray-50">Channels</h4>

//           {/* Modal */}
//           {isModalVisible && (
//             <div className="relative z-50  modal" id="modal-id">
//               <div className="fixed inset-0 z-50 ">
//                 <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay" />
//                 <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
//                   <div className="relative w-full max-w-lg my-8 text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
//                     <div className="channel-data-[theme-color=violet]:bg-violet-800/10 channel-data-[theme-color=green]:bg-green-800/10 channel-data-[theme-color=red]:bg-red-800/10 channel-data-[theme-color=violet]:dark:bg-zinc-700 channel-data-[theme-color=red]:dark:bg-zinc-700 channel-data-[theme-color=green]:dark:bg-zinc-700">
//                       <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
//                         <h5 className="mb-0 text-gray-800 text-16 dark:text-gray-50" id="addchannel-exampleModalLabel" >
//                           Create New Channel
//                         </h5>
//                         <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900"> &times; </button>
//                       </div>
//                       <div className="p-4">
//                         <form onSubmit={handleCreateChannel}>
//                           {/* Channel Name */}
//                           <div className="mb-8">
//                             <label htmlFor="channelName" className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">Channel Name</label>
//                             <input id="channelName" type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 dark:border-zinc-500" placeholder="Enter Group Name" required />
//                           </div>

//                           {/* Group Members */}
//                           <div className="mb-8 ltr:text-left rtl:text-right">
//                             <label className="dark:text-gray-300 "> Channel Members </label>
//                             <div className="mt-2 mb-3">
//                               <button className={` border-0 btn dark:text-gray-50 ${isMemberPickerVisible ? 'bg-violet-200' : 'channel-data-[theme-color=violet]:bg-slate-200 channel-data-[theme-color=green]:bg-white channel-data-[theme-color=red]:bg-white channel-data-[theme-color=violet]:dark:bg-zinc-600 channel-data-[theme-color=green]:dark:bg-zinc-600 channel-data-[theme-color=red]:dark:bg-zinc-600'}`} type="button" id="toggleButton" onClick={() => setIsMemberPickerVisible((prev) => !prev)} >
//                                 Select Members
//                               </button>
//                             </div>
//                             {isMemberPickerVisible ?
//                               <div id="collapseElement">
//                                 <div className="border border-gray-100 rounded dark:border-zinc-500">
//                                   <div className="px-3 py-2 rounded bg-gray-100/50 dark:bg-zinc-600">
//                                     <h5 className="mb-0 text-base text-gray-800 dark:text-gray-50">
//                                       Contacts
//                                     </h5>
//                                   </div>
//                                   <div className="p-2 bg-white dark:bg-zinc-800">
//                                     <div className="h-[150px]">
//                                       <div>
//                                         <ul>
//                                           {groupMembers.map((member) => (
//                                             <li className="px-5 py-[10px]" key={member.uid}>
//                                               <div className="flex items-center gap-3">
//                                                 <input type="checkbox" id={`member-${member.uid}`} onChange={(e) => handleMemberChecked(e, member)} defaultChecked="" className="border-gray-100 rounded channel-data-[theme-color=violet]:bg-violet-50 channel-data-[theme-color=green]:bg-green-50 channel-data-[theme-color=red]:bg-red-50 focus:ring-1 channel-data-[theme-color=violet]:focus:ring-violet-500/20 channel-data-[theme-color=green]:focus:ring-green-500/20 channel-data-[theme-color=red]:focus:ring-red-500/20 channel-data-[theme-color=violet]:checked:bg-violet-500 channel-data-[theme-color=green]:checked:bg-green-500 channel-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 channel-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 channel-data-[theme-color=violet]:dark:border-zinc-500 channel-data-[theme-color=green]:dark:border-zinc-500 channel-data-[theme-color=red]:dark:border-zinc-500" />
//                                                 <label htmlFor={`member-${member.uid}`} className="dark:text-gray-300">
//                                                   {member.username}
//                                                 </label>
//                                               </div>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div> : null}
//                           </div>
//                           <div className="flex justify-between items-center mt-4">
//                             <label htmlFor="channel-private" className="inline-flex items-center">
//                               <input id="channel-private" type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="form-checkbox h-5 w-5 text-gray-600" /><span className="ml-2 text-gray-700">Private Group</span>
//                             </label>
//                             <div className="flex p-4 border-t border-gray-100 ltr:justify-end dark:border-zinc-500 rtl:justify-start">
//                               <button onClick={toggleModal} type="button" className="border-0 btn hover:underline channel-data-[theme-color=violet]:text-violet-500 channel-data-[theme-color=green]:text-green-500 channel-data-[theme-color=red]:text-red-500" data-tw-dismiss="modal">
//                                 Close
//                               </button>
//                               <button type="submit" className="text-white border-transparent btn channel-data-[theme-color=violet]:bg-violet-500 channel-data-[theme-color=violet]:hover:bg-violet-600 channel-data-[theme-color=green]:bg-green-500 channel-data-[theme-color=green]:hover:bg-green-600 channel-data-[theme-color=red]:bg-red-500 channel-data-[theme-color=red]:hover:bg-red-600">
//                                 Create Channel
//                               </button>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* search bar */}
//           <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
//             <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3 " id="basic-addon2">
//               <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
//             </span>
//             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon2" />
//           </div>
//           <ul>

//             {/* Display channels here */}
//             {Object.entries(channels).map(([key, channel]) => (
//               <li key={key} className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
//                 <div key={key} idChannel={key} onClick={() => navigate(`/groups/${groupId}/channels/${key}`)}>
//                   <div className="flex items-center relative">
//                     <div className="ltr:mr-5 rtl:ml-5">
//                       <div className="flex items-center justify-center rounded-full w-10 h-10 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
//                         <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
//                           <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//                             <path fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z" clipRule="evenodd" />
//                           </svg>
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex-grow overflow-hidden">
//                       <h5 className="mb-0 text-gray-700 truncate dark:text-gray-50">{channel.name}</h5>
//                       <p className="font-normal text-gray-600">{channel.private ? 'Private' : 'Public'}</p>
//                     </div>
//                     {/* Dropdown menu */}
//                     <button onClick={(e) => handleClickCannelDropdown(e, index)}  className="p-2 ml-2 text-gray-500 hover:text-gray-800 dark:text-gray-300" >
//                       <i className="ri-more-2-fill"></i>
//                     </button>
//                     {visibleChannelDropdown && (
//                       <div className="absolute z-50 block w-40 mt-20 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg ltr:left-auto ltr:right-0 bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm">
//                         <ul>
//                           <li>
//                             {channel?.creatorId === currentUser?.uid && (
//                               <div className="text-right">
//                                 <button onClick={(e) => { e.stopPropagation(); handleDeleteChannel(key) }} className="block w-full px-6 py-2 text-sm font-normal text-red-500 bg-red dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-red-300 dark:hover:bg-zinc-500/50" type="button">
//                                   Delete the Channel
//                                   <i className="float-right text-red-500 dark:text-red-300 ri-delete-bin-line"></i>
//                                 </button>
//                               </div>
//                             )}
//                           </li>
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
