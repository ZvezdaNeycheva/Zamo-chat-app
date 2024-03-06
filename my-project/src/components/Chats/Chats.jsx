import { useContext, useEffect, useState } from "react";
import { AppContext, RoomContext } from "../../appContext/AppContext";
import { db } from "../../config/firebase-config";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { SingleChat } from "./SingleChat";
import { getAllUsers } from "../../service/users.service";
import { useRecoilState } from 'recoil';
import { currentRoomId } from "../../atom/atom";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    let { id } = useParams();

    const [currentRoom, setCurrentRoom] = useRecoilState(currentRoomId);

    // const { userId, friendId, roomId, setContext } = useContext(RoomContext);
    const [room, setRoom] = useState({
        id: '',
        participants: [],
        messages: [{ messageId: "", },],
    });

    const selectFriend = async (friend) => {
        const participants = [user?.uid, friend.uid];
        const room = await getRoom(participants);
        console.log({ room });
        // setContext({ userId, friendId, roomId: room.id });
        // console.log({roomId});
        
        if (!room) {
            const newRoom = await createRoom(participants);
            console.log({ newRoom });
            setRoom(newRoom);
            // setContext({
            //     userId: user.uid,
            //     friendId: friend.uid,
            //     roomId: newRoom.id,
            // });
        } else {
            setRoom(room);
            // setContext({
            //     userId: user.uid,
            //     friendId: friend.uid,
            //     roomId: room.id,
            // });
        }
        setCurrentRoom(room.id);
        // console.log({currentRoom});
    }
    // useEffect(() => {
    //     console.log("Current Room in useEffect:", currentRoom);
    // }, [currentRoom]);

    const getRoom = async (participants) => {
        try {
            const roomsRef = ref(db, 'rooms');
            const snapshot = await get(roomsRef);
    
            if (snapshot.exists()) {
                const allRooms = snapshot.val();
                const roomId = Object.keys(allRooms).find(roomId => {
                    const room = allRooms[roomId];
                    const roomParticipants = Object.keys(room.participants);
                    return (
                        roomParticipants.length === participants.length &&
                        roomParticipants.every(participant => participants.includes(participant))
                    );
                });
    
                if (roomId) {
                    return {
                        id: roomId,
                        ...allRooms[roomId]
                    };
                }
            }
            return null;
        } catch (error) {
            console.error('Error fetching room:', error);
            return null;
        }
    };
    
    const createRoom = async (participants) => {
        const newRoom = {
            participants: participants.reduce((acc, key) => ({
                ...acc,
                [key]: true

            }), {}),
        };

        const roomRef = push(ref(db, "rooms"));
        await update(roomRef, newRoom);

        for (const participant of participants) {
            await update(ref(db, `users/${participant}/rooms`), {
                [roomRef.key]: true
            });
        }
        // const { userId, friendId, roomId, setContext } = useContext(RoomContext);
        // setContext({ userId, friendId, roomId: roomRef.key, setContext })
        // setContext({ userId, friendId, roomId: room.id });

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
                                        <SingleChat user={user} key={user.id} onClick={() => (selectFriend(user))} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}