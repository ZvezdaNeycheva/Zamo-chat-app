
export function Chats() {

    return (
        <>
            {/* <!-- Start chat content --> */}
            <div>
                <div className="px-6 pt-6">
                    <h4 className="mb-0 text-gray-700 dark:text-gray-50">Chats</h4>

                    <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                        <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600" id="basic-addon1">
                            <i className="text-lg text-gray-400 ri-search-line search-icon dark:text-gray-200"></i>
                        </span>
                        <input type="text" className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon1" />
                    </div>
                </div>

                {/* <!-- Start user status --> */}
                <div className="px-6 pb-6" dir="ltr">

                    <div className="owl-carousel owl-theme" id="user-status-carousel">
                        <div className="text-center">
                            <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <div className="absolute inset-0 text-center">
                                    <img src="./assets/images/users/avatar-2.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9" />
                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                </div>

                                <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Patrick</h5>
                            </a>
                        </div>
                        <div className="text-center">
                            <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <div className="absolute inset-0 block text-center">
                                    <img src="./assets/images/users/avatar-4.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9" />
                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                </div>

                                <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Doris</h5>
                            </a>
                        </div>

                        <div className="text-center">
                            <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <div className="absolute inset-0 block text-center">
                                    <img src="./assets/images/users/avatar-5.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9" />
                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                </div>

                                <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Emily</h5>
                            </a>
                        </div>

                        <div className="text-center">
                            <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <div className="absolute inset-0 block text-center">
                                    <img src="./assets/images/users/avatar-6.jpg" alt="user-img" className="mx-auto rounded-full w-9 h-9" />
                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-5 dark:border-zinc-600"></span>
                                </div>

                                <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Steve</h5>
                            </a>
                        </div>

                        <div className="text-center">
                            <a href="#" className="block p-2 mt-4 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <div className="absolute inset-0 block mx-auto rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                    <span className="font-medium leading-9 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                    </span>
                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 lg:right-1 dark:border-zinc-600"></span>
                                </div>
                                <h5 className="mt-4 mb-0 truncate text-13 dark:text-gray-50">Teresa</h5>
                            </a>
                        </div>
                    </div>
                    {/* <!-- end user status carousel --> */}
                </div>
                {/* <!-- end user status --> */}

                {/* <!-- Start chat-message-list --> */}
                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-2.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>

                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Patrick Hendricks</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Hey! there I'm available</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">05 min</div>
                                    </div>
                                </a>
                            </li>

                            {/* <li className="unread px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="relative flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-3.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Mark Messer</h5>
                                            <p className="mb-0 text-gray-800 truncate dark:text-gray-300 text-14"><i className="align-middle ri-image-fill me-1 ms-0"></i> Images</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">12 min</div>
                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                            <span className="px-2 py-1 text-red-500 rounded-full bg-red-500/20 text-11">02</span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    G
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">General</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">This theme is awesome!</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">20 min</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-4.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Doris Brown</h5>
                                            <p className="text-gray-500 dark:text-gray-300 text-14">Nice to meet you</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">10:12 AM</div>
                                    </div>
                                </a>
                            </li>

                            <li className="unread px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="relative flex ">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    D
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Designer</h5>
                                            <p className="mb-0 text-gray-800 truncate dark:text-gray-300 text-14">Next meeting tomorrow 10.00AM</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">12:01 PM</div>
                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                            <span className="px-2 py-1 text-red-500 rounded-full bg-red-500/20 text-11">01</span>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-6.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Steve Walker</h5>
                                            <p className="text-gray-500 truncate dark:text-gray-300 text-14"><i className="align-middle ri-file-text-fill me-1 ms-0"></i> Admin-A.zip</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">03:20 PM</div>
                                    </div>
                                </a>
                            </li>

                            <li className="typing px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    A
                                                </span>
                                            </div>
                                            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Albert Rodarte</h5>
                                            <div className="flex items-end gap-2 mb-0 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-14">
                                                <p className="mb-0">typing</p>

                                                <div className="animate-typing flex gap-0.5">
                                                    <p className="w-1 h-1 mb-1 rounded-full dot group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                                                    <p className="w-1 h-1 mb-1 rounded-full dot-2 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 "></p>
                                                    <p className="w-1 h-1 mb-1 rounded-full dot-3 group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 animate-bounce"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">04:56 PM</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    M
                                                </span>
                                            </div>
                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Mirta George</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Yeah everything is fine</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">12/07</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-7.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Paul Haynes</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Good morning</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">12/07</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    J
                                                </span>
                                            </div>
                                            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Jonathan Miller</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Hi, How are you?</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">12/07</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <img src="./assets/images/users/avatar-8.jpg" className="rounded-full w-9 h-9" alt="" />
                                            <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Ossie Wilson</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">I've finished it! See you so</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">11/07</div>
                                    </div>
                                </a>
                            </li>

                            <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                <a href="#">
                                    <div className="flex">
                                        <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                            <div className="flex items-center justify-center rounded-full w-9 h-9 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20">
                                                <span className="group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                    S
                                                </span>
                                            </div>
                                            <span className="absolute w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                        </div>
                                        <div className="flex-grow overflow-hidden">
                                            <h5 className="mb-1 text-base truncate dark:text-gray-50">Sara Muller</h5>
                                            <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Wow that's great</p>
                                        </div>
                                        <div className="text-gray-500 text-11 dark:text-gray-300">11/07</div>
                                    </div>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                {/* <!-- End chat-message-list --> */}
            </div>
        </>
    );
}