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

    const selectFriend = async (friend) => {
        
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

    const getRoom = async (participants) => {
        try {
            const participantIds = participants.participants;
            console.log( {participantIds});
    
            const roomsRef = ref(db, `rooms/${id}`);
            const snapshot = await get(query(roomsRef, orderByChild("participants").equalTo(participants)));
    
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
    
    const createRoom = async (participants) => {
        const newRoom = {
            uid: '',
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
        
        return {
            id: newRoomRef.key,
            ...newRoom,
        };
    }

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

                {/* <!-- Start chat-message-list --> */}
                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            {users.length > 0 &&
                                users.map((user) => (
                                    <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                        <SingleChat user={userData} key={user.id} onClick={()=>(selectFriend(user))}/>
                                    </li>
                                    ))}
                           </ul>
                    </div>
                </div>
            </div>
        </>
    );
}