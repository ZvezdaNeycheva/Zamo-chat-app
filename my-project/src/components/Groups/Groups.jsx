import React, { useState, useEffect } from "react";
import { createGroup } from "../../service/users.service";
import { fetchGroups } from "../../service/users.service";

export function Groups() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [groups, setGroups] = useState({});

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

  useEffect(() => {
    const getGroups = async () => {
      const fetchedGroups = await fetchGroups();
      setGroups(fetchedGroups);
    };

    getGroups();
  }, []);

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
          <div className="mt-2">
            {/* Display groups here */}
            {Object.entries(groups).map(([key, group]) => (
              <div key={key} className="p-4 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out mb-3">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-blue-600">{group.name}</h5>
                <p className="font-normal text-gray-600">{group.private ? 'Private' : 'Public'}</p>
                {/* Additional styling for hover effect */}
                <div className="text-right">
                  <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 transition-colors duration-150 ease-in-out">
                    Join Group
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


// export function Groups() {
//   return (
//     <>
//       {/* Start chat content */}
//       <div className="h-screen lg:h-auto">
//         <div className="p-6">
//           <div className="ltr:float-right rtl:float-left">
//             <div className="relative">
//               {/* Button trigger modal */}
//               <button
//                 type="button"
//                 className="px-4 text-lg text-gray-500 group/tag dark:text-gray-300"
//                 data-tw-toggle="modal"
//                 data-tw-target="#modal-id"
//               >
//                 <i className="ri-group-line me-1 ms-0" />
//                 <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
//                   <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
//                     Create groups
//                   </span>
//                   <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12" />
//                 </span>
//               </button>
//             </div>
//           </div>
//           <h4 className="mb-6 dark:text-gray-50">Groups</h4>
//           <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
//             <span
//               className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 pe-1 ps-3 "
//               id="basic-addon2"
//             >
//               <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200" />
//             </span>
//             <input
//               type="text"
//               className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400"
//               placeholder="Search messages or users"
//               aria-label="Search messages or users"
//               aria-describedby="basic-addon2"
//             />
//           </div>
//           {/* Start chat-group-list */}

//           {/* End chat-group-list */}j
//         </div>
//       </div>
//     </>
//   );
// }
