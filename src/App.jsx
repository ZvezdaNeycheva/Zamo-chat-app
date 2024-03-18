import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { auth } from "./service/firebase-config";
import "./App.css";
import { Layout } from "./components/Layout";
import { RecoverPassword } from "./components/auth/RecoverPassword";
import { LockScreen } from "./components/auth/LockScreen";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Meta } from "./components/Meta";
import { Profile } from "./components/auth/Profile";
import { AppBar } from "./components/AppBar";
import { UserProfileDetails } from "./components/chats/UserProfileDetails";
import { AppContext, AppContextProvider } from "./AppContext";
import Authenticated from "./components/auth/Authenticated";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserByUid } from "./service/users.service";
import { Settings } from "./components/Settings";
import { Contacts } from "./components/Contacts";
import { Groups } from "./components/Groups";
import { Chats } from "./components/chats/Chats";
import { Chat } from "./components/chats/Chat";
import { Channels } from "./components/Channels";
import { DirectChat } from "./components/chats/DirectChat";
import { ChannelChat } from "./components/chats/ChannelChat";
import { Video } from "./components/DyteSDK/Video";
import { Audio} from "./components/DyteSDK/Audio";

// import { DyteMeeting } from "./components/DyteMeeting";

// import { DyteProvider } from '@dytesdk/react-web-core';
// import { useDyteClient } from '@dytesdk/react-web-core';
// import { getAuthToken } from "./service/dyte.service";

function App() {
  const [dbUser, loading, error] = useAuthState(auth);
  const { setUser } = useContext(AppContext);
  let { id } = useParams();
  let { idGroup } = useParams();
  let { idCannel } = useParams();

  useEffect(() => {
    if (dbUser) {
      getUserByUid(dbUser.uid)
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [dbUser]);

  // const [meeting, initMeeting] = useDyteClient(); // Initialize useDyteClient

  // useEffect(() => {
  //   getAuthToken() // Call getAuthToken to retrieve the authentication token
  //     .then((authToken) => {
  //       initMeeting({
  //         roomName : 'room-name',
  //         authToken: authToken,
  //         defaults: {
  //           audio: false,
  //           video: false,
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving authentication token:", error);
  //     });
  // }, []);

  return (
    <>
      {/* <RoomContext.Provider value={{ ...roomId,  setRoomId: setRoomId }}> */}
      {/* <DyteProvider value={meeting}> */}
      <Router>
        <Routes>
          <Route path="*" element={<Layout selectedAppBarButton={'chats'} sideBarContent={<Chats />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lock-screen" element={<LockScreen />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/chats/:id" element={<Layout selectedAppBarButton={'chats'} sideBarContent={<Chats />} mainContent={<DirectChat />} />} />
          <Route path="/groups" element={<Layout selectedAppBarButton={'groups'} sideBarContent={<Groups />} />} />
          <Route path="/groups/:groupId" element={<Layout selectedAppBarButton={'groups'} sideBarContent={<Channels />} />} />
          <Route path="/groups/:groupId/channels/:channelId" element={<Layout selectedAppBarButton={'groups'} sideBarContent={<Channels />} mainContent={<ChannelChat />} />} />
          <Route path="/contacts" element={<Layout selectedAppBarButton={'contacts'} sideBarContent={<Contacts />} />} />
          <Route path="/settings" element={<Layout selectedAppBarButton={'settings'} mainContent={<Settings />} />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/profile" element={<Layout selectedAppBarButton={'profile'} mainContent={<Authenticated> <Profile /> </Authenticated>} />} />
          <Route path="/sidebar-menu" element={<AppBar />} />
          
          <Route path="/video" element={<Layout selectedAppBarButton={'video'} sideBarContent={<Chats /> && <Channels />} mainContent={<Video />} />} />
          <Route path="/audio" element={<Layout selectedAppBarButton={'audio'} sideBarContent={<Chats /> && <Channels />} mainContent={<Audio />} />} />
          
          {/* <Route path="/switcher" element={<Switcher />} /> */}
          {/* <Route path="/user-profile-details" element={<Layout UserProfileDetailsContent={'user-profile-details'} sideBarContent={<Chats />} mainContent={<SingleChannel />} />} /> */}
          {/* <Route path="/meet" element={<DyteMeeting/>} /> */}

        </Routes>
      </Router>
      {/* </RoomContext.Provider> */}
      {/* </DyteProvider> */}
    </>
  );
}

export default App;