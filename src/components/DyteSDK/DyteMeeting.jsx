import React, { useEffect, useRef, useState } from "react";
import { DyteProvider } from "@dytesdk/react-web-core";
import { getAuthToken, createDyteCallRoom, addMemberToCall } from "../../service/Dyte/dyte.service";
import { MyMeeting } from "../MyMeeting";
import { createMeeting } from "../../service/Dyte/dyte.meeting.service"; // Import createMeeting function from dyte.meeting.service

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
        createMeeting("participant_handle", ["participant_handle"], "Test Meeting", new Date(), null, "teamId")
            .then((meetingId) => {
                createDyteCallRoom(meetingId, "Test Meeting")
                    .then((roomId) => {
                        addMemberToCall(meeting, roomId, { handle: "participant_handle", photoURL: "participant_photo_url", uid: "participant_uid" });
                    })
                    .catch((error) => {
                        console.error("Error creating meeting room:", error);
                    });
            })
            .catch((error) => {
                console.error("Error creating meeting in Firebase:", error);
            });
    };
    

    return (
        <DyteProvider value={client}>
            <MyMeeting ref={meetingEl} />
        </DyteProvider>
    );
}
