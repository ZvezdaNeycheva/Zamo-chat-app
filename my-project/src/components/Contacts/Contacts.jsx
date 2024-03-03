import React from 'react';

export function Contacts() {

  // function PopulateUserList() {
  //   document.getElementById('lstUsers').innerHTML = `<div class="text-center">
  //                                                        <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
  //                                                    </div>`;
  //   var db = firebase.database().ref('users');
  //   var dbNoti = firebase.database().ref('notifications');
  //   var lst = '';
  //   db.on('value', function (users) {
  //       if (users.hasChildren()) {
  //           lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
  //                           <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
  //                       </li>`;
  //           document.getElementById('lstUsers').innerHTML = lst;
  //       }
  //       users.forEach(function (data) {
  //           var user = data.val();
  //           if (user.email !== firebase.auth().currentUser.email) {
  //               dbNoti.orderByChild('sendTo').equalTo(data.key).on('value', function (noti) {
  //                   if (noti.numChildren() > 0 && Object.values(noti.val())[0].sendFrom === currentUserKey) {
  //                       lst = `<li class="list-group-item list-group-item-action">
  //                           <div class="row">
  //                               <div class="col-md-2">
  //                                   <img src="${user.photoURL}" class="rounded-circle friend-pic" />
  //                               </div>
  //                               <div class="col-md-10" style="cursor:pointer;">
  //                                   <div class="name">${user.name}
  //                                       <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Sent</button>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </li>`;
  //                       document.getElementById('lstUsers').innerHTML += lst;
  //                   }
  //                   else {
  //                       dbNoti.orderByChild('sendFrom').equalTo(data.key).on('value', function (noti) {
  //                           if (noti.numChildren() > 0 && Object.values(noti.val())[0].sendTo === currentUserKey) {
  //                               lst = `<li class="list-group-item list-group-item-action">
  //                           <div class="row">
  //                               <div class="col-md-2">
  //                                   <img src="${user.photoURL}" class="rounded-circle friend-pic" />
  //                               </div>
  //                               <div class="col-md-10" style="cursor:pointer;">
  //                                   <div class="name">${user.name}
  //                                       <button class="btn btn-sm btn-defualt" style="float:right;"><i class="fas fa-user-plus"></i> Pending</button>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </li>`;
  //                               document.getElementById('lstUsers').innerHTML += lst;
  //                           }
  //                           else {
  //                               lst = `<li class="list-group-item list-group-item-action" data-dismiss="modal">
  //                           <div class="row">
  //                               <div class="col-md-2">
  //                                   <img src="${user.photoURL}" class="rounded-circle friend-pic" />
  //                               </div>
  //                               <div class="col-md-10" style="cursor:pointer;">
  //                                   <div class="name">${user.name}
  //                                       <button onclick="SendRequest('${data.key}')" class="btn btn-sm btn-primary" style="float:right;"><i class="fas fa-user-plus"></i> Send Request</button>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </li>`;
  //                               document.getElementById('lstUsers').innerHTML += lst;
  //                           }
  //                       });
  //                   }
  //               });
  //           }
  //       });
  //   });
  // }

  // function PopulateNotifications() {
  //   document.getElementById('lstNotification').innerHTML = `<div class="text-center">
  //                                                        <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
  //                                                    </div>`;
  //   var db = firebase.database().ref('notifications');
  //   var lst = '';
  //   db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (notis) {
  //       if (notis.hasChildren()) {
  //           lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
  //                           <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
  //                       </li>`;
  //       }
  //       notis.forEach(function (data) {
  //           var noti = data.val();
  //           if (noti.status === 'Pending') {
  //               lst += `<li class="list-group-item list-group-item-action">
  //                           <div class="row">
  //                               <div class="col-md-2">
  //                                   <img src="${noti.photo}" class="rounded-circle friend-pic" />
  //                               </div>
  //                               <div class="col-md-10" style="cursor:pointer;">
  //                                   <div class="name">${noti.name}
  //                                       <button onclick="Reject('${data.key}')" class="btn btn-sm btn-danger" style="float:right;margin-left:1%;"><i class="fas fa-user-times"></i> Reject</button>
  //                                       <button onclick="Accept('${data.key}')" class="btn btn-sm btn-success" style="float:right;"><i class="fas fa-user-check"></i> Accept</button>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </li>`;
  //           }
  //       });
  
  //       document.getElementById('lstNotification').innerHTML = lst;
  //   });
  // }

  return (
    <>
      {/* Start chat content */}
      <div>
        <div className="p-6 pb-0">
          <div className="ltr:float-right rtl:float-left">
            <div className="relative">
              {/* Button trigger modal */}
              <button type="button" className="px-4 text-lg text-gray-500 group/tag" data-tw-toggle="modal" data-tw-target="#modal-id2">
                <i className="mr-1 ri-user-add-line ms-0 dark:text-violet-200" />
                <span className="absolute items-center hidden mb-6 top-8 group-hover/tag:flex ltr:-left-8 rtl:-right-8">
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black rounded shadow-lg">
                    Add Contact
                  </span>
                  <span className="w-3 h-3 -mt-6 rotate-45 bg-black ltr:-ml-12 rtl:-mr-12" />
                </span>
              </button>
            </div>
          </div>
          <h4 className="mb-6 dark:text-gray-50">Contacts</h4>
          <div className="relative z-50 hidden modal" id="modal-id2" aria-modal="true" role="modal-fifth">
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay" />
              <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
                <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                  <div className="bg-violet-800/10 dark:bg-zinc-700">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-500">
                      <h5 className="mb-0 text-gray-800 text-16 dark:text-gray-50" id="addgroup-exampleModaL">
                        Add Contact
                      </h5>
                      <button type="button" className="absolute top-3 ltr:right-2.5 rtl:left-2.5 text-gray-400 border-transparent hover:bg-gray-50/50/50 hover:text-gray-900 rounded-lg text-sm px-2 py-1 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:text-gray-100" data-tw-dismiss="modal" >
                        <i className="text-xl text-gray-500 mdi mdi-close dark:text-zinc-100/60" />
                      </button>
                    </div>
                    <div className="p-4">
                      <form>
                        <div className="mb-5 ltr:text-left rtl:text-right">
                          <label className="block mb-2 dark:text-gray-300"> Email </label>
                          <input type="text"
                            className="py-1.5 bg-transparent border-gray-100 rounded placeholder:text-13 w-full focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:placeholder:text-gray-300"
                            id="addgroupname-input1" placeholder="Enter Email"
                          />
                        </div>
                        <div className="mb-5 ltr:text-left rtl:text-right">
                          <label className="block mb-2 dark:text-gray-300"> Invatation Message </label>
                          <textarea
                            className="w-full bg-transparent border-gray-100 rounded placeholder:text-13 focus:border-violet-500 focus:ring-0 focus:ring-offset-0 dark:border-zinc-500 dark:placeholder:text-gray-300"
                            id="addgroupdescription-input1" rows={3} placeholder="Enter Message" defaultValue={""}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="flex justify-end p-4 border-t border-gray-100 dark:border-zinc-500">
                      <div>
                        <button type="button" className="border-0 btn hover:underline group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500" data-tw-dismiss="modal">
                          Close
                        </button>
                        <button type="button" className="text-white border-transparent btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=violet]:hover:bg-violet-600 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=green]:hover:bg-green-600 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=red]:hover:bg-red-600">
                          Invite Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-1 mt-5 mb-5 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 rounded group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
            <span className="group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 pe-1 ps-3 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600" id="basic-addon">
              <i className="text-lg text-gray-700 ri-search-line search-icon dark:text-gray-200" />
            </span>
            <input type="text" className="border-0 group-data-[theme-color=violet]:bg-slate-100 group-data-[theme-color=green]:bg-green-50 group-data-[theme-color=red]:bg-red-50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600 placeholder:text-[14px] focus:ring-offset-0 focus:outline-none focus:ring-0 placeholder:dark:text-gray-300" placeholder="Search users.." aria-describedby="basic-addon" />
          </div>
        </div>
        {/* Start contact lists */}
        {/* <div className="h-[80vh]" data-simplebar="">
          <div className="p-6">
            <div>
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                A
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50"> Albert Rodarte </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" type="button" data-bs-toggle="dropdown" id="dropdownMenuButtonB" >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm" aria-labelledby="dropdownMenuButtonB" >
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#" >
                            Share{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#" >
                            Block{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#">
                            Remove{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50"> Allison Etter </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300" type="button" data-bs-toggle="dropdown" id="dropdownMenuButtonC">
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm" aria-labelledby="dropdownMenuButtonC" >
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#">
                            Share{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#" >
                            Block{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50" href="#" >
                            Remove{" "} <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list A */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                C
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Craig Smiley
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonD"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonD"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list C */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                D
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Daniel Clay
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonEM"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonEM"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Doris Brown
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonES"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonES"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list D */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                I
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Iris Wells
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonF"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonF"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list I */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                J
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Juan Flakes
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonG"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonG"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        John Hall
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonH"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonH"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Joy Southern
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonI"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonI"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list J */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                M
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Mary Farmer
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonJ"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonJ"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Mark Messer
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonK"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonK"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Michael Hinton
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonL"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonL"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list M */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                O
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Ossie Wilson
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonM"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonM"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list O */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                P
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Phillis Griffin
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonN"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonN"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Paul Haynes
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonO"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonO"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list P */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                R
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Rocky Jackson
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonP"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonP"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list R */}
            {/* <div className="mt-3">
              <div className="p-3 font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=red]:text-red-500">
                S
              </div>
              <ul className="list-unstyled contact-list">
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Sara Muller
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonQ"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonQ"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Simon Velez
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonR"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonR"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="px-5 py-[15px]">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <h5 className="m-0 text-gray-700 text-14 dark:text-gray-50">
                        Steve Walker
                      </h5>
                    </div>
                    <div className="relative flex-shrink-0 dropdown">
                      <button
                        className="p-0 text-gray-400 border-0 btn dropdown-toggle dark:text-gray-300"
                        type="button"
                        data-bs-toggle="dropdown"
                        id="dropdownMenuButtonS"
                      >
                        <i className="text-lg ri-more-2-fill" />
                      </button>
                      <ul
                        className="absolute z-50 block w-40 py-2 my-6 text-left list-none bg-white border border-transparent rounded shadow-lg rtl:left-0 rtl:right-auto ltr:left-auto ltr:right-0 dropdown-menu bg-clip-padding dark:bg-zinc-700 dark:border-zinc-500/50 dark:shadow-sm"
                        aria-labelledby="dropdownMenuButtonS"
                      >
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Share{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-share-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Block{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-forbid-line" />
                          </a>
                        </li>
                        <li>
                          <a
                            className="block w-full px-6 py-2 text-sm font-normal text-gray-700 bg-transparent dropdown-item whitespace-nowrap hover:bg-gray-100/50 dark:text-gray-300 dark:hover:bg-zinc-500/50"
                            href="#"
                          >
                            Remove{" "}
                            <i className="float-right text-gray-500 dark:text-gray-300 ri-delete-bin-line" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
            {/* end contact list S */}
          {/* </div> */}
        {/* </div> */}
        {/* end contact lists */}
      </div>
    </>

  );
}