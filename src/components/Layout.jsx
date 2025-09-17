import { Meta } from "./Meta";
import { AppBar } from "./AppBar";
import { ProfileDialog } from "./ProfileDialog";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../service/firebase-config";
import { NavLink } from "react-router-dom";
import bgImage from "/assets/images/bg-image.png";
import GlobalIncomingCallModal from "./Video/GlobalIncomingCallModal";

export function Layout({
  selectedAppBarButton,
  sideBarContent,
  mainContent,
  UserProfileDetailsContent,
}) {
  const [user] = useAuthState(auth);
  const [isProfileDialogVisible, setIsProfileDialogVisible] = useState(false);

  return (
    <>
      {user ? (
        <>
          <Meta title={"Chat App"}></Meta>

          <div className="flex flex-col lg:flex-row min-h-screen max-h-screen overflow-hidden">
            {/* AppBar */}
            <AppBar
              selected={selectedAppBarButton}
              onProfile={() => setIsProfileDialogVisible(true)}
            />

            {/* Left Sidebar */}
            {sideBarContent && (
              <div className="chat-leftsidebar w-full lg:w-[380px] overflow-y-scroll bg-slate-50 dark:bg-zinc-700">
                {sideBarContent}
              </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 min-h-0 overflow-scroll bg-white dark:bg-zinc-800 ${mainContent && !sideBarContent ? "bg-slate-50" : ""
              }`}>
              {mainContent}
            </div>

            {/* Right Sidebar */}
            {UserProfileDetailsContent && (
              <div className="chat-rightsidebar w-full lg:w-[380px] overflow-y-hidden bg-slate-50 dark:bg-zinc-700">
                <div>
                  <div className="tab-content active">
                    {" "}
                    {UserProfileDetailsContent}{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          {isProfileDialogVisible && (
            <ProfileDialog onClose={() => setIsProfileDialogVisible(false)} />
          )}
          <GlobalIncomingCallModal />
        </>
      ) : (
        <div
          className="flex justify-center items-center h-screen"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          role="alert"
        >
          <div className="bg-white/90 p-8 rounded-lg shadow-2xl max-w-2xl mx-auto">
            <div className="text-center">
              <p className="font-bold text-2xl mb-4">Welcome to ZAMO Chat!</p>
              <p className="text-xl mb-6">
                Connect, chat, and expand your network — all in one place!
              </p>
              <div className="flex mt-6 justify-center space-x-4">
                <NavLink
                  to="/login"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full text-lg transition duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create an account
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
