import React, { useState } from "react";
import { createGroup } from "../../service/users.service";

export function Groups() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <div className="h-screen lg:h-auto p-6">
        <div className="flex justify-end">
          {/* Updated button to use Tailwind CSS */}
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
          >
            + {/* Simple + sign for creating new groups */}
          </button>
        </div>
        <h4 className="mb-6 text-gray-900 dark:text-gray-50">Groups</h4>
        {/* Your content */}

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
              <span
                className="absolute top-0 right-0 p-4"
                onClick={toggleModal}
              >
                <button className="text-gray-600 hover:text-gray-900">&times;</button>
              </span>
              <h2 className="text-xl font-bold">Create New Group</h2>
              <form className="mt-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  name="groupName"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                {/* Add more inputs as needed */}
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Create Group
                </button>
              </form>
            </div>
          </div>
        )}
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
