export function UserProfileDetails() {
  return (
    <>
      {/* Start profile content */}
      <div style={{ display: "none" }} className="user-profile-sidebar h-[100vh] bg-white shadow overflow-y-hidden mb-[85px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-800 border-l-4 border-gray-50 dark:border-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700 absolute xl:relative top-0 bottom-0" >
        <div className="px-6 pt-6">
          <div className="text-end">
            <button type="button" id="user-profile-hide" className="text-2xl text-gray-500 border-0 btn dark:text-gray-200" >
              <i className="ri-close-line" />
            </button>
          </div>
        </div>
        <div className="p-6 text-center border-b border-gray-100 dark:border-zinc-600">
          <div className="mb-4">
            <img src="/assets/images/users/avatar-1.jpg" alt="" className="w-24 h-24 p-1 mx-auto border border-gray-100 rounded-full dark:border-zinc-800" />
          </div>
          <h5 className="mb-1 text-16 dark:text-gray-50">Doris Brown</h5>
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
        {/* End profile user */}
        {/* Start user-profile-desc */}
        <div className="p-6 h-[550px]" data-simplebar="">
          <div>
            <p className="mb-6 text-gray-500 dark:text-gray-300">
              If several languages coalesce, the grammar of the resulting language
              is more simple and regular than that of the individual.
            </p>
          </div>
          <div data-tw-accordion="collapse">
            <div className="text-gray-700 accordion-item">
              <h2>
                <button type="button" className="flex items-center justify-between w-full px-3 py-2 font-medium text-left border border-gray-100 rounded-t accordion-header group active dark:border-b-zinc-600 dark:bg-zinc-600 dark:border-zinc-600" >
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
                    <h5 className="text-sm dark:text-gray-50">Doris Brown</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Email</p>
                    <h5 className="text-sm dark:text-gray-50">adc@123.com</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">Time</p>
                    <h5 className="text-sm dark:text-gray-50">11:40 AM</h5>
                  </div>
                  <div className="mt-5">
                    <p className="mb-1 text-gray-500 dark:text-gray-300">
                      Location
                    </p>
                    <h5 className="text-sm dark:text-gray-50">California, USA</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}