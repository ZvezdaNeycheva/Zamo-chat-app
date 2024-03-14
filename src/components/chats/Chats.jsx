import { useContext, useEffect, useState } from "react";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../service/firebase-config";
import { AppContext } from "../../AppContext";
import { ChatButton } from "./ChatButton";
import { getAllUsers } from "../../service/users.service";
import {  FriendsList } from '../../service/users.service';


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [selectedFriend, setSelectedFriend] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const [friends, setFriends] = useState([]);

//     const getAllFriends = async () => {
//         const friendsRef = ref(db, `users/${user?.uid}/friendsList`);
//         const snapshot = await get(friendsRef);
// console.log("Snapshot:", snapshot.val());
//         if (snapshot.exists()) {
//             const friends = Object.keys(snapshot.val()).map((key) => ({
//                 id: key,
//                 ...snapshot.val()[key],
//             }));
//             return friends;
//         }
//         return [];
//     };
//     useEffect(() => {
//         getAllFriends().then((f) => setFriends(f));
//     }, []);

const [friendsList, setFriendsList] = useState([]);

const filteredFriends = friendsList.filter(friend => friend);
useEffect(() => {
    if (user) {
      FriendsList(user.uid, setFriendsList);
    }
  }, [user]);

const fetchFriends = async () => {
    try {
        const friendsRef = ref(db, `users/${user?.uid}/friendsList`);
        const snapshot = await get(friendsRef);
        
        if (snapshot.exists()) {
            const friendIds = Object.values(snapshot.val()); // Extract values (friend IDs) from the object
            console.log("Friend IDs:", friendIds); // Log the friend IDs
            
            const friendPromises = friendIds.map(async (friendId) => {
                console.log("Processing friend ID:", friendId); // Log each friend ID
                const userRef = ref(db, `users/${friendId}`);
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                    return { id: friendId, ...userSnapshot.val() };
                } else {
                    console.error(`User with ID ${friendId} does not exist.`);
                    return null;
                }
            });

            const friendData = await Promise.all(friendPromises);
            console.log("Fetched friends:", friendData); // Log the fetched friend data

            setFriends(friendData.filter(Boolean)); // Filter out null values
        } else {
            console.log("User has no friends.");
            setFriends([]);
        }
    } catch (error) {
        console.error("Error fetching friends:", error);
    }
};




    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // If user is not logged in, redirect to login page or do something else
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const selectFriend = async (friend) => {
        const participants = [user?.uid, friend.uid];
        try {


            const room = await getRoom(participants);

            if (!room) {
                const newRoom = await createRoom(participants);

                if (newRoom.id) {
                    navigate(`/chats/${newRoom.id}`);
                }
            } else if (room.id) {
                navigate(`/chats/${room.id}`);
            }
            setSelectedFriend(friend);
        } catch (error) {
            console.error("Error selecting friend:", error);
        }
    }
    useEffect(() => {
        // console.log("Current Room in useEffect:", id);
        if (!id) setSelectedFriend(undefined);
    }, [id]);

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
                        <input type="text" value={search} onChange={handleSearchChange} className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-gray-400" placeholder="Search users" aria-label="Search users" aria-describedby="basic-addon1" />
                    </div>
                </div>

                <div className="overflow-scroll">

                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50">Recent</h5>

                    <div className="h-[610px] px-2" data-simplebar>
                        <ul className="chat-user-list">
                            {/* users */}
                            {/* {filteredFriends && filteredFriends.length > 0 ? (
  filteredFriends.map((friend, index) */}
                            {filteredFriends.length > 0 &&
                                filteredFriends.filter(u => u.id !== user?.uid).map((user) => (
                                    <li key={user.id}>
                                        <ChatButton selected={selectedFriend === user} user={user} key={user.id} onClick={() => (selectFriend(user))} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}