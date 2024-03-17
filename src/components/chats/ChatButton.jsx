export function ChatButton({ user, onClick, selected }) {
  return (
    <div onClick={onClick} className={`px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700 cursor-pointer ${selected ? 'bg-slate-100' : ''}`}>
        <div className="flex">
            <div className="relative self-center ltr:mr-3 rtl:ml-3">
                <img src={user?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="rounded-full w-9 h-9" />
                <span className={`absolute w-2.5 h-2.54 text-${user?.status === 'Online' ? 'bg-green-500 text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill green-500' : 'bg-red-500 text-red-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill red-500'}  border-2 border-transparent rounded-full top-5 ltr:right-1 rtl:left-1 dark:border-zinc-600`}></span>

                </div>


            <div className="flex-grow overflow-hidden">
                <h5 className="mb-1 text-base truncate dark:text-gray-50">{user.username}</h5>
                {/* <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Hey! there I'm available</p> */}
            </div>
            {/* <div className="text-gray-500 text-11 dark:text-gray-300">05 min</div> */}

        </div>
        </div>
    )
}

{/* <a className={`pb-1 text-${localStatus === 'Online' ? 'text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill green-500' : 'text-red-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill red-500'} dropdown-toggle d-block dark:text-gray-300`} href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButtonX">
                  &nbsp;{localStatus} <i className={`mdi mdi-chevron-down ${openStatusDropdown ? "group-[.active]:rotate-180" : ""}`}></i>
                </a> */}