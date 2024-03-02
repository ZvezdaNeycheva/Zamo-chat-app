import React, { useState, useEffect } from "react";
import { createGroup } from "../../service/channel.service";
import { fetchGroups } from "../../service/channel.service";

export function Groups() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [groups, setGroups] = useState({});
  const [allGroups, setAllGroups] = useState({});

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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreateGroup = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    try {
      const newGroup = await createGroup(groupName, isPrivate);
      setGroups(prevGroups => ({ ...prevGroups, [newGroup.id]: newGroup }));
      console.log("Group created with privacy setting:", isPrivate);
      setIsModalVisible(false); // Close the modal
      setGroupName(''); // Reset the group name input field
      setIsPrivate(false); // Reset the privacy toggle
      // Optionally refresh the list of groups
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

  return (
    <>
      <div className="p-6">
        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Create New Group
        </button>

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Create New Group</h2>
                <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900">
                  &times;
                </button>
              </div>
              <form onSubmit={handleCreateGroup} className="mt-4 flex flex-col">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Group Name</label>
                <input
                  id="groupName"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Group Name"
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="group-private" className="inline-flex items-center">
                    <input
                      id="group-private"
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-gray-600"
                    /><span className="ml-2 text-gray-700">Private Group</span>
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Groups</h3>
          {/* search bar */}
          <div className="mt-2 relative max-w-md w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Search for groups"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* SVG for magnifying glass icon */}
            </div>
            <button onClick={handleSearch} className="absolute inset-y-0 right-0 px-4 text-gray-500 border-l focus:outline-none">
              {/* Optional: Icon/Button for initiating search */}
              <i className="ri-search-line"></i>
            </button>
          </div>
          <div className="mt-2">
            {/* Display groups here */}
            {Object.entries(groups).map(([key, group]) => (
              <div key={key} className="p-4 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out mb-3">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-blue-600">{group.name}</h5>
                <p className="font-normal text-gray-600">{group.private ? 'Private' : 'Public'}</p>
                {/* Additional styling for hover effect */}
                <div className="text-right">
                  <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 transition-colors duration-150 ease-in-out">
                    Delete the Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
