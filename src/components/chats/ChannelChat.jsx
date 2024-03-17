import { useParams } from "react-router-dom";
import { Chat } from "./Chat";
import { getChannel } from "../../service/groupAndChannel.service";
import { useEffect, useState } from "react";
import { ChatToolbar } from "./ChatToolbar";

export function ChannelChat() {
    const { channelId } = useParams();
    const [channel, setChannel] = useState();

    useEffect(() => {
       updateChannel().catch(console.error);
    }, [channelId]);

    const updateChannel = async () => {
        const channel = await getChannel(channelId);
        setChannel(channel);
    }

    return (
        channel?.room ? (
            <Chat id={channel.room} toolbar={<ChatToolbar channel={channel} />} />
        ) : null
    )
}