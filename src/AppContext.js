import { createContext } from "react";

export const AppContext = createContext({
  user: null,
  userData: null,
  setContext: () => { },
  userIsLoggedIn: false,
  setLoggedIn: () => { },
});


export const RoomContext = createContext({
  userId: null,
  friendId: null,
  roomId: null,
  setContext: () => { },
});
