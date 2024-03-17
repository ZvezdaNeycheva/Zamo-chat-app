import { useEffect, useRef, useState } from "react";
import { DyteProvider } from "@dytesdk/react-web-core";
import { getAuthToken, createDyteCallRoom, addMemberToCall } from "../../service/Dyte/dyte.service";
import { MyMeeting } from "../MyMeeting";

export function DyteMeeting() {
    const [client, initClient] = useDyteClient();
    const meetingEl = useRef();
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        getAuthToken()
            .then((authToken) => {
                setAuthToken(authToken);
            })
            .catch((error) => {
                console.error("Error retrieving authentication token:", error);
            });
    }, []);

    useEffect(() => {
        if (authToken) {
            initClient({
                authToken: authToken,
                defaults: {
                    audio: false,
                    video: false,
                },
            }).then((meeting) => {
                meetingEl.current = meeting;
                createAndJoinMeeting(meeting);
            });
        }
    }, [authToken, initClient]);

    const createAndJoinMeeting = (meeting) => {
        createDyteCallRoom("YOUR_MEETING_ID", "Test Meeting")
            .then((roomId) => {
                addMemberToCall(meeting, roomId, { handle: "participant_handle", photoURL: "participant_photo_url", uid: "participant_uid" });
            })
            .catch((error) => {
                console.error("Error creating meeting room:", error);
            });
    };

    return (
        <DyteProvider value={client}>
            <MyMeeting ref={meetingEl} />
        </DyteProvider>
    );
}
