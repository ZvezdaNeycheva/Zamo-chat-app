import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { auth } from "./config/firebase-config";
import "./App.css";
import { Index } from "./authViews/Index";
import { RecoverPassword } from "./authViews/RecoverPassword";
import { LockScreen } from "./authViews/LockScreen";
import { Login } from "./authViews/Login";
import { Register } from "./authViews/Register";
import { Chats } from "./components/Chats/Chats";
import { Contacts } from "./components/Contacts/Contacts";
import { Groups } from "./components/Groups/Groups";
import { Meta } from "./components/Meta/Meta";
import { Profile } from "./components/Profile/Profile";
import { Settings } from "./components/Settings/Settings";
import { SidebarMenu } from "./components/Sidebar-menu/SidebarMenu";
import { UserProfileDetails } from "./components/UserProfileDetails/UserProfileDetails";
import { Switcher } from "./components/Switcher/Switcher"
import { AppContext } from "./appContext/AppContext";
import Authenticated from "./authenticated/Authenticated";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./service/users.service";


function App() {
  const [context, setContext] = useState({
    user: null,
    userData: null,
  });
  const [user, loading, error] = useAuthState(auth);

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
      <Router>
        <Routes>
        <Route path="*" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lock-screen" element={<Authenticated> <LockScreen /> </Authenticated>} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/meta" element={<Meta />} />
          <Route path="/profile" element={<Authenticated> <Profile /> </Authenticated>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sidebar-menu" element={<SidebarMenu />} />
          {/* <Route path="/switcher" element={<Switcher />} /> */}
          <Route path="/user-profile-details" element={<UserProfileDetails/> }/>
        </Routes>
        <div className="App">{/* <Index /> */}</div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
