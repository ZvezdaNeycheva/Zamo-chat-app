import { useContext, useEffect, useState } from "react";
import { AppContext, RoomContext } from "../../appContext/AppContext";
import { db } from "../../config/firebase-config";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useParams } from "react-router-dom";
import { SingleChat } from "./SingleChat";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");

    let { id } = useParams();
    const [rooms, setRooms] = useState(undefined);
    // const [friend, setFriend] = useState({});

    const { userId, friendId, roomId, setContext } = useContext(RoomContext);
    const [room, setRoom] = useState({
      id: '',
      participants: [],
      messages: [
        {
            messageId: "",
        },
      ],
    });
    
    
    //select friend, check if room exists, if not create room
    const selectFriend = async (friend) => {
        console.log({friend});
        console.log(`Rendering SingleChat with roomId: ${room?.id}`);
        console.log('The console.logs here doesn\'t show up anymore')
        const participants = [user?.uid, friend.uid];
        console.log({participants});
        const room = await getRoom(participants);
        
        if (!room) {
            const newRoom = await createRoom(participants);
            setRoom(newRoom);
            setContext({
                userId: user.uid,
                friendId: friend.uid,
                roomId: newRoom.id,
            });
        } else {
            setRoom(room);
            setContext({
                userId: user.uid,
                friendId: friend.uid,
                roomId: room.id,
            });
        }
        setContext({
            userId: user.uid,
            friendId: friend.uid,
            roomId: room.id,
        });
    }

    // const getRoom = async (participants) => {
    //     // const participants = Object.values(participants); // Extract the participants array
    //     const participantIds = participants.participants;
    //     const snapshot = await get(query(ref(db, "rooms"), orderByChild("participants"), equalTo(participantIds)));
    //     console.log('HI');
    //     if (!snapshot.exists()) {
    //         console.log('rooms does not exist'+{room});
    //         return null;
    //     }
    //     const room = {
    //         id: snapshot.key,
    //         ...snapshot.val(),
    //     };
    //     console.log({room});
    //     return room;
    // }
    // const getRoom = async (participants) => {
    //     try {
    //         const participantIds = participants.participants;
    //         const snapshot = await get(query(ref(db, "rooms"), orderByChild("participants"), equalTo(participantIds)));
    
    //         if (!snapshot.exists()) {
    //             console.log('Room does not exist');
    //             return null;
    //         }
    
    //         const room = {
    //             id: snapshot.key,
    //             ...snapshot.val(),
    //         };
    
    //         console.log('Room:', room);
    //         return room;
    //     } catch (error) {
    //         console.error('Error fetching room:', error);
    //         return null;
    //     }
    // }
    const getRoom = async (participants) => {
        try {
            const participantIds = participants.participants;
            console.log( {participantIds});
    
            const roomsRef = ref(db, `rooms/${id}`);
            // const roomsRef = ref(db, `users/${user.uid}rooms/${id}`);
            const snapshot = await get(query(roomsRef, orderByChild("participants").equalTo(participantIds)));
    
            console.log('Snapshot:', snapshot.val());
    
            if (!snapshot.exists()) {
                console.log('Room does not exist');
                return null;
            }
    
            // Iterate over the snapshot to retrieve the room data
            let roomId;
            snapshot.forEach((childSnapshot) => {
                roomId = childSnapshot.key;
            });
    
            const room = {
                id: roomId,
                ...snapshot.val()[roomId],
            };
    
            console.log('Room:', room);
            return room;
        } catch (error) {
            console.error('Error fetching room:', error);
            return null;
        }
    }
    // const getRoom = async (participants) => {
    //     try {
    //         const participantIds = participants.participants;
    //         console.log('Participant IDs:', participantIds);
    
    //         const roomsRef = ref(db, "rooms");
    //         const snapshot = await get(roomsRef);
    
    //         if (!snapshot.exists()) {
    //             console.log('Rooms do not exist');
    //             return null;
    //         }
    
    //         let room = null;
    
    //         snapshot.forEach((childSnapshot) => {
    //             const roomData = childSnapshot.val();
    //             const roomParticipants = roomData.participants;
    
    //             // Check if the participants in the room match the provided participants
    //             if (roomParticipants && roomParticipants.length === participantIds.length && roomParticipants.every((id, index) => id === participantIds[index])) {
    //                 room = {
    //                     id: childSnapshot.key,
    //                     ...roomData
    //                 };
    //             }
    //         });
    
    //         if (!room) {
    //             console.log('Room not found for the given participants');
    //             return null;
    //         }
    
    //         console.log('Room:', room);
    //         return room;
    //     } catch (error) {
    //         console.error('Error fetching room:', error);
    //         return null;
    //     }
    // }
    
    
    const createRoom = async (participants) => {
        const newRoom = {
            participants,
            messages: [
                {
                    messageId: "",
                },
            ],
        };
        const roomRef = ref(db, `rooms`);
        const newRoomRef = push(roomRef);
        await update(newRoomRef, newRoom);
        // add room reference to user's rooms
        await update(ref(db, `users/${user.uid}/rooms`), {
            [newRoomRef.key]: true,
        });
        
        // roomId = newRoomRef.key;
        id = newRoomRef.key;
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


{import { useContext, useEffect, useState } from "react";
import { AppContext, RoomContext } from "../../appContext/AppContext";
import { db } from "../../config/firebase-config";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useNavigate,useParams } from "react-router-dom";
import { SingleChat } from "./SingleChat";
import { getAllUsers } from "../../service/users.service";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    let { id } = useParams();

    const { userId, friendId, roomId, setContext } = useContext(RoomContext);
    const [room, setRoom] = useState({
        id: '',
        participants: [],
        messages: [{messageId: "",},],
    });

    const selectFriend = async (friend) => {
        const participants = [user?.uid, friend.uid];
        const room = await getRoom(participants);
        // console.log({ participants });
console.log({ room });
        if (!room) {
            const newRoom = await createRoom(participants);
console.log({ newRoom });
            setRoom(newRoom);
            setContext({
                userId: user.uid,
                friendId: friend.uid,
                roomId: newRoom.id,
            });
        } else {
            setRoom(room);
            setContext({
                userId: user.uid,
                friendId: friend.uid,
                roomId: room.id,
            });
        }
    }  

    const getRoom = async (participants) => {
        try {
            // console.log(participants); //array of 2 user ids
            
            const roomsRef = ref(db, `rooms`);
            const roomsUser = ref(db, `users/${user.uid}/rooms`);

             const snapshotAll = await get(roomsRef)
             const snapshotUser = await get(roomsUser)

        const allRooms = snapshotAll.val();
        const userRooms = snapshotUser.val();
        console.log('AllRooms:', allRooms);
        // console.log(Object.values(allRooms).map((key) => key.participants));//OK


           const froom = [...Object.values(allRooms).map((key) => key.participants)]
            console.log({froom});
            console.log(Object.values(froom).map((key) => key));


        // const filteredRooms = Object.keys(allRooms).filter(key => userRooms[key]);
        // console.log('FilteredRooms:', filteredRooms);
            
        //     for (const roomId in allRooms) {
        //         if (Object.hasOwnProperty.call(allRooms, roomId)) {
        //           const room = allRooms[roomId];
        //           const participants = room.participants;
                  
        //           // Now you can use the participants object for further processing
        //         //   console.log(`Participants of room ${roomId}:`, participants);
        //         }
        //       }
             
            const filteredRooms = Object.keys(allRooms).filter(roomId => {
                const room = allRooms[roomId];
                const roomParticipants = Object.keys(room.participants); 
                console.log({roomParticipants});
                return roomParticipants.length === 2 && 
                       participants.every(participant => roomParticipants.includes(participant));
            });
            
    console.log({filteredRooms});
            return filteredRooms;
        } catch (error) {
            console.error('Error fetching room:', error);
            return null;
        }
    }

    const createRoom = async (participants) => {
        const newRoom = {
            participants:participants.reduce((acc, key)=>({
                ...acc,
                [key]: true
            
            }),{}),
        };

        const roomRef = push(ref(db, "rooms"));
        await update(roomRef, newRoom);

        // Add room reference to each participant's list of rooms
        for (const participant of participants) {
            await update(ref(db, `users/${participant}/rooms`), {
                [roomRef.key]: true
            });
        }
        // const { userId, friendId, roomId, setContext } = useContext(RoomContext);
        setContext({userId, friendId, roomId:roomRef.key, setContext})
        
        return {
            id: roomRef.key,
            ...newRoom
        };
    };

    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
    }, []);

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

                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            {users.length > 0 &&
                                users.map((user) => (
                                    <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                        <SingleChat user={user} roomId={room?.id} key={user.id} onClick={() => (selectFriend(user))} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}}











    useEffect(() => {
        getAllUsers().then((users) => setUsers(users));
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
                {/* <div className="px-6 pb-6" dir="ltr">

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
                    </div> */}
                    {/* <!-- end user status carousel --> */}
                {/* </div> */}
                {/* <!-- end user status --> */}

                {/* <!-- Start chat-message-list --> */}
                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            {users.length > 0 &&
                            // onClick={() => selectFriend(user)} selectFriend(user.uid)
                                users.map((user) => (
                                    <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">

                                        <SingleChat className="tab-content active" user={user} roomId={room?.id} key={user.id} onClick={()=>(selectFriend(user))}/>
                                        </li>

                                    ))
                            }
                           </ul>
                    </div>
                </div>
                {/* <!-- End chat-message-list --> */}
            </div>
        </>
    );
}

useEffect(() => {
    const fetchMessages = async () => {
        if (!user || !roomId) return;

        try {
            const messagesRef = ref(db, `rooms/${roomId}/messages`);
            const snapshot = await get(messagesRef);

            if (snapshot.exists()) {
                setMessages(snapshot.val());
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    fetchMessages();
}, [user, roomId]);