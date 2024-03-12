// import { useDyteClient, DyteProvider } from "@dytesdk/react-web-core";
// import { useEffect } from "react";
// import { MyMeeting } from "./MyMeeting";


// export function DyteMeeting() {
//     const [ client, initClient ] = useDyteClient();

//     useEffect(()=>{
//         initClient({
//             authToken: "???",
//             defaults:{
//                 audio:true,
//                 video:false,
//             },
//         });
//     },[]);

//     return (
//         <DyteProvider value={client}>
//             <MyMeeting/>
//         </DyteProvider>
//     );
//     }