import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../appContext/AppContext";
import { uploadProfileImage } from "../../service/auth.service";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg");
  const [open, setOpen] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openAboutDropdown, setOpenAboutDropdown] = useState(false);
  const [openFilesDropdown, setOpenFilesDropdown] = useState(false);

  function toggleDropdown() {
    setOpen((prevOpen) => !prevOpen);
  }

  function toggleStatusDropdown() {
    setOpenStatusDropdown((prevOpen) => !prevOpen);
  }

  function toggleAboutDropdown() {
    setOpenAboutDropdown((prevOpen) => !prevOpen);
  }

  function toggleFileDropdown() {
    setOpenFilesDropdown((prevOpen) => !prevOpen);
  }

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    uploadProfileImage(photo, user, setLoading);
  }

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user?.photoURL);
    }
  }, [user, photo]);

  return (
    <>
      {/* Start profile Header */}
      <div>
        <div className="px-6 pt-6">
          {/* Drop Down */}
          <div className="ltr:float-right rtl:float-left">
            <div className={`relative flex-shrink-0 dropdown `}>
              <button onClick={toggleDropdown} className="p-0 bottom-10 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" data-bs-toggle="dropdown" id="dropdownMenuButtonA">
                <i className="text-lg ri-more-2-fill" />
                Drop
              </button>
              <ul className={`${open ? "visible" : "invisible"} absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:right-auto rtl:left-0 ltr:left-auto ltr:right-0 my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600`} aria-labelledby="dropdownMenuButtonA">
                {/* Action */}
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">
                    Action
                  </a>
                </li>
                {/* Another action */}
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#" >
                    Another action
                  </a>
                </li>
                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600" />
                {/* Delete */}
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* End Drop Down */}
          <h4 className="mb-0 text-gray-700 dark:text-gray-50"> My Profile </h4>
        </div>
        {/* End profile Header */}
        {/* Start user-profile-card */}
        <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
          {/* Profile picture */}
          <div className="mb-4">
            <input type="file" onChange={handleChange} id="file" />
            <button disabled={loading || !photo} onClick={handleClick}  >
              Upload
            </button>
            <img src={ photo ? URL.createObjectURL(photo) : photoURL || "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"}  className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800" alt="Avatar"/>
          </div>
          {/* End profile picture */}
          {/* Profile Status */}
          <div className="relative mb-1 dropdown">
            <button onClick={toggleStatusDropdown} role="button" className="pb-1 text-gray-500 dropdown-toggle d-block dark:text-gray-300" data-bs-toggle="dropdown" id="dropdownMenuButtonX">
              Available <i className="mdi mdi-chevron-down" />
            </button>
            {/* Dropdown menu for status*/}
            <ul className={`absolute z-50 ${openStatusDropdown ? 'visible' : 'invisible'} py-2 mt-2 text-left list-none bg-white border rounded shadow-lg left-20 dropdown-menu w-36 top-6 dark:bg-zinc-700 bg-clip-padding border-gray-50 dark:border-zinc-500`} aria-labelledby="dropdownMenuButtonX">
              <li>
                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right">
                  Available
                </a>
              </li>
              <li>
                <a href="#" className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600/80 ltr:text-left rtl:text-right">
                  Busy
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* End Profile Status */}
        {/* Start user-profile-desc */}
        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500 dark:text-gray-300">
              If several languages coalesce, the grammar of the resulting language is more simple and regular than that
              of the individual.
            </p>
          </div>
          <div data-tw-accordion="collapse">
            {/* About Drop Down menu*/}
            <div className="text-gray-700 accordion-item">
              <h2>
                <button  onClick={toggleAboutDropdown} type="button" className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600">
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-user-2-line d-inline-block" /> About
                  </span>
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                    About 
                    <i className="ml-2 align-middle ri-user-2-line d-inline-block" />
                  </span>
                  <i className={`mdi mdi-chevron-down text-lg ${openAboutDropdown ? "group-[.active]:rotate-180" : ""} dark:text-gray-50`} />
                </button>
              </h2>
              <div className={`block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600 
              ${openAboutDropdown ? "" : "hidden"}`} >
                <div className="p-5">
                  {/* Name */}
                  <div>
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Name</p>
                    <h5 className="text-sm dark:text-gray-50">{userData ? userData.username : "N/A"}</h5>
                  </div>
                  {/* Email */}
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Email</p>
                    <h5 className="text-sm dark:text-gray-50">{userData ? userData.email : "N/A"}</h5>
                  </div>
                  {/* Account Create */}
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Account Create</p>
                    <h5 className="text-sm dark:text-gray-50">
                      {userData ? userData.createdOnReadable : "N/A"}
                    </h5>
                  </div>
                  {/* Location */}
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300"> Location </p>
                    <h5 className="text-sm dark:text-gray-50">{/* need to add a location here*/}</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* End About Drop Down menu*/}
            {/* Attached Files Drop Down menu*/}
            <div className="mt-2 text-gray-700 accordion-item">
              <h2>
                <button onClick={toggleFileDropdown} type="button" className={`flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600 
                  ${openFilesDropdown ? "group-[.active]:rotate-180" : ""}`} >
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-attachment-line d-inline-block" /> Attached Files
                  </span>
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                    Attached Files <i className="ml-2 align-middle ri-attachment-line d-inline-block" />
                  </span>
                  <i className={`mdi mdi-chevron-down text-lg dark:text-gray-50 ${openFilesDropdown ? "group-[.active]:rotate-180" : ""}`} />
                </button>
              </h2>
              {/* Attached Files */}
              <div className={`hidden bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600 
                ${openFilesDropdown ? "" : "hidden"}`}>
                <div className="p-5">
                  <div className="p-2 mb-2 border rounded border-gray-100/80 dark:bg-zinc-800 dark:border-transparent">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded ltr:mr-3 group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=red]:bg-red-500/20 rtl:ml-3">
                        <div className="text-xl rounded-lg group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500 avatar-title ">
                          <i className="ri-file-text-fill" />
                        </div>
                      </div>
                      {/* File Name */}
                      <div className="flex-grow">
                        <div className="text-start">
                          <h5 className="mb-1 text-sm dark:text-gray-50">Admin-A.zip</h5>
                          <p className="mb-0 text-gray-500 text-13 dark:text-gray-300">12.5 MB</p>
                        </div>
                      </div>
                      {/* Drop Down */}
                      <div className="ltr:ml-4 rtl:mr-4">
                        <ul className="flex items-center gap-3 mb-0 text-lg">
                          <li>
                            <a href="#" className="px-1 text-gray-500 dark:text-gray-300">
                              <i className="ri-download-2-line" />
                            </a>
                          </li>
                          <li className="relative flex-shrink-0 dropstart">
                            <a href="#!" className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" data-bs-toggle="dropdown" id="dropdownMenuButton23">
                              <i className="text-lg ri-more-fill" />
                            </a>
                            <ul className="absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:right-0 ltr:left-auto my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600" aria-labelledby="dropdownMenuButton23">
                              <li>
                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#" >
                                  Action
                                </a>
                              </li>
                              <li>
                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">
                                  Another action
                                </a>
                              </li>
                              <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600" />
                              <li>
                                <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right" href="#">
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Attached Files */}
              {/*End Attached Files Drop Down menu*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}