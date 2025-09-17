import { NavLink } from "react-router-dom";
import { AppContext } from "../AppContext";
import React, { useContext, useState } from "react";

export function AppBar({ selected, onProfile }) {
  const { user } = useContext(AppContext);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);

  function handleProfileClick() {
    onProfile?.();
    setIsProfileDropdownVisible(false);
  }

  function theme() {
    const html = document.querySelector("html");
    const currentMode = html.getAttribute("data-mode");
    const newMode = currentMode === "light" ? "dark" : "light";
    html.setAttribute("data-mode", newMode);
  }

  return (
    <>
      <div className="sidebar-menu w-full lg:w-[75px] shadow lg:flex lg:flex-col flex flex-row justify-between items-center fixed lg:relative z-40 bottom-0 bg-white dark:bg-zinc-600 ">
        <div className="hidden lg:my-5 lg:block">
          <NavLink to="/" className="block">
            <span>
              <img src="/assets/images/zamo.png" alt="" className="h-[30px]" />
            </span>
          </NavLink>
        </div>

        {/* <!-- Tabs --> */}
        <div className="w-full mx-auto lg:my-auto">
          <ul
            id="tabs"
            className="flex flex-row justify-center w-full lg:flex-col lg:flex nav-tabs"
          >
            {/*chats*/}
            <li className="flex-grow lg:flex-grow-0">
              <NavLink
                to="/chats"
                className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${
                  selected === "chats" ? "active" : ""
                }`}
              >
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
              <NavLink
                to="/groups"
                className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${
                  selected === "groups" ? "active" : ""
                }`}
              >
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
              <NavLink
                to="/contacts"
                className={`tab-button relative flex items-center justify-center mx-auto h-14 w-14 leading-[14px] group/tab my-2 rounded-lg cursor-pointer ${
                  selected === "contacts" ? "active" : ""
                }`}
              >
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
          <ul className="lg:block" id="toggle-between-dark-light-mode">
            {/*dark mode need to change attribute(a)*/}
            <li
              onClick={theme}
              className="hidden text-center light-dark-mode nav-item lg:block"
            >
              <a href="#" className="hidden dark:block dark:text-violet-100/80">
                <i className="text-2xl ri-sun-line "></i>
              </a>
              <a href="#" className="block text-gray-500 dark:hidden">
                <i className="text-2xl ri-moon-clear-line"></i>
              </a>
            </li>

            {/*profile photo*/}
            <li className="relative lg:mt-4 dropdown lg:dropup">
              <button
                onClick={handleProfileClick}
                className={`${
                  isProfileDropdownVisible ? "group-[.active]:rotate-180" : ""
                } dropdown-toggle" id="dropdownButton2" data-bs-toggle="dropdown`}
              >
                <img
                  src={
                    user?.profilePhotoURL ||
                    "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                  }
                  alt="Avatar"
                  className="w-10 h-10 p-1 mx-auto rounded-full bg-gray-50 dark:bg-zinc-700"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
