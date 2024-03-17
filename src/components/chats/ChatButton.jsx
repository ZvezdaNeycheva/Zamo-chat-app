export function ChatButton({ user, onClick, selected }) {
    return (
        <div onClick={onClick} className={`px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700 cursor-pointer ${selected ? 'bg-slate-100' : ''}`}>
            <div className="flex">
                <div className="relative self-center ltr:mr-3 rtl:ml-3">
                    <img src={user?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="rounded-full w-9 h-9" />
                    <span className={`absolute w-2.5 h-2.54 text-${user?.status === 'Online' ?
                     'bg-green-500 text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill green-500' : 
                     
                     'Busy' ? 'bg-red-500 text-orange-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill' :
                     
                     'Away' ? 'bg-red-500 text-yellow-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill' :
                     
                     'bg-red-500 text-red-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill red-500'}  border-2 border-transparent rounded-full top-5 ltr:right-1 rtl:left-1 dark:border-zinc-600`}></span>

                </div>

                <div className="flex-grow overflow-hidden">
                    <h5 className="mb-1 text-base truncate dark:text-gray-50">{user.username}</h5>
                </div>

            </div>
        </div>
    )
}
