import { useContext, useEffect, useState } from "react";
import { AppContext, RoomContext } from "../../appContext/AppContext";
import { db } from "../../config/firebase-config";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const { userId, friendId, roomId, setContext } = useContext(RoomContext);
    const [room, setRoom] = useState({
      uid: '',
      participants: [],
      messages: [
        {
            messageId: "",
        },
      ],
    });


//select friend, check if room exists, if not create room
    const selectFriend = async (friend) => {
        const participants = [user.uid, friend.id];
        const room = await getRoom(participants);
        
        if (!room) {
            const newRoom = await createRoom(participants);
            setRoom(newRoom);
            setContext({
                userId: user.uid,
                friendId: friend.id,
                roomId: newRoom.id,
            });
        } else {
            setRoom(room);
            setContext({
                userId: user.uid,
                friendId: friend.id,
                roomId: room.id,
            });
        }
        setContext({
            userId: user.uid,
            friendId: friend.id,
            roomId: room.id,
        });
    }

    const getRoom = async (participants) => {
        const snapshot = await get(query(ref(db, "rooms"), orderByChild("participants"), equalTo(participants)));
        if (!snapshot.exists()) {
            return null;
        }
        const room = {
            id: snapshot.key,
            ...snapshot.val(),
        };
        return room;
    }

    const createRoom = async (participants) => {
        const newRoom = {
            participants,
            messages: [
                {
                    messageId: "",
                },
            ],
        };
        const roomRef = ref(db, "rooms");
        const newRoomRef = push(roomRef);
        await update(newRoomRef, newRoom);
        return {
            id: newRoomRef.key,
            ...newRoom,
        };
    }


    // const createUserRoom = (uid, participants, messages) => {
      
    //     return set(ref(db, `rooms/${uid}`), {
    //       uid,
    //       participants,
    //       messages,
    //       
    //     });
    //   };














    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
        console.log({ users });
    }, []);

    // later to change it to friends list not all users
    const getAllUsers = async () => {
        const snapshot = await get(query(ref(db, "users")));
        if (!snapshot.exists()) {
            return [];
        }
        const users = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
        }));

        return users;
    }
    const handleSearchChange = async (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        if (value.trim() === "") {
            const updatedUsers = await getAllUsers();
            setUsers(updatedUsers);
        } else {
            const snapshot = await get(query(ref(db, "users")));
            if (snapshot.exists()) {
                const users = Object.keys(snapshot.val()).map((key) => ({
                    id: key,
                    ...snapshot.val()[key],
                }));

                const filteredUsers = users.filter((user) =>
                    user.username.toLowerCase().includes(value) ||
                    user.email.toLowerCase().includes(value)
                );
                setUsers(filteredUsers);
            }
        }
    };

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
                        <input type="text" value={search} onChange={handleSearchChange} className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400" placeholder="Search messages or users" aria-label="Search messages or users" aria-describedby="basic-addon1" />
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
                            {users.length > 0 &&
                            // onClick={() => selectFriend(user)}
                                users.map((user) => (
                                    <li key={user.id} onClick={selectFriend(user.id)} className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                        <a href="#">
                                            <div className="flex">
                                                <div className="relative self-center ltr:mr-3 rtl:ml-3">
                                                    <img src="./assets/images/users/avatar-2.jpg" className="rounded-full w-9 h-9" alt="" />
                                                    <span className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full top-7 ltr:right-1 rtl:left-1 dark:border-zinc-600"></span>
                                                </div>

                                                <div className="flex-grow overflow-hidden">
                                                    <h5 className="mb-1 text-base truncate dark:text-gray-50">{user.username}</h5>
                                                    <p className="mb-0 text-gray-500 truncate dark:text-gray-300 text-14">Hey! there I'm available</p>
                                                </div>
                                                <div className="text-gray-500 text-11 dark:text-gray-300">05 min</div>
                                            </div>
                                        </a>
                                    </li>))
                            }
                           </ul>
                    </div>
                </div>
                {/* <!-- End chat-message-list --> */}
            </div>
        </>
    );
}