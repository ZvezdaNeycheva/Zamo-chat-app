import { useParams } from "react-router-dom";
import { Chat } from "./Chat";
import { useContext, useEffect, useState } from "react";
import { getRoomById } from "../../service/message.service";
import { AppContext } from "../../AppContext";
import { getUserByUid } from "../../service/users.service";
import { ChatToolbar } from "./ChatToolbar";

export function DirectChat() {
    let { id: roomId } = useParams();
    const {user} = useContext(AppContext);
    const [otherUser, setOtherUser] = useState();

    const updateOtherUser = async () => {
        if (!user) return;
        const room = await getRoomById(roomId);
        const participantIds = Object.keys(room.participants ?? {});
        const otherUserId = participantIds.find(id => id !== user.uid);
        if (!otherUserId) throw new Error('Other participant not found');
        setOtherUser(await getUserByUid(otherUserId));
    }

    useEffect(() => {
        updateOtherUser().catch(console.error);
    }, [user, roomId]);

    return (
        roomId && otherUser ? (
            <Chat id={roomId} toolbar={<ChatToolbar otherUser={otherUser} />} />
        ) : null
    )
}
