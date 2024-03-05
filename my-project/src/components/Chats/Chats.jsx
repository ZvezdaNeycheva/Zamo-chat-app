import { useContext, useEffect, useState } from "react";
import { AppContext, RoomContext } from "../../appContext/AppContext";
import { db } from "../../config/firebase-config";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useNavigate,useParams } from "react-router-dom";
import { SingleChat } from "./SingleChat";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const navigate = useNavigate();
    let { id } = useParams();
    const [rooms, setRooms] = useState(undefined);

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
    // instead of participants, use friendId and onClick useParams to find the room???

    const selectFriend = async (friend) => {
        console.log({ friend });
        // console.log(`Rendering SingleChat with roomId: ${room?.id}`);
        const participants = [user?.uid, friend.uid];
        console.log({ participants });
        // const newRoom = await createRoom();
        const room = await getRoom(participants);
        console.log({ room });
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
    }

// const getRoom2 = async () => {
//     console.log("hi");
//     try {
//         if (roomId) {
//             // const roomsRef = ref(db, `rooms/${room?.id}`);
//             navigate(`/rooms/${roomId}`)
//             return;
//         }else{
//             console.log("hi2");
//             // await createRoom(participants)
//             navigate(`/rooms/${roomId}`)
//         }
//     } catch (error) {
//         console.log('Error fetching room:', error);
//     }
// }
        

    const getRoom = async (participants) => {
        try {
            const participantIds = participants.participants;
            console.log({ participantIds });

            const roomsRef = ref(db, `rooms/${room?.id}`);
            const roomsUser = ref(db, `users/${user.uid}/rooms`);

            // const snapshot = await get(query(roomsRef, orderByChild("id").equalTo(roomsUser)));
             const snapshotAll = await get(roomsRef)
             const snapshotUser = await get(roomsUser)


            console.log('SnapshotAll:', snapshotAll.val());
            console.log('Snapshot:', snapshotUser.val());

            
            const filteredRooms = Object.keys(snapshotAll.val()).filter((key) => {
                if (key === snapshotUser.val()) {
                    return key;
                }
            })
            console.log('FilteredRooms:', filteredRooms);
            const filteredByParticipants = filteredRooms.filter((key) => { 
                if (key.participants === participantIds & key.length === 2) {
                    return key;
                }
            })
            console.log('FilteredByParticipants:', filteredByParticipants);

            if (filteredByParticipants.length === 0) {
                console.log('Room does not exist');
                return null;
            }

            // if participantIds are the same as the participants in the room return the room
            // const room = Object.keys(filteredByParticipants.val()).map((key) => ({
            //     id: key,
            //     ...filteredByParticipants.val()[key],
            // }))[0];
            // console.log('Room:', room);
            // roomId = room.id;

            return filteredByParticipants;
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

                <div>
                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            {users.length > 0 &&
                                users.map((user) => (
                                    <li className="px-5 py-[15px] group-data-[theme-color=violet]:hover:bg-slate-100 group-data-[theme-color=green]:hover:bg-green-50/50 group-data-[theme-color=red]:hover:bg-red-50/50 transition-all ease-in-out border-b border-white/20 dark:border-zinc-700 group-data-[theme-color=violet]:dark:hover:bg-zinc-600 group-data-[theme-color=green]:dark:hover:bg-zinc-600 group-data-[theme-color=red]:dark:hover:bg-zinc-600 dark:hover:border-zinc-700">
                                        
                                        <SingleChat user={user} roomId={room?.id} key={user.id} onClick={() => (selectFriend(user))} />
                                        {/* onClick={() => { navigate(`/rooms/${roomId}`) }} */}
                                        {/* <SingleChat user={user} roomId={room?.id} key={user.id} onClick={getRoom2} /> */}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}