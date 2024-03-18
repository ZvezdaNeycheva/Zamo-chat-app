import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { DYTE_AUTH_KEY } from "../../service/Dyte/dyte.config.service";

export const Video = () => {
    const navigate = useNavigate();
    const [meeting, initMeeting] = useDyteClient();

    useEffect(() => {
        initMeeting({
            authToken: DYTE_AUTH_KEY,
            defaults: {
                audio: false,
                video: false,
            },
        });
    }
        , []);

    return (
        <>
            <DyteProvider value={meeting}>
                    <DyteMeeting meeting={meeting} mode="fill" showSetupScreen={true} />

            </DyteProvider>
        </>
    );
}