import React, { useContext, useEffect, useState, useRef } from "react";
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

  function toggleDropdown(event) {
    event.preventDefault();
    setOpen(!open);
    console.log(open);
  }

  function handleChange(e) {
    if(e.target.files[0]){
      setPhoto(e.target.files[0]);
    }
  }
  function handleClick() {
    uploadProfileImage(photo, user, setLoading);
  }

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    //   return;
    // }
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
          <div className="ltr:float-right rtl:float-left" >
          <div className={`relative flex-shrink-0 dropdown `}>
              <button onClick={toggleDropdown} className="p-0 bottom-10 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" data-bs-toggle="dropdown" id="dropdownMenuButtonA">
                <i className="text-lg ri-more-2-fill" />
                Drop
              </button>
              <ul className={`${open ? "visible" : "invisible"} absolute z-50 block w-40 py-2 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:right-auto rtl:left-0 ltr:left-auto ltr:right-0 my-7 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:shadow-sm dark:border-zinc-600`}
                aria-labelledby="dropdownMenuButtonA">

                {/* Action */} 
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                    href="#"> Action
                  </a>
                </li>

                {/* Another action */} 
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                    href="#"> Another action
                  </a>
                </li>

                <li className="my-2 border-b border-gray-100/20 dark:border-zinc-600" />

                {/* Delete */} 
                <li>
                  <a className="block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-100 dark:hover:bg-zinc-600 ltr:text-left rtl:text-right"
                    href="#"> Delete
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
            <input type="file" onChange={handleChange} id="file"/>
            <button disabled={loading || !photo} onClick={handleClick}> Upload</button>
            <img
              src={photoURL}
              className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800"
              alt="Avatar"
            />
          </div>
          {/* End profile picture */}

          {/* Profile Status */}
          <h5 className="mb-1 text-16 dark:text-gray-50">{/* need to add a username here*/}</h5>
          <h5 className="mb-0 truncate text-14 ltr:block rtl:hidden">
            <a href="#" className="text-gray-500 dark:text-gray-50">
              <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 " />{" "}
              Active
            </a>
          </h5>
          <h5 className="mb-0 truncate text-14 ltr:hidden rtl:block">
            <a href="#" className="text-gray-500 dark:text-gray-50">
              Active{" "}
              <i className="text-green-500 ltr:ml-1 rtl:mr-1 ri-record-circle-fill text-10 " />
            </a>
          </h5>
        </div>
        {/* End Profile Status */}

        {/* Start user-profile-desc */}
        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500 dark:text-gray-300">
              If several languages coalesce, the grammar of the resulting language
              is more simple and regular than that of the individual.
            </p>
          </div>

          <div data-tw-accordion="collapse">

            {/* About Drop Down menu*/}
            <div className="text-gray-700 accordion-item">
              <h2>
                <button type="button" className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600">
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-user-2-line d-inline-block" />{" "}
                    About
                  </span>
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                    About{" "}
                    <i className="ml-2 align-middle ri-user-2-line d-inline-block" />
                  </span>
                  <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50" />
                </button>
              </h2>
              <div className="block bg-white border border-t-0 border-gray-100 accordion-body dark:bg-transparent dark:border-zinc-600">
                <div className="p-5">
                  <div>
                  <p className="mb-1 text-gray-500 dark:text-gray-300">Name</p>
                    {user ? (
                      <h5 className="text-sm dark:text-gray-50">{user.username}</h5>
                    ) : (
                      <h5 className="text-sm dark:text-gray-50">Guest</h5>
                    )}
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Email</p>
                    <h5 className="text-sm dark:text-gray-50">{/* need to add a Email here*/}</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Time</p>
                    <h5 className="text-sm dark:text-gray-50">{/* need to add a create time here*/}</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">
                      Location
                    </p>
                    <h5 className="text-sm dark:text-gray-50">{/* need to add a location here*/}</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* End About Drop Down menu*/}

            {/* Attached Files Drop Down menu*/}
            <div className="mt-2 text-gray-700 accordion-item">
              <h2>
                <button type="button"
                  className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded accordion-header group dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600"
                >
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:block rtl:hidden">
                    <i className="mr-2 align-middle ri-attachment-line d-inline-block" />{" "}
                    Attached Files
                  </span>
                  <span className="m-0 text-[14px] dark:text-gray-50 font-semibold ltr:hidden rtl:block">
                    Attached Files{" "}
                    <i className="ml-2 align-middle ri-attachment-line d-inline-block" />
                  </span>
                  <i className="mdi mdi-chevron-down text-lg group-[.active]:rotate-180 dark:text-gray-50" />
                </button>
              </h2>
            {/*End Attached Files Drop Down menu*/}
              
            {/* Attached Files */}
           
            {/* Attached Files */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}