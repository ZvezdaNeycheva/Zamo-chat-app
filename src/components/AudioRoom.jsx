// import { useDyteMeeting, useDyteSelector } from '@dytesdk/react-web-core';
// import { useEffect } from 'react';
// // import Room from './Room';

// // useDyteClient()
// // useDyteMeeting()
// // useDyteSelector()

// export function AudioRoom() {
//   const { meeting } = useDyteMeeting();
//   const roomJoined = useDyteSelector((meeting) => meeting.self.roomJoined);

//   useEffect(() => {
//     meeting.self.on('roomLeft', () => {
//       // handle navigation to other screen here after the user has left the room.
//       alert("You've left the room");
//     });
//   }, [meeting]);

//   const messages = useDyteSelector((meeting) => meeting.chat.messages);
//   const activeParticipants = useDyteSelector(
//     (meeting) => meeting.participants.active
//   );

//   return <Room />;
// }