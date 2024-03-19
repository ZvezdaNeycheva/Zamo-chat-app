import React, { useEffect, useRef } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import { createDyteCallRoom, addMemberToCall } from "../../service/Dyte/dyte.service";
import { MyMeeting } from "../MyMeeting";
import { createMeeting } from "../../service/Dyte/dyte.meeting.service";
import { DYTE_AUTH_KEY } from "../../service/Dyte/dyte.config.service";

export function DyteMeeting() {
    const [client, initClient] = useDyteClient();
    const meetingEl = useRef();

    useEffect(() => {
        initClient({
            authToken: DYTE_AUTH_KEY,
            defaults: {
                audio: false,
                video: false,
            },
        }).then((meeting) => {
            meetingEl.current = meeting;
            createAndJoinMeeting(meeting);
        }).catch((error) => {
            console.error("Error initializing Dyte client:", error);
        });
    }, [initClient]);

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
