import { useParams } from "react-router-dom";
import { Chat } from "./Chat";
import { getChannel } from "../../service/channel.service";
import { useEffect, useState } from "react";

export function ChannelChat() {
    let { channelId } = useParams();
    const [roomId, setRoomId] = useState();

    useEffect(() => {
       updateRoomId().catch(console.error);
    }, []);

    const updateRoomId = async () => {
        const channel = await getChannel(channelId);
        setRoomId(channel.room);
    }

    return (
        roomId ? <Chat id={roomId} /> : null
    )
}