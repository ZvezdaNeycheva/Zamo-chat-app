// import { DyteProvider } from "@dytesdk/react-web-core";
// import { useEffect, useRef, useState } from "react";
// import { MyMeeting } from "../MyMeeting";
// import { useDyteClient } from "@dytesdk/react-web-core";

// export function DyteMeeting() {
//     const [client, initClient] = useDyteClient();
//     const meetingEl = useRef();
//     const [authToken, setAuthToken] = useState(null);

//     useEffect(() => {
//         // Retrieve the authentication token
//         getAuthToken()
//             .then((authToken) => {
//                 // Set the authentication token in the state
//                 setAuthToken(authToken);
//             })
//             .catch((error) => {
//                 console.error("Error retrieving authentication token:", error);
//             });
//     }, []);

//     useEffect(() => {
//         if (authToken) {
//             // Initialize the Dyte client with the retrieved token
//             initClient({
//                 authToken: authToken,
//                 defaults: {
//                     audio: false,
//                     video: false,
//                 },
//             }).then((meeting) => {
//                 // Store the meeting reference
//                 meetingEl.current = meeting;
//             });
//         }
//     }, [authToken, initClient]);

//     return (
//         <DyteProvider value={client}>
//             <MyMeeting ref={meetingEl} />
//         </DyteProvider>
//     );
// } 
