import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createDyteCallRoom } from "../../service/Dyte/dyte.calls.service";
import { Video } from "../DyteSDK/Video"; // Import the Video component
import { useNavigate } from "react-router-dom";

export function ChatToolbar({ otherUser, channel }) {
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const [showVideoCall, setShowVideoCall] = useState(false); // State to control the visibility of the Video component
    const navigate = useNavigate();

    const handleVideoCall = () => {
        createDyteCallRoom("meetingId", "Test Meeting").then((roomId) => {
            console.log("Call room created with roomId:", roomId);
            navigate("/video");
        }).catch((error) => {
            console.error("Error creating call room:", error);
        });
    };

    const toggleProfileDetails = () => {
        setShowProfileDetails(!showProfileDetails);
    };

    return (
        <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
            <div className="grid items-center grid-cols-12">
                <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                        {otherUser && (
                            <>
                                <div className="rtl:ml-3 ltr:mr-3">
                                    <img src={otherUser?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="rounded-full w-9 h-9" />
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                                        <a href="#" className="text-gray-800 dark:text-gray-50">{otherUser?.username}</a>
                                        {/* <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i> */}
                                    </h5>
                                </div>
                            </>
                        )}
                        {channel && (
                            <div className="flex-grow overflow-hidden">
                                <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                                    <a href="#" className="text-gray-800 dark:text-gray-50">{channel.name}</a>
                                </h5>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-4 sm:col-span-8">
                    <ul className="flex items-center justify-end lg:gap-4">
                        
                        {/* Audio Call */}
                        <li>
                            <button onClick={handleVideoCall} type="button" className=" text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#audiCallModal">
                                <i className="ri-phone-line"></i>
                            </button>
                        </li>

                        {/* Video Call */}
                        <li>
                            <button type="button" className="text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#videoCallModal">
                                <i className="ri-vidicon-line"></i>
                            </button>
                        </li>

                        {/* UserProfileDetails */}
                        <li className="px-3">
                            <NavLink to="/user-profile-details" onClick={toggleProfileDetails} className=" text-gray-500 dark:text-gray-300 lg:block profileTab">
                                <i className="text-xl ri-group-line"></i>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
            {/* Render the Video component if showVideoCall is true */}
            {showVideoCall && <Video />}
        </div>
    );
}
