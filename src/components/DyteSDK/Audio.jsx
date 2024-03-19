import React, { useEffect } from "react";
import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { DYTE_AUTH_KEY } from "../../service/Dyte/dyte.config.service";

export const Audio = () => {
    const [meeting, initMeeting] = useDyteClient();

    useEffect(() => {
        initMeeting({
            authToken: DYTE_AUTH_KEY,
            defaults: {
                audio: false,
                video: false,
            },
        });
    }, []);

    return (
        <>
            <DyteProvider value={meeting}>
                <DyteMeeting meeting={meeting} mode="fill" showSetupScreen={true} />
            </DyteProvider>
        </>
    );
}