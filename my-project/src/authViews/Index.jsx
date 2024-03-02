import { Chats } from "../components/Chats/Chats";
import { Contacts } from "../components/Contacts/Contacts";
import { Groups } from "../components/Groups/Groups";
import { Meta } from "../components/Meta/Meta";
import { Profile } from "../components/Profile/Profile";
import { Settings } from "../components/Settings/Settings";
import { SidebarMenu } from "../components/Sidebar-menu/SidebarMenu";
// import { Switcher } from "../components/Switcher/Switcher";
import { UserProfileDetails } from "../components/UserProfileDetails/UserProfileDetails";
import { LockScreen } from "./LockScreen";
import { Login } from "./Login";
import { Register } from "./Register";
import { RecoverPassword } from "./RecoverPassword";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { get, query, ref, update } from "firebase/database";

// import './assets/libs/magnific-popup/magnific-popup.css';
// import './assets/libs/owl.carousel/assets/owl.carousel.min.css';
// import './assets/libs/owl.carousel/assets/owl.theme.default.min.css';
// import './assets/css/icons.css';
// import './assets/css/tailwind.css';

export function Index() {
    const [newMessage, setNewMessage] = useState("");
    
   const handleInputMessage = (e) => {
        e.preventDefault();
        const message = e.target.value;
        setNewMessage(message);
        // console.log({message});
    }
     const handleSendMessage = (e) => {
        e.preventDefault();
        console.log({newMessage});
        if(newMessage === ""){
            return;
        }

        
    }   



    return (
        <>
                <Meta title={'Chat App'}></Meta>

                <div className="lg:flex">
                    {/* <!-- Start left sidebar-menu --> */}
                    <SidebarMenu />
                    {/* <!-- end left sidebar-menu --> */}

                    {/* <!-- switcher --> */}
                    {/* <Switcher /> */}

                    {/* <!-- start chat-leftsidebar --> */}
                    <div className="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
                        <div>
                            {/* <!-- Start Profile tab-pane --> */}
                            <div className="tab-content"> <Profile /> </div>
                            <div className="tab-content active"> <Chats /> </div>
                            <div className="tab-content"> <Groups /> </div>
                            <div className="tab-content"> <Contacts /> </div>
                            <div className="tab-content"> <Settings /> </div>
                        </div>
                    </div>
                    {/* <!-- end chat-leftsidebar --> */}

                    {/* <!-- Start User chat --> */}
                    <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
                        <div className="lg:flex">
                            {/* <!-- start chat conversation section --> */}

                            <div className="relative w-full overflow-hidden ">
                                <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
                                    <div className="grid items-center grid-cols-12">
                                        <div className="col-span-8 sm:col-span-4">
                                            <div className="flex items-center">
                                                <div className="block ltr:mr-2 rtl:ml-2 lg:hidden">
                                                    <a href="#" onClick={() => {}} className="p-2 text-gray-500 user-chat-remove text-16"><i className="ri-arrow-left-s-line"></i></a>
                                                </div>
                                                <div className="rtl:ml-3 ltr:mr-3">
                                                    <img src="assets/images/users/avatar-4.jpg" className="rounded-full h-9 w-9" alt="" />
                                                </div>
                                                <div className="flex-grow overflow-hidden">
                                                    <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden"><a href="#" className="text-gray-800 dark:text-gray-50">Doris Brown</a> <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i></h5>
                                                    <h5 className="mb-0 truncate text-16 rtl:block ltr:hidden"><i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i> <a href="#" className="text-gray-800 dark:text-gray-50">Doris Brown</a></h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-4 sm:col-span-8">
                                            <ul className="flex items-center justify-end lg:gap-4">
                                                <li className="px-3">
                                                    <div className="relative dropstart">
                                                        <button className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton10" data-tw-auto-close="outside">
                                                            <i className="ri-search-line"></i>
                                                        </button>
                                                        <ul className="absolute z-50 hidden mt-2 text-left list-none bg-white border rounded-lg shadow-lg w-fit border-gray-50 dropdown-menu top-8 dark:bg-zinc-700 bg-clip-padding dark:border-gray-700" aria-labelledby="dropdownMenuButton10">
                                                            <li className="p-2">
                                                                <input type="text" className="text-gray-500 border-0 rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-600 dark:text-gray-300 placeholder:dark:text-gray-300 focus:ring-0" placeholder="Search.." />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>

                                                <li>
                                                    <button type="button" className="hidden text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#audiCallModal">
                                                        <i className="ri-phone-line"></i>
                                                    </button>
                                                </li>

                                                {/* <!-- Modal start --> */}
                                                <li className="relative z-50 hidden modal" id="audiCallModal">
                                                    <div className="fixed inset-0 z-50 overflow-hidden">
                                                        <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                                                        <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                                                            <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                                                                <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                                                    <div className="p-4">
                                                                        <div className="p-6">
                                                                            <div className="p-4 text-center">
                                                                                <div className="mb-6">
                                                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="w-24 h-24 mx-auto rounded-full" />
                                                                                </div>

                                                                                <h5 className="mb-1 text-gray-800 truncate dark:text-gray-50">Doris Brown</h5>
                                                                                <p className="text-gray-500 dark:text-gray-300">Start Audio Call</p>

                                                                                <div className="mt-10">
                                                                                    <ul className="flex justify-center mb-1">
                                                                                        <li className="px-2 ml-0 mr-2">
                                                                                            <button type="button" className="w-12 h-12 text-white bg-red-500 border-transparent rounded-full btn hover:bg-red-600" data-tw-dismiss="modal">
                                                                                                <span className="text-xl bg-transparent">
                                                                                                    <i className="ri-close-fill"></i>
                                                                                                </span>
                                                                                            </button>
                                                                                        </li>
                                                                                        <li className="px-2">
                                                                                            <button type="button" className="w-12 h-12 text-white bg-green-500 border-transparent rounded-full btn hover:bg-green-600">
                                                                                                <span className="text-xl bg-transparent">
                                                                                                    <i className="ri-phone-fill"></i>
                                                                                                </span>
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- Modal end --> */}

                                                <li>
                                                    <button type="button" className="hidden text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#videoCallModal">
                                                        <i className="ri-vidicon-line"></i>
                                                    </button>
                                                </li>

                                                {/* <!-- Modal start --> */}
                                                <li className="relative z-50 hidden modal dark:text-gray-300" id="videoCallModal">
                                                    <div className="fixed inset-0 z-50 overflow-hidden">
                                                        <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
                                                        <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                                                            <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                                                                <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                                                                    <div className="p-4">
                                                                        <div className="p-6">
                                                                            <div className="p-4 text-center">
                                                                                <div className="mb-6">
                                                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="w-24 h-24 mx-auto rounded-full" />
                                                                                </div>

                                                                                <h5 className="mb-1 truncate dark:text-gray-50">Doris Brown</h5>
                                                                                <p className="text-gray-500 dark:text-gray-300">Start Video Call</p>

                                                                                <div className="mt-10">
                                                                                    <ul className="flex justify-center mb-1">
                                                                                        <li className="px-2 ml-0 mr-2">
                                                                                            <button type="button" className="w-12 h-12 text-white bg-red-500 border-transparent rounded-full btn hover:bg-red-600" data-tw-dismiss="modal">
                                                                                                <span className="text-xl bg-transparent">
                                                                                                    <i className="ri-close-fill"></i>
                                                                                                </span>
                                                                                            </button>
                                                                                        </li>
                                                                                        <li className="px-2">
                                                                                            <button type="button" className="w-12 h-12 text-white bg-green-500 border-transparent rounded-full btn hover:bg-green-600">
                                                                                                <span className="text-xl bg-transparent">
                                                                                                    <i className="ri-vidicon-fill"></i>
                                                                                                </span>
                                                                                            </button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <!-- Modal end --> */}

                                                <li className="px-3">
                                                    <a href="#" className="hidden text-gray-500 dark:text-gray-300 lg:block profileTab">
                                                        <i className="text-xl ri-group-line"></i>
                                                    </a>
                                                </li>

                                                <li className="px-3">
                                                    <div className="relative dropdown">
                                                        <button className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton11">
                                                            <i className="ri-more-fill"></i>
                                                        </button>
                                                        <ul className="absolute z-50 hidden w-40 py-2 mx-4 mt-2 text-left list-none bg-white border rounded shadow-lg ltr:-right-4 border-gray-50 dropdown-menu top-8 dark:bg-zinc-600 bg-clip-padding dark:border-gray-600/50 rtl:-left-5" aria-labelledby="dropdownMenuButton11">
                                                            <li className="block lg:hidden">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent profileTab dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#">View profile <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-user-2-line text-16"></i></a>
                                                            </li>
                                                            <li className="block lg:hidden"><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#" data-tw-toggle="modal" data-tw-target="#audiCallModal">Audio <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-phone-line text-16"></i></a>
                                                            </li>
                                                            <li className="block lg:hidden"><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#" data-tw-toggle="modal" data-tw-target="#videoCallModal">Video <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-vidicon-line text-16"></i></a>
                                                            </li>
                                                            <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#">Archive <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-archive-line text-16"></i></a>
                                                            </li>
                                                            <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#">Muted <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-volume-mute-line text-16"></i></a>
                                                            </li>
                                                            <li><a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-delete-bin-line text-16"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end chat user head --> */}

                                {/* <!-- start chat conversation --> */}
                                <div className="h-[80vh] p-4 lg:p-6" data-simplebar>

                                    <ul className="mb-0">
                                        <li className="clear-both py-4">
                                            <div className="flex items-end gap-3">
                                                <div>
                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                            <p className="mb-0">
                                                                Good morning
                                                            </p>
                                                            <p className="mt-1 mb-0 text-xs text-right text-white/50"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:00</span></p>
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                                                        </div>
                                                        <div className="relative self-start dropdown">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton12">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden w-40 py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:left-auto ltr:right-0 xl:ltr:left-0 xl:ltr:right-auto rtl:left-0 rtl:right-auto xl:rtl:right-0 xl:rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton12">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-medium text-gray-700 text-14 dark:text-gray-300">Doris Brown</div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
                                                <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2 ltr:justify-end rtl:justify-start">
                                                        <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg ltr:rounded-br-none rtl:rounded-bl-none bg-gray-50 dark:bg-zinc-700 dark:text-gray-50">
                                                            <p className="mb-0">
                                                                Good morning, How are you? What about our next meeting?
                                                            </p>
                                                            <p className="mt-1 mb-0 text-xs text-left text-gray-500 dark:text-gray-300"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:02</span></p>
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700"></div>
                                                        </div>

                                                        <div className="relative self-start order-1 dropstart">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton13">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:right-auto ltr:left-0 xl:ltr:right-0 xl:ltr:left-auto rtl:right-0 rtl:left-auto xl:rtl:left-0 xl:rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700" aria-labelledby="dropdownMenuButton13">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-medium text-gray-700 rtl:text-left text-14 dark:text-gray-300">Patricia Smith</div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="relative mt-3 mb-6 text-center">
                                                <div className="before:content-['] before:absolute before:w-full before:h-[1px] before:left-0 before:right-0 before:bg-gray-50 before:top-[10px] dark:before:bg-zinc-600"></div>
                                                <span className="relative bg-gray-50 text-13 py-[6px] px-3 rounded dark:bg-zinc-600 dark:text-gray-50">Today</span>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="flex items-end gap-3">
                                                <div>
                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                            <p className="mb-0">
                                                                Yeah everything is fine
                                                            </p>
                                                            <p className="mt-1 mb-0 text-xs text-right text-white/50"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:05</span></p>
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                                                        </div>
                                                        <div className="relative self-start dropdown">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton14">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden w-40 py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:left-auto ltr:right-0 xl:ltr:left-0 xl:ltr:right-auto rtl:left-0 rtl:right-auto xl:rtl:right-0 xl:rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton14">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 mb-2">
                                                        <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                            <p className="mb-0"> & Next meeting tomorrow 10.00AM </p>
                                                            <p className="mt-1 mb-0 text-xs text-right text-white/50"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:05</span></p>
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                                                        </div>
                                                        <div className="relative self-start dropdown">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton15">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden w-40 py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:left-auto ltr:right-0 xl:ltr:left-0 xl:ltr:right-auto rtl:left-0 rtl:right-auto xl:rtl:right-0 xl:rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton15">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-medium text-gray-700 text-14 dark:text-gray-300">Doris Brown</div>
                                                </div>

                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
                                                <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2 ltr:justify-end rtl:justify-start">
                                                        <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg ltr:rounded-br-none rtl:rounded-bl-none bg-gray-50 dark:bg-zinc-700 dark:text-gray-50">
                                                            <p className="mb-0">
                                                                Wow that's great
                                                            </p>
                                                            <p className="mt-1 mb-0 text-xs text-left text-gray-500 dark:text-gray-300"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:06</span></p>
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700"></div>
                                                        </div>
                                                        <div className="relative self-start order-1 dropdown">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton16">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:right-auto ltr:left-0 xl:ltr:right-0 xl:ltr:left-auto rtl:right-0 rtl:left-auto xl:rtl:left-0 xl:rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700" aria-labelledby="dropdownMenuButton16">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="font-medium text-gray-700 rtl:text-left text-14 dark:text-gray-300">Patricia Smith</div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="flex items-end gap-3">
                                                <div>
                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                                                            <ul className="relative mb-0">
                                                                <li className="relative inline-block mr-2">
                                                                    <div>
                                                                        <a className="inline-block m-1 popup-img" href="assets/images/small/img-1.jpg" title="Project 1">
                                                                            <img src="assets/images/small/img-1.jpg" alt="" className="border rounded h-28" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="absolute right-[10px] left-auto bottom-[10px]">
                                                                        <ul>
                                                                            <li className="inline-block p-2">
                                                                                <a download="img-1.jpg" href="assets/images/small/img-1.jpg" className="font-medium">
                                                                                    <i className="text-lg ri-download-2-line"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li className="relative self-start inline-block p-2 dropdown">
                                                                                <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton17">
                                                                                    <i className="text-lg text-white ri-more-2-fill"></i>
                                                                                </a>
                                                                                <div className="absolute z-50 hidden w-40 py-2 my-10 text-left list-none bg-white border-none rounded shadow-lg ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton19">
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-file-copy-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </li>

                                                                <li className="relative inline-block mr-2">
                                                                    <div>
                                                                        <a className="inline-block m-1 popup-img" href="assets/images/small/img-2.jpg" title="Project 2">
                                                                            <img src="assets/images/small/img-2.jpg" alt="" className="border rounded h-28" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="absolute right-[10px] left-auto bottom-[10px]">
                                                                        <ul className="mb-0 list-inline">
                                                                            <li className="inline-block p-2">
                                                                                <a download="img-2.jpg" href="assets/images/small/img-2.jpg" className="font-medium">
                                                                                    <i className="text-lg ri-download-2-line"></i>
                                                                                </a>
                                                                            </li>
                                                                            <li className="relative self-start inline-block p-2 dropdown">
                                                                                <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton18">
                                                                                    <i className="text-lg text-white ri-more-2-fill"></i>
                                                                                </a>
                                                                                <div className="absolute z-50 hidden w-40 py-2 my-10 text-left list-none bg-white border-none rounded shadow-lg ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton19">
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-file-copy-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                                                </div>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <p className="mt-1 mb-0 text-xs text-right text-white/50"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:09</span></p>
                                                        </div>

                                                        <div className="relative self-start dropdown">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton19">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden w-40 py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:left-auto ltr:right-0 xl:ltr:left-0 xl:ltr:right-auto rtl:left-0 rtl:right-auto xl:rtl:right-0 xl:rtl:left-auto dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-gray-600/50" aria-labelledby="dropdownMenuButton19">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-200 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="font-medium text-gray-700 text-14 dark:text-gray-300">Doris Brown</div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="relative inline-flex items-end mb-6 text-right ltr:rtl:float-left ltr:float-right rtl:float-left">
                                                <div className="order-3 mr-0 ltr:ml-4 rtl:mr-4">
                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex justify-end gap-2 mb-2">
                                                        <div className="relative order-2 px-5 py-3 text-gray-700 rounded-lg rounded-br-none bg-gray-50 dark:bg-zinc-700">
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent ltr:before:border-r-gray-50 ltr:before:border-t-gray-50 rtl:before:border-l-gray-50 rtl:before:border-t-gray-50 ltr:before:right-0 rtl:before:left-0 before:-bottom-2 ltr:dark:before:border-t-zinc-700 ltr:dark:before:border-r-zinc-700 rtl:dark:before:border-t-zinc-700 rtl:dark:before:border-l-zinc-700"></div>
                                                            <div className="p-2 mb-2 bg-white rounded dark:bg-zinc-800">
                                                                <div className="flex flex-wrap items-center gap-2 attached-file">
                                                                    <div className="flex items-center justify-center w-12 h-12 rounded group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                                                                        <i className="ri-file-text-fill"></i>
                                                                    </div>
                                                                    <div className="overflow-hidden flex-grow-1">
                                                                        <div className="text-start">
                                                                            <h5 className="mb-1 truncate text-14 dark:text-gray-50">admin_v1.0.zip</h5>
                                                                            <p className="mb-0 text-gray-500 truncate text-13 dark:text-gray-500">12.5 MB</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rtl:mr-4 ltr:ml-4">
                                                                        <div className="flex items-start gap-2">
                                                                            <div>
                                                                                <a download="admin_v1.0.zip" href="assets/images/small/admin_v1.0.zip" className="font-medium ">
                                                                                    <i className="text-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 ri-download-2-line"></i>
                                                                                </a>
                                                                            </div>
                                                                            <div className="relative self-start order-1 dropstart">
                                                                                <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton20">
                                                                                    <i className="text-lg text-gray-500 ri-more-2-fill dark:text-gray-300"></i>
                                                                                </a>
                                                                                <div className="absolute left-0 right-auto z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg lg:ltr:right-0 lg:ltr:left-auto rtl:left-0 rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700" aria-labelledby="dropdownMenuButton20">
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-chat-forward-line"></i></a>
                                                                                    <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-delete-bin-line"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <p className="mt-1 mb-0 text-xs text-left text-gray-500"><i className="align-middle ri-time-line"></i> <span className="align-middle">10:16</span></p>
                                                        </div>

                                                        <div className="relative self-start order-1 dropstart">
                                                            <a className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-100" href="#" role="button" data-bs-toggle="dropdown" id="dropdownMenuButton21">
                                                                <i className="ri-more-2-fill"></i>
                                                            </a>
                                                            <div className="absolute z-50 hidden py-2 my-6 text-left list-none bg-white border-none rounded shadow-lg ltr:right-auto ltr:left-0 xl:ltr:right-0 xl:ltr:left-auto rtl:right-0 rtl:left-auto xl:rtl:left-0 xl:rtl:right-auto dropdown-menu w-36 bg-clip-padding dark:bg-zinc-700" aria-labelledby="dropdownMenuButton21">
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Copy <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-file-copy-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Save <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-save-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Forward <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-chat-forward-line"></i></a>
                                                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">Delete <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-100 ri-delete-bin-line"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-medium text-gray-700 rtl:text-left text-14 dark:text-gray-300">Patricia Smith</div>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="clear-both py-4">
                                            <div className="flex items-end gap-3">
                                                <div>
                                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-full h-9 w-9" />
                                                </div>

                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                                                            <div className="before:content-[''] before:absolute before:border-[5px] before:border-transparent group-data-[theme-color=violet]:ltr:before:border-l-violet-500 group-data-[theme-color=violet]:ltr:before:border-t-violet-500 group-data-[theme-color=green]:ltr:before:border-l-green-500 group-data-[theme-color=green]:ltr:before:border-t-green-500 group-data-[theme-color=red]:ltr:before:border-l-red-500 group-data-[theme-color=red]:ltr:before:border-t-red-500 group-data-[theme-color=violet]:rtl:before:border-r-violet-500 group-data-[theme-color=violet]:rtl:before:border-t-violet-500 group-data-[theme-color=green]:rtl:before:border-r-green-500 group-data-[theme-color=green]:rtl:before:border-t-green-500 group-data-[theme-color=red]:rtl:before:border-r-red-500 group-data-[theme-color=red]:rtl:before:border-t-red-500 ltr:before:left-0 rtl:before:right-0 before:-bottom-2"></div>
                                                                <div className="flex items-end gap-2 mb-0 text-white text-14">
                                                                    <p className="mb-0">typing</p>

                                                                    <div className="animate-typing flex gap-0.5">
                                                                        <p className="w-1 h-1 mb-1 bg-white rounded-full dot animate-bounce"></p>
                                                                        <p className="w-1 h-1 mb-1 bg-white rounded-full dot-2 "></p>
                                                                        <p className="w-1 h-1 mb-1 bg-white rounded-full dot-3 animate-bounce"></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    <div className="font-medium text-gray-700 text-14 dark:text-gray-300">Doris Brown</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- end chat conversation end --> */}

                                {/* <!-- start chat input section --> */}
                                <div className="z-40 w-full p-6 mb-0 bg-white border-t lg:mb-1 border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
                                    <div className="flex gap-2">
                                        <div className="flex-grow">
                                            <input type="text" value={newMessage} onChange={handleInputMessage} onClick={handleSendMessage} className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-700 dark:placeholder:text-gray-300 dark:text-gray-300" placeholder="Enter Message..." />
                                        </div>
                                        <div>
                                            <div>
                                                <ul className="mb-0">
                                                    <li className="inline-block" title="Emoji">
                                                        <button type="button" className="border-transparent group/tooltip btn relative group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16">
                                                            <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                                                                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Emoji</span>
                                                            </div>
                                                            <i className="ri-emotion-happy-line"></i>
                                                        </button>
                                                    </li>
                                                    <li className="inline-block" title="Attached File">
                                                        <button type="button" className="border-transparent btn group/tooltip group-data-[theme-color=violet]:dark:text-violet-200 group-data-[theme-color=green]:dark:text-green-200 group-data-[theme-color=red]:dark:text-red-200 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 text-16">
                                                            <div className="absolute items-center hidden -top-10 ltr:-left-2 group-hover/tooltip:flex rtl:-right-2">
                                                                <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                                                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">Attached File</span>
                                                            </div>
                                                            <i className="ri-attachment-line"></i>
                                                        </button>
                                                    </li>
                                                    <li className="inline-block">
                                                        <button type="submit" className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600">
                                                            <i className="ri-send-plane-2-fill"></i>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end chat input section --> */}

                            </div>
                            {/* <!-- end chat conversation section --> */}

                            {/* <!-- start User profile detail sidebar --> */}
                            <UserProfileDetails />

                            {/* <!-- end User profile detail sidebar --> */}
                        </div>
                    </div>
                    {/* <!-- End User chat --> */}
                </div>
        </>
    )
}
