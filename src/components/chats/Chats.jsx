import { useContext, useEffect, useState } from "react";
import { get, query, ref, push, update, orderByChild, equalTo } from "firebase/database";
import { useNavigate, useParams, Link } from "react-router-dom";
import { auth } from "../../service/firebase-config";
import { AppContext } from "../../AppContext";
import { ChatButton } from "./ChatButton";
import { getAllUsers, FriendsList } from "../../service/users.service";
import { createRoom, getRoom } from "../../service/message.service";


export function Chats() {
    const { user, userData } = useContext(AppContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedFriend, setSelectedFriend] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    // stolen from Andy's friendsList:
    const [friendsList, setFriendsList] = useState([]);

    const filteredFriends = friendsList.filter(friend => friend);
    useEffect(() => {
        if (user) {
            FriendsList(user.uid, setFriendsList);

        }
        setUsers(filteredFriends);
    }, [user]);
    //-------------------------------------

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
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

    const handleSearchChange = async (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        const users = await getAllUsers();
        const filteredUsers = users.filter((user) =>
            user.username.toLowerCase().includes(value)
        );
        setUsers(filteredUsers);
    };

    const [conversations, setConversations] = useState([]);
    const fetchConversations = async (userId) => {
        try {

            const roomsRef = ref(db, 'rooms');
            const roomsSnapshot = await get(roomsRef);

            const conversations = [];
            roomsSnapshot.forEach((room) => {
                const participants = room.val().participants;
                if (participants && participants[userId]) {
                    const otherParticipants = Object.keys(participants).filter(id => id !== userId);
                    otherParticipants.forEach(async (participantId) => {
                        if (!conversations.find(c => c.uid === participantId)) {
                            const userSnapshot = await get(ref(db, `users/${participantId}`));
                            const userData = userSnapshot.val();
                            const participantName = userData ? userData.username : "Unknown";

                            conversations.push({
                                uid: participantId,
                                roomId: room.key,
                                username: participantName,
                                profilePhotoURL: userData?.profilePhotoURL
                            });
                        }
                    });
                }
            });

            setConversations(conversations);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchConversations(user.uid);
        }
    }, [user]);

    const displayConversations = () => {
        setUsers(conversations);

    }
    const displayFriends = () => {
        setUsers(filteredFriends);
    }
    return (
        <>
            <div>
                <div className="px-6 pt-6">
                    <h4 className="mb-0 text-gray-700 dark:text-gray-50">Chats</h4>

                    <div className="py-1 mt-5 mb-5 rounded group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=violet]:dark:bg-zinc-600">
                        <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=violet]:dark:bg-zinc-600  pe-1 ps-3 " id="basic-addon2">
                            <i className="text-gray-700 ri-search-line search-icon dark:text-gray-200"></i>
                        </span>
                        <input type="text" value={search} onChange={handleSearchChange} className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=violet]:dark:bg-zinc-600  placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 dark:text-gray-400" placeholder="Search users" aria-label="Search users" aria-describedby="basic-addon2" />
                    </div>

                </div>

                <div className="overflow-scroll">

                    <h5 className="px-6 mb-4 text-16 dark:text-gray-50"><Link onClick={displayFriends}>Friends</Link> &nbsp;&nbsp;&nbsp;<Link onClick={displayConversations}> Conversations</Link></h5>

                    <div className="h-[610px] px-2">
                        <ul className="chat-user-list">

                            {users.length > 0 &&
                                users.filter(u => u.id !== user?.uid).map((user) => (
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