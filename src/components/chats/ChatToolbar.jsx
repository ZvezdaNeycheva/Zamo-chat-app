import { ModalVideoCall } from "./ModalVideoCall";
import { ModalAudioCall } from "./ModalAudioCall";
import { useState } from "react";
import { UserProfileDetails } from "./UserProfileDetails";
import { NavLink } from "react-router-dom";

export function ChatToolbar({ userData }) {
    const [showProfileDetails, setShowProfileDetails] = useState(false); 

    const toggleProfileDetails = () => {
        setShowProfileDetails(!showProfileDetails); 
    };

    const toggleModalAudio = () => { // This is the function that will be called when the audio button is clicked
    };


    return (
        <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                        <div className="block ltr:mr-2 rtl:ml-2 lg:hidden">
                            <a href="#" onClick={() => { }} className="p-2 text-gray-500 user-chat-remove text-16"><i className="ri-arrow-left-s-line"></i></a>
                        </div>
                        <div className="rtl:ml-3 ltr:mr-3">
                            <img src={userData?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="rounded-full w-9 h-9" />
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                                <a href="#" className="text-gray-800 dark:text-gray-50">{userData?.username}</a>
                                {/* <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i> */}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                    <ul className="flex items-center justify-end lg:gap-4">

                        {/* Search in chat */}
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

                        {/* Audio Call */}
                        <li>
                            <button onClick={toggleModalAudio} type="button" className=" text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#audiCallModal">
                                <i className="ri-phone-line"></i>
                            </button>
                            {toggleModalAudio && <ModalAudioCall />}
                        </li>

                        {/* <!-- Modal start --> */}
                        <ModalAudioCall />
                        {/* <!-- Modal end --> */}

                        {/* Video Call */}
                        <li>
                            <button type="button" className="text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#videoCallModal">
                                <i className="ri-vidicon-line"></i>
                            </button>
                        </li>

                        {/* <!-- Modal start --> */}
                        <ModalVideoCall />
                        {/* <!-- Modal end --> */}

                        {/* UserProfileDetails */}
                        <li className="px-3">
                            <NavLink to="/user-profile-details" onClick={toggleProfileDetails} className=" text-gray-500 dark:text-gray-300 lg:block profileTab">
                                <i className="text-xl ri-group-line"></i>
                            </NavLink>
                        </li>

                        {/* dropdown menu */}
                        <li className="px-3">
                            <div className="relative dropdown">
                                <button className="p-0 text-xl text-gray-500 border-0 btn dropdown-toggle dark:text-gray-300" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton11">
                                    <i className="ri-more-fill"></i>
                                </button>
                                <ul className="absolute z-50 hidden w-40 py-2 mx-4 mt-2 text-left list-none bg-white border rounded shadow-lg ltr:-right-4 border-gray-50 dropdown-menu top-8 dark:bg-zinc-600 bg-clip-padding dark:border-gray-600/50 rtl:-left-5" aria-labelledby="dropdownMenuButton11">
                                    <li className="block lg:hidden">
                                        <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent profileTab dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" >
                                            View profile
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-user-2-line text-16"></i>
                                        </a>
                                    </li>
                                    <li className="block lg:hidden">
                                        <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" data-tw-toggle="modal" data-tw-target="#audiCallModal">
                                            Audio
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-phone-line text-16"></i>
                                        </a>
                                    </li>
                                    <li className="block lg:hidden">
                                        <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right" data-tw-toggle="modal" data-tw-target="#videoCallModal">
                                            Video
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-vidicon-line text-16"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right">
                                            Archive
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-archive-line text-16"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right">
                                            Muted
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-volume-mute-line text-16"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-700 ltr:text-left rtl:text-right">
                                            Delete
                                            <i className="text-gray-500 rtl:float-left ltr:float-right dark:text-gray-300 ri-delete-bin-line text-16"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}