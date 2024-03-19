import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../service/auth.service";
import { AppContext } from "../AppContext";
import React, { useContext, useState } from "react";

export function AppBar({ selected }) {
  const { user, setUser } = useContext(AppContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  function toggleSidebarDropdown() {
    setOpenSidebar((prevOpen) => !prevOpen);
    console.log("openSidebar:" + openSidebar);
  }

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      console.log("User logged out successfully.");
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  function test() {
    const html = document.querySelector('html');
    const currentMode = html.getAttribute('data-mode');
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    html.setAttribute('data-mode', newMode);
  }

  return (
    <>
      <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white dark:bg-zinc-600 ">
        <div className="hidden lg:my-5 lg:block">
          <NavLink to="/" className="block">
            <span>
              <img src="public/assets/images/zamo.png" alt="" className="h-[30px]" />
            </span>
          </NavLink>
        </div>

        {/* <!-- Tabs --> */}
        <div className="w-full mx-auto lg:my-auto">
          <ul id="tabs" className="flex flex-row justify-center w-full lg:flex-col lg:flex nav-tabs" >
            {/*profile*/}
            <li className="flex-grow lg:flex-grow-0">
              <NavLink to="/profile" id="default-tab" className={`tab-button flex relative items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${selected === "profile" ? "active" : ""}`} >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Profile
                  </span>
                </div>
                <i className="text-2xl ri-user-2-line"></i>
              </NavLink>
            </li>

            {/*chats*/}
            <li className="flex-grow lg:flex-grow-0">
              <NavLink to="/chats" className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${selected === "chats" ? "active" : ""}`} >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Chats
                  </span>
                </div>
                <i className="text-2xl ri-message-3-line"></i>
              </NavLink>
            </li>

            {/*groups*/}
            <li className="flex-grow lg:flex-grow-0">
              <NavLink to="/groups" className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${selected === "groups" ? "active" : ""}`} >
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Groups
                  </span>
                </div>
                <i className="text-2xl ri-group-line"></i>
              </NavLink>
            </li>

            {/*contacts*/}
            <li className="flex-grow lg:flex-grow-0">
              <NavLink to="/contacts" className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${selected === "contacts" ? "active" : ""}`}>
                <div className="absolute items-center hidden -top-10 ltr:left-0 group-hover/tab:flex rtl:right-0">
                  <div className="absolute -bottom-1 left-[40%] w-3 h-3 rotate-45 bg-black"></div>
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Contacts
                  </span>
                </div>
                <i className="text-2xl ri-contacts-line"></i>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* <!-- Start side-menu footer --> */}
        <div className="w-20 my-5 lg:w-auto">
          <ul className="lg:block" id='toggle-between-dark-light-mode' >
            {/*dark mode need to change attribute(a)*/}
            <li onClick={test} className="hidden text-center light-dark-mode nav-item lg:block">
              <a href="#" className="hidden dark:block dark:text-violet-100/80">
                <i className="text-2xl ri-sun-line "></i>
              </a>
              <a href="#" className="block text-gray-500 dark:hidden">
                <i className="text-2xl ri-moon-clear-line"></i>
              </a>
            </li>

            {/*profile photo*/}
            <li className="relative lg:mt-4 dropdown lg:dropup">
              <button onClick={toggleSidebarDropdown} className={`${openSidebar ? "group-[.active]:rotate-180" : ""} dropdown-toggle" id="dropdownButton2" data-bs-toggle="dropdown`} >
                <img src={user?.profilePhotoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"} alt="Avatar" className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 dark:bg-zinc-700" />
              </button>

              {/* Dropdown */}
              <div className={`${openSidebar ? "block" : "hidden"}`} aria-labelledby="dropdownButton2" >
                <ul className="absolute bottom-5 z-40 float-left w-40 py-2 mx-4 mb-12 text-left list-none  bg-white border-none rounded-lg shadow-lg bg-clip-padding dark:bg-zinc-700" aria-labelledby="dropdownButton2" >
                  {/* Profile */}
                  <li>
                    <NavLink to="/profile" className="block w-full px-4 py-2 text-sm font-normal  text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30    dark:text-gray-100 dark:hover:bg-zinc-600/50" >
                      Profile
                      <i className="text-gray-500 rtl:float-left ltr:float-right ri-profile-line text-16"></i>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/chats" className="block w-full px-4 py-2 text-sm font-normal  text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30    dark:text-gray-100 dark:hover:bg-zinc-600/50" >
                      Chats
                      <i className="text-gray-500 rtl:float-left ltr:float-right text-16 text-1x1 ri-message-3-line"></i>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/groups" className="block w-full px-4 py-2 text-sm font-normal  text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30    dark:text-gray-100 dark:hover:bg-zinc-600/50" >
                      Groups
                      <i className="text-gray-500 rtl:float-left ltr:float-right ri-group-2-line text-16"></i>
                    </NavLink>
                  </li>


                  <li>
                    <NavLink to="/contacts" className="block w-full px-4 py-2 text-sm font-normal  text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30    dark:text-gray-100 dark:hover:bg-zinc-600/50" >
                      Contacts
                      <i className="text-gray-500 rtl:float-left ltr:float-right ri-contact-3-line text-16"></i>
                      <svg className="text-gray-500 rtl:float-left ltr:float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="16" height="16" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.3 8H16m3.8 3H16m4-6h-9v11h8.3L21 6.2A1 1 0 0 0 20 5ZM6.7 13.2h-.9V8.8h1c.3 0 .6-.1.8-.3.2-.1.3-.4.3-.6L8 6a.9.9 0 0 0-.3-.7A1 1 0 0 0 7 5H5c-.2 0-.5 0-.7.2l-.4.5A15 15 0 0 0 3 11c0 1.8.2 3.5.8 5.2.2.5 1.3.8 1.9.8h1a1 1 0 0 0 .8-.3l.2-.4V16l-.1-2a1 1 0 0 0-.3-.5 1 1 0 0 0-.7-.3ZM10 18v1h10v-1a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2Z" />
                      </svg>
                    </NavLink>
                  </li>

                  {/* Lock Screen */}
                  {/* <li>
                    <NavLink onClick={lopckScreen} to="/lock-screen" className=" block w-full px-4 py-2 text-sm font-normal   text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" >
                      Lock Screen
                      <i className="text-gray-500 rtl:float-left ltr:float-right  ri-git-repository-private-line text-16"></i>
                    </NavLink>
                  </li> */}

                  <li className="my-2 border-b border-gray-100/20"></li>

                  {/* Log out */}
                  <li>
                    <button onClick={logout} className="block w-full px-4 py-2 text-sm font-normal text-gray-700  bg-transparent hover:bg-gray-100/30 dark:text-gray-100 dark:hover:bg-zinc-600/50 ltr:text-left rtl:text-right" >
                      Log out
                      <i className="text-gray-500 rtl:float-left ltr:float-right ri-logout-circle-r-line  text-16"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
