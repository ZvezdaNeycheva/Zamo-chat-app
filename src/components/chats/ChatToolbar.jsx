import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroup } from "../../service/groupAndChannel.service";
import { getUserByUid } from "../../service/users.service";

export function ChatToolbar({ otherUser, channel, onProfile }) {
    const [isOtherUserProfileVisible, setIsOtherUserProfileVisible] = useState(false);
    const navigate = useNavigate();
    const { groupId, channelId } = useParams();
    const [group, setGroup] = useState(null);
    const [memberNames, setMemberNames] = useState([]);

    useEffect(() => {
        if (!groupId) return;
        const fetchGroup = async () => {
            const group = await getGroup(groupId)
            setGroup(group)

            const membersData = await Promise.all(
                Object.keys(group.members).map(uid => getUserByUid(uid))
            );

            const usernames = membersData.map(member => member.username);
            setMemberNames(usernames);
        }
        fetchGroup()

    }, [groupId]);

    const handleVideoCall = () => {
        if (!otherUser?.uid) return;
        try {
            navigate(`/video/${otherUser.uid}`, { state: { username: otherUser.username, autoCall: true } });

        } catch (error) {
            console.error("Error initiating video call:", error);
        }
    };

    const toggleProfileDetails = () => {
        setIsOtherUserProfileVisible(prev => !prev);
    };

    return (
        <>
            <div className="sticky top-0 z-40 bg-white dark:bg-zinc-700 p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
                <div className="grid items-center grid-cols-12">
                    <div className="col-span-8 sm:col-span-4">
                        <div className="flex items-center">
                            {otherUser && (
                                <>
                                    <div className="rtl:ml-3 ltr:mr-3" onClick={toggleProfileDetails}>
                                        <img src={otherUser?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="rounded-full w-9 h-9" />
                                    </div>
                                    <div className="flex-grow overflow-hidden" onClick={toggleProfileDetails}>
                                        <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                                            <a href="#" className="text-gray-800 dark:text-gray-50">{otherUser?.username}</a>
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
                            {/* Video Call */}
                            {!channel ?? <li>
                                <button onClick={handleVideoCall} type="button" className="text-xl text-gray-500 border-0 btn dark:text-gray-300 lg:block" data-tw-toggle="modal" data-tw-target="#videoCallModal">
                                    <i className="ri-phone-line"></i>
                                </button>
                            </li>}
                            {/* UserProfileDetails */}
                            <li className="px-3">
                                <button onClick={toggleProfileDetails} className={`text-gray-500 dark:text-gray-300 lg:block profileTab`} to="/user-profile-details" >
                                    <i className="text-xl ri-group-line"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >

            {/* Modal */}
            {isOtherUserProfileVisible && (
                channel ? (<div className="flex items-center justify-center w-full h-full top-0 left-0 absolute z-50 backdrop-blur-sm bg-black/20 l:pt-40 xl:pt-0 m:pt-40">
                    <div className="relative bg-white min-w-full min-h-full lg:min-w-[800px] lg:min-h-[600px] lg:rounded-lg lg:shadow-lg dark:bg-gray-800">

                        {/* exit button */}
                        <button onClick={toggleProfileDetails} className="z-50 absolute top-8 left-7 text-gray-100 xl:text-5xl lg:text-3xl base:text-2xl sm:text-2xl"> &times; </button>

                        <div className="bg-cover bg-center relative dark:bg-gray-800">

                            <img src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="w-full h-80 object-cover absolute rounded-t-lg" alt="background" />

                            {/* Drop Down for Delete Profile */}
                            <div className="px-6 pt-6">

                                {/* Title */}
                                <div className="relative ">
                                    <p className="left-14 top-3 top-3.5 font-semibold text-center text-white absolute xl:text-4xl lg:text-3xl base:text-2xl sm:text-2xl xs:text-2xl"> Profile </p>
                                </div>
                            </div>

                            {/* Profile picture */}
                            <div className="p-6 text-center">
                                <div className="mb-4 relative flex flex-col items-start justify-end top-24">
                                    <img src="https://www.shutterstock.com/image-vector/group-5-people-different-gender-260nw-2532343043.jpg" className="sm:w-12 sm:h-12 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64 p-1 border border-gray-100 rounded-full dark:border-zinc-800" alt="Group-avatar" />
                                </div>
                            </div>

                        </div>
                        {/* End profile Header */}

                        {/* Username*/}
                        <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg w-100 h-auto mt-20 ml-5 mr-5 mb-5">

                            <h5 className="mb-1 text-lg font-semibold text-black-700 dark:text-gray-50 border-b-2 ">About</h5>

                            <div className="pt-3">
                                <div>
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <span className="inline-block w-3 h-6 mr-2">
                                                <i className="ri-wechat-channels-line text-gray-500 dark:text-gray-400"></i>
                                            </span>
                                            <p className="text-gray-500 dark:text-gray-300">Channel/Group name</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h5 className="text- dark:text-gray-50">{channel ? `${channel.name} in ${group.name}` : "N/A"}</h5>
                                        </div>
                                    </div>

                                    {/* Creator */}
                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center">
                                            <span className="inline-block w-3 h-6 mr-2">
                                                <i className="ri-user-fill text-gray-500 dark:text-gray-400"></i>
                                            </span>
                                            <p className="text-gray-500 dark:text-gray-300">Creator</p>
                                        </div>
                                        <div className="flex items-center">
                                            <h5 className="dark:text-gray-50">{channel ? channel.creatorName : "N/A"}</h5>
                                        </div>
                                    </div>

                                    {/* Members */}
                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center">
                                            <span className="inline-block w-3 h-6 mr-2">
                                                <i className="ri-group-line text-gray-500 dark:text-gray-400"></i>
                                            </span>
                                            <p className="text-gray-500 dark:text-gray-300">Members</p>
                                        </div>
                                        <div className="flex items-center">

                                            {group && group.members && (
                                                memberNames.map(name => <h5 className="dark:text-gray-50">{name}, </h5>))
                                            }
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="mt-5">
                                        <div className="mb-2 flex items-center">
                                            <span className="inline-block w-3 h-6 mr-2">
                                                <i className="ri-calendar-fill text-gray-500 dark:text-gray-400"></i>
                                            </span>
                                            <p className="text-gray-500 dark:text-gray-300">Create Date</p>
                                        </div>
                                        <h5 className="dark:text-gray-50">{channel ? channel.createdOnReadable : "N/A"}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) :
                    (<div className="flex items-center justify-center w-full h-full top-0 left-0 absolute z-50 backdrop-blur-sm bg-black/20 l:pt-40 xl:pt-0 m:pt-40">
                        <div className="relative bg-white min-w-full min-h-full lg:min-w-[800px] lg:min-h-[600px] lg:rounded-lg lg:shadow-lg dark:bg-gray-800">

                            {/* exit button */}
                            <button onClick={toggleProfileDetails} className="z-50 absolute top-8 left-7 text-gray-100 xl:text-5xl lg:text-3xl base:text-2xl sm:text-2xl"> &times; </button>

                            <div className="bg-cover bg-center relative dark:bg-gray-800">

                                <img src={otherUser?.profileBackgroundURL || "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} className="w-full h-80 object-cover absolute rounded-t-lg" alt="background" />

                                {/* Drop Down for Delete Profile */}
                                <div className="px-6 pt-6">

                                    {/* Title */}
                                    <div className="relative ">
                                        <p className="left-14 top-3 top-3.5 font-semibold text-center text-white absolute xl:text-4xl lg:text-3xl base:text-2xl sm:text-2xl xs:text-2xl"> Profile </p>
                                    </div>
                                </div>

                                {/* Profile picture */}
                                <div className="p-6 text-center">
                                    <div className="mb-4 relative flex flex-col items-start justify-end top-24">
                                        <img src={otherUser?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} className="sm:w-12 sm:h-12 md:w-52 md:h-52 lg:w-56 lg:h-56 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64 p-1 border border-gray-100 rounded-full dark:border-zinc-800" alt="Avatar" />
                                    </div>
                                </div>

                            </div>
                            {/* End profile Header */}

                            {/* Username and Status*/}
                            <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-lg w-100 h-auto mt-20 ml-5 mr-5 mb-5">

                                <h5 className="mb-1 text-lg font-semibold text-black-700 dark:text-gray-50 border-b-2 ">About</h5>

                                {/* Dropdown menu for status*/}
                                <div className="relative mb-1 flex mt-2 dark:bg-gray-800">
                                    <div className="mb-1 text-lg font-semibold text-gray-800 dark:text-gray-50 mt-1">Status: </div>

                                    <div className="relative ml-2 dark:bg-gray-800">
                                        {/*  User Status */}
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <div>
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                <span className="inline-block w-3 h-6 mr-2">
                                                    <i className="ri-user-fill text-gray-500 dark:text-gray-400"></i>
                                                </span>
                                                <p className="text-gray-500 dark:text-gray-300">Username</p>
                                            </div>
                                            <div className="flex items-center">
                                                <h5 className="text- dark:text-gray-50">{otherUser ? otherUser.username : "N/A"}</h5>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="mt-5">
                                            <div className="mb-2 flex items-center">
                                                <span className="inline-block w-3 h-6 mr-2">
                                                    <i className="ri-mail-fill text-gray-500 dark:text-gray-400"></i>
                                                </span>
                                                <p className="text-gray-500 dark:text-gray-300">Email</p>
                                            </div>
                                            <div className="flex items-center">
                                                <h5 className="dark:text-gray-50">{otherUser ? otherUser.email : "N/A"}</h5>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="mt-5">
                                            <div className="mb-2 flex items-center">
                                                <span className="inline-block w-3 h-6 mr-2">
                                                    <i className="ri-map-pin-2-fill text-gray-500 dark:text-gray-400"></i>
                                                </span>
                                                <p className="text-gray-500 dark:text-gray-300">Location</p>
                                            </div>
                                            <div className="flex items-center">
                                                <h5 className=" dark:text-gray-50">{otherUser ? otherUser.location : "N/A"}</h5>
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="mt-5">
                                            <div className="mb-2 flex items-center">
                                                <span className="inline-block w-3 h-6 mr-2">
                                                    <i className="ri-calendar-fill text-gray-500 dark:text-gray-400"></i>
                                                </span>
                                                <p className="text-gray-500 dark:text-gray-300">Create Profile Date</p>
                                            </div>
                                            <h5 className="dark:text-gray-50">{otherUser ? otherUser.createdOnReadable : "N/A"}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            )}
        </>
    );
}
