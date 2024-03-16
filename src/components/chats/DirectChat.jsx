import { useParams } from "react-router-dom";
import { Chat } from "./Chat";

export function DirectChat() {
    let { id: roomId } = useParams();

    return (
        <Chat id={roomId} />
    )
}
