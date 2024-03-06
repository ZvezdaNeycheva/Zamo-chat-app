import { Chats } from "../components/Chats/Chats";
import { Contacts } from "../components/Contacts/Contacts";
import { Groups } from "../components/Groups/Groups";
import { Profile } from "../components/Profile/Profile";
import { Settings } from "../components/Settings/Settings";
import { SidebarMenu } from "../components/Sidebar-menu/SidebarMenu";
import { UserProfileDetails } from "../components/UserProfileDetails/UserProfileDetails";
import { db } from "../config/firebase-config";
import { get, query, ref, update, set, onChildAdded, push } from "firebase/database";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../appContext/AppContext";
import { useRecoilValue } from "recoil";
import { currentRoomId } from "../atom/atom";

export function Index() {
  const currentRoom = useRecoilValue(currentRoomId);
  const { user, userData, updateUserData } = useContext(AppContext);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentRoom) {
      const roomRef = ref(db, `rooms/${currentRoom}/messages`);
      const queryRef = query(roomRef);
      const unsubscribe = onChildAdded(queryRef, (snapshot) => {
        setMessages((prevMessages) => [...prevMessages, snapshot.val()]);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [currentRoom]);

  const handleInputMessage = (e) => {
    e.preventDefault();
    const message = e.target.value;
    setNewMessage(message);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      senderId: userData.uid,
      content: newMessage,
      timestamp: db.ServerValue.TIMESTAMP,
    };

    await push(ref(db, `rooms/${currentRoom}/messages`), message);
    setNewMessage("");
  };

  return (
    <>
      <div className="lg:flex">
        {/* <!-- Start left sidebar-menu --> */}
        <SidebarMenu
          selected={selectedTab}
          onProfileClick={() => setSelectedTab("profile")}
          onChatsClick={() => setSelectedTab("chats")}
          onGroupsClick={() => setSelectedTab("groups")}
          onContactsClick={() => setSelectedTab("contacts")}
          onSettingsClick={() => setSelectedTab("settings")}
        />
        {/* <!-- end left sidebar-menu --> */}

        {/* <!-- start chat-leftsidebar --> */}
        <div className="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
          <div>
            {/* <!-- Start Profile tab-pane --> */}
            {selectedTab === "chats" ? (
              <div className="tab-content active">
                {" "}
                <Chats />{" "}
              </div>
            ) : selectedTab === "profile" ? (
              <div className="tab-content active">
                {" "}
                <Profile />{" "}
              </div>
            ) : selectedTab === "groups" ? (
              <div className="tab-content active">
                {" "}
                <Groups />{" "}
              </div>
            ) : selectedTab === "contacts" ? (
              <div className="tab-content active">
                {" "}
                <Contacts />{" "}
              </div>
            ) : selectedTab === "settings" ? (
              <div className="tab-content active">
                {" "}
                <Settings />{" "}
              </div>
            ) : (
              <span>No tab selected</span>
            )}
          </div>
        </div>
        {/* <!-- end chat-leftsidebar --> */}

        {/* <!-- Start User chat --> */}
        <div className="w-full overflow-hidden transition-all duration-150 bg-white user-chat dark:bg-zinc-800">
          <div className="lg:flex">
            {/* <!-- start chat conversation section --> */}

            <div className="relative w-full overflow-hidden ">
              <div className="p-4 border-b border-gray-100 lg:p-6 dark:border-zinc-600">
                <div className="grid items-center grid-cols-12">
                  <div className="col-span-8 sm:col-span-4">
                    <div className="flex items-center">
                      <div className="block ltr:mr-2 rtl:ml-2 lg:hidden">
                        <a
                          href="#"
                          onClick={() => {}}
                          className="p-2 text-gray-500 user-chat-remove text-16"
                        >
                          <i className="ri-arrow-left-s-line"></i>
                        </a>
                      </div>
                      <div className="rtl:ml-3 ltr:mr-3">
                        <img
                          src="assets/images/users/avatar-4.jpg"
                          className="rounded-full h-9 w-9"
                          alt=""
                        />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <h5 className="mb-0 truncate text-16 ltr:block rtl:hidden">
                          <a
                            href="#"
                            className="text-gray-800 dark:text-gray-50"
                          >
                            Doris Brown
                          </a>{" "}
                          <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i>
                        </h5>
                        <h5 className="mb-0 truncate text-16 rtl:block ltr:hidden">
                          <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 "></i>{" "}
                          <a
                            href="#"
                            className="text-gray-800 dark:text-gray-50"
                          >
                            Doris Brown
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 sm:col-span-8"></div>
                </div>
              </div>
              {/* <!-- end chat user head --> */}

              {/* <!-- start chat conversation --> */}
              <div className="h-[80vh] p-4 lg:p-6" data-simplebar>
                {/* {fetching Messages} */}
                <ul className="mb-0">
                  {messages.length > 0 &&
                    messages.map((message) => (
                      <li key={message.messageId} className="clear-both py-4">
                        <div className="flex items-end gap-3">
                          <div>
                            <img
                              src="assets/images/users/avatar-4.jpg"
                              alt=""
                              className="rounded-full h-9 w-9"
                            />
                          </div>
                          <div>
                            <div className="relative px-5 py-3 text-white rounded-lg ltr:rounded-bl-none rtl:rounded-br-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500">
                              <p className="mb-0">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              {/* <!-- start chat input section --> */}
              <div className="z-40 w-full p-6 mb-0 bg-white border-t lg:mb-1 border-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleInputMessage}
                      className="w-full border-transparent rounded bg-gray-50 placeholder:text-14 text-14 dark:bg-zinc-700 dark:placeholder:text-gray-300 dark:text-gray-300"
                      placeholder="Enter Message..."
                    />
                  </div>
                  <div>
                    <div>
                      <ul className="mb-0">
                        {/* Send Message */}
                        {/* handleSendMessage    sendMessage(messages) */}
                        <li className="inline-block">
                          <button
                            onClick={() => {
                              sendMessage();
                            }}
                            type="submit"
                            className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:hover:bg-green-600"
                          >
                            <i className="ri-send-plane-2-fill"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <UserProfileDetails />
          </div>
        </div>
      </div>
    </>
  );
}
