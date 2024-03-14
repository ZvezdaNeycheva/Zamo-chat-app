import React, { useState, useEffect, useContext } from "react";
import { createGroup, fetchGroups, deleteGroup } from "../service/channel.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "../AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Channels } from "./Channels";

export function Groups() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState({});
  const [allGroups, setAllGroups] = useState({});
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user
  const { user, userData } = useContext(AppContext);
  let { idGroup } = useParams();
  const navigate = useNavigate();
  const [GroupList, setGroupList] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    };

    getGroups();
  }, []);

  useEffect(() => {
    // Fetch groups from Firebase and store in `allGroups`
    const fetchAndSetGroups = async () => {
      const fetchedGroups = await fetchGroups(); // Your function to fetch groups
      setAllGroups(fetchedGroups);
      setGroups(fetchedGroups); // Initially, display all groups
    };

    fetchAndSetGroups();
  }, []);

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreateGroup = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    if (!currentUser) {
      console.error("No current user found. Cannot create group.");
      return; // Exit the function if there's no current user
    }

    try {
      const creatorId = currentUser?.uid; // Get the UID from the current user object
      const creatorName = userData.username
      const newGroup = await createGroup(groupName, isPrivate, creatorId, creatorName);
      setGroups(prevGroups => {
        const updatedGroups = { ...prevGroups }; // Clone the current state
        updatedGroups[newGroup.id] = newGroup; // Add the new group
        return updatedGroups; // Return the updated groups object
      });
      setIsModalVisible(false); // Close the modal
      setGroupName(''); // Reset the group name input field
      setIsPrivate(false); // Reset the privacy toggle
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  const handleSearch = () => {
    const filteredGroups = Object.entries(allGroups).reduce((acc, [key, group]) => {
      if (group.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        acc[key] = group;
      }
      return acc;
    }, {});

    setGroups(filteredGroups); // Update `groups` to only include those that match the search query
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      const updatedGroups = await fetchGroups();
      setGroups(updatedGroups);
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleDropDownMenu = (index) => {
    const updatedGroupList = [...GroupList];
    updatedGroupList[index].isOpen = !updatedGroupList[index].isOpen;
    setGroupList(updatedGroupList);
  };

  return (
    <>
      {idGroup ? <Channels groupId={idGroup} /> : <div className="">
        {/* Start chat content */}
        <div className="h-screen lg:h-auto">
          <div className="p-6">
            <div className="ltr:float-right rtl:float-left">
              <div className="relative">
                {/* Button trigger modal */}
                <button onClick={toggleModal} type="button" className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300" data-tw-toggle="modal" data-tw-target="#modal-id" >
                  <i className="ri-group-line me-1 ms-0" />
                  <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                      Create groups
                    </span>
                    <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12" />
                  </span>
                </button>
              </div>
            </div>

            <h4 className="mb-6 dark:text-gray-50">Groups</h4>

            {/* Modal */}
            {isModalVisible && (
              <div className="relative z-50  modal" id="modal-id">
                <div className="fixed inset-0 z-50 ">
                  <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay" />
                  <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                    <div className="relative w-full max-w-lg my-8 text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                      <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-800/10 group-data-[theme-color=red]:bg-red-800/10 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
                          <h5 className="mb-0 text-gray-800 text-16 dark:text-gray-50" id="addgroup-exampleModalLabel" >
                            Create New Group
                          </h5>
                          <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900"> &times; </button>
                        </div>
                        <div className="p-4">
                          <form onSubmit={handleCreateGroup}>
                            {/* Group Name */}
                            <div className="mb-8">
                              <label htmlFor="groupName" className="block mb-2 ltr:text-left dark:text-gray-200 rtl:text-right">Group Name</label>
                              <input id="groupName" type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 placeholder:dark:text-gray-200 dark:border-zinc-500" placeholder="Enter Group Name" required />
                            </div>

                            {/* Group Members */}
                            <div className="mb-8 ltr:text-left rtl:text-right">
                              <label className="dark:text-gray-300 "> Group Members </label>
                              <div className="mt-2 mb-3">
                                <button className="group-data-[theme-color=violet]:bg-slate-200 group-data-[theme-color=green]:bg-white group-data-[theme-color=red]:bg-white border-0 btn group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 dark:text-gray-50" type="button" id="toggleButton" >
                                  Select Members
                                </button>
                              </div>
                              <div className="hidden" id="collapseElement">
                                <div className="border border-gray-100 rounded dark:border-zinc-500">
                                  <div className="px-3 py-2 rounded bg-gray-100/50 dark:bg-zinc-600">
                                    <h5 className="mb-0 text-base text-gray-800 dark:text-gray-50">
                                      Contacts
                                    </h5>
                                  </div>
                                  <div className="p-2 bg-white dark:bg-zinc-800">
                                    <div data-simplebar="" className="h-[150px]">
                                      <div>
                                        <ul>
                                          <li className="px-5 py-[10px]">
                                            <div className="flex items-center gap-3">
                                              <input type="checkbox" d="memberCheck1" efaultChecked="" lassName="border-gray-100 rounded group-data-[theme-color=violet]:bg-violet-50 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 focus:ring-1 group-data-[theme-color=violet]:focus:ring-violet-500/20 group-data-[theme-color=green]:focus:ring-green-500/20 group-data-[theme-color=red]:focus:ring-red-500/20 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=red]:checked:bg-red-500 checked:ring-1 group-data-[theme-color=red]:checked:ring-violet-500/20 focus:ring-offset-0 focus:outline-0 group-data-[theme-color=violet]:dark:border-zinc-500 group-data-[theme-color=green]:dark:border-zinc-500 group-data-[theme-color=red]:dark:border-zinc-500" />
                                              <label htmlFor="memberCheck1" className="dark:text-gray-300" >
                                                Albert Rodarte
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <label htmlFor="group-private" className="inline-flex items-center">
                                <input id="group-private" type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="form-checkbox h-5 w-5 text-gray-600" /><span className="ml-2 text-gray-700">Private Group</span>
                              </label>
                              <div className="flex p-4 border-t border-gray-100 ltr:justify-end dark:border-zinc-500 rtl:justify-start">
                                <button type="button" className="border-0 btn hover:underline group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500" data-tw-dismiss="modal">
                                  Close
                                </button>
                                <button type="submit" className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600">
                                  Create Groups
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* search bar */}
            <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
              <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3 " id="basic-addon2">
                <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
              </span>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon2" />
            </div>

            <div className="chat-message-list chat-group-list" data-simplebar>
              <div className="mt-2">
                <ul>
                  {/* Display groups here */}
                  {Object.entries(groups).map(([key, group], index) => (
                    <li key={key} className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 transition-all ease-in-out rounded">
                      <a href="#" onClick={(e) => { e.preventDefault(); navigate(`/groups/${key}`) }}>
                        <div className="flex items-center relative">
                          <div className="ltr:mr-5 rtl:ml-5">
                            <div className="flex items-center justify-center rounded-full w-10 h-10 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                              <span className="font-medium text-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                {group.name[0].toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 text-gray-700 truncate dark:text-gray-50"> {group.name}</h5>
                          </div>
                          {/* Dropdown menu */}
                          <button className="p-2 ml-2 text-gray-500 hover:text-gray-800 dark:text-gray-300" onClick={() => handleDropDownMenu(index)}>
                            <i className="ri-more-2-fill"></i>
                          </button>
                          {GroupList[index]?.isOpen && (
                            <div className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg ltr:left-auto ltr:right-0 bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm">
                              <ul>
                                <li>
                                  <button onClick={() => handleDeleteGroup(key)} className="block w-full px-6 py-2 text-sm font-normal text-red-500 bg-red dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-red-300 dark:hover:bg-zinc-500/50" type="button">
                                    Remove
                                    <i className="float-right text-red-500 dark:text-red-300 ri-delete-bin-line"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                          {/* End of dropdown menu */}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      }
    </>
  );
}
