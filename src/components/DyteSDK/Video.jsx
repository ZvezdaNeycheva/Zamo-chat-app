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
                <div className="container column-centered">
                    <DyteMeeting meeting={meeting} mode="fill" showSetupScreen={false} />
                    <div> Dyte Video </div>
                </div>

                <div className="control-buttons">
                    <button type="button" onClick={() => navigate("/video")}>Join Meeting</button>
                    <button type="button">Create Meeting</button>
                </div>
            </DyteProvider>
        </>
    );
}