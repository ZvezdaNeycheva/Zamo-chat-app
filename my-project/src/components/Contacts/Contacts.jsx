import React from 'react';

export function Contacts() {

  // function PopulateUserList() {
  //   document.getElementById('lstUsers').innerHTML = 
  //   `<div class="text-center">
  //     <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
  //    </div>`;

  //   var db = firebase.database().ref('users');
  //   var dbNoti = firebase.database().ref('notifications');
  //   var lst = '';
  //   db.on('value', function (users) {
  //       if (users.hasChildren()) {
  //           lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
  //                   <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
  //                  </li>`;
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
  //   document.getElementById('lstNotification').innerHTML =
  //    `<div class="text-center">
  //       <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"></span>
  //     </div>`;

  //   var db = firebase.database().ref('notifications');
  //   var lst = '';
  //   db.orderByChild('sendTo').equalTo(currentUserKey).on('value', function (notis) {
  //       if (notis.hasChildren()) {
  //         lst = `<li class="list-group-item" style="background-color:#f8f8f8;">
  //                   <input type="text" placeholder="Search or new chat" class="form-control form-rounded" />
  //                </li>`;
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
      </div>
    </>
  );
}