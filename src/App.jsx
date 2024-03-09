import React, { useState, useEffect} from "react";
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
import { AppContext } from "./AppContext";
import Authenticated from "./components/auth/Authenticated";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./service/users.service";
import { RecoilRoot } from 'recoil';
import { Settings } from "./components/Settings";
import { Contacts } from "./components/Contacts";
import { Groups } from "./components/Groups";
import { Chats } from "./components/chats/Chats";
import { Chat } from "./components/chats/Chat";


function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });
  const [user, loading, error] = useAuthState(auth);
  let { id } = useParams();

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setContext({
              user,
              userData: snapshot.val()[Object.keys(snapshot.val())[0]],
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ ...context, setContext }}>
      {/* <RoomContext.Provider value={{ ...roomId,  setRoomId: setRoomId }}> */}
      <RecoilRoot>
      <Router>
        <Routes>
          <Route path="*" element={<Layout selectedAppBarButton={'chats'} sideBarContent={<Chats />} />} />
                {/* <Route path="/layout/*" element={<Layout />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lock-screen" element={<Authenticated> <LockScreen /> </Authenticated>} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/chats" element={<Layout selectedAppBarButton={'chats'} sideBarContent={<Chats />} />} />
          <Route path="/chats/:id" element={<Layout selectedAppBarButton={'chats'} sideBarContent={<Chats />} mainContent={<Chat />}/>} />
          <Route path="/groups" element={<Layout selectedAppBarButton={'groups'} sideBarContent={<Groups />} />} />
          <Route path="/contacts" element={<Layout selectedAppBarButton={'contacts'} sideBarContent={<Contacts />} />} />
          <Route path="/settings" element={<Layout selectedAppBarButton={'settings'} mainContent={<Settings />} />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/profile" element={<Layout selectedAppBarButton={'profile'} mainContent={<Authenticated> <Profile /> </Authenticated>} /> } />
          <Route path="/sidebar-menu" element={<AppBar />} />
          {/* <Route path="/switcher" element={<Switcher />} /> */}
          <Route path="/user-profile-details" element={<UserProfileDetails/> }/>

          {/* The routing can be adapted for the master-slave view in a similar way: */}
          {/* <Route path="/profile" element={<Index selectedTab="profile" />} /> */}
          {/* <Route path="/groups" element={<Groups />} /> */}
          {/* <Route path="/contacts" element={<Contacts />} /> */}
          {/* <Route path="/settings" element={<Settings />} /> */}

           {/* <Route path="/profile" element={<ProfileView />} /> */}
          {/* <Route path="/groups" element={<GroupsView />} /> */}
          {/* <Route path="/contacts" element={<ContactsView />} /> */}
          {/* <Route path="/settings" element={<SettingsView />} /> */}
        </Routes>
        <div className="App">{/* <Index /> */}</div>
      </Router>
      </RecoilRoot>
      {/* </RoomContext.Provider> */}
    </AppContext.Provider>
  );
}

export default App;
