// export default function Switcher() {
//   const toggleSwitcher = () => {
//     // Implement the toggleSwitcher logic here
//     console.log('Toggle Switcher clicked');
//   };

//   const changeMode = (event) => {
//     // Implement the changeMode logic here
//     console.log('Change Mode clicked', event);
//   };

//   return (
//     <>
//       <div className="fixed transition-all duration-300 ease-linear top-[50%] switcher z-50" id="style-switcher">
//         <div className="w-48 p-4 bg-white shadow-md dark:bg-zinc-700">
//           <div>
//             <h3 className="mb-2 font-medium text-gray-900 text-14 dark:text-gray-100"> Select your color </h3>
//             <ul className="flex gap-3 ">
//               <li>
//                 <a className="h-10 w-10 bg-[#815DF2] block rounded-full" data-color="violet" href="#"/>
//               </li>
//               <li>
//                 <a className="h-10 w-10 bg-[#38c284] block rounded-full" data-color="green" href="#" />
//               </li>
//               <li>
//                 <a className="h-10 w-10 bg-[#dd4948] block rounded-full" data-color="red" href="#" />
//               </li>
//             </ul>
//           </div>
//           <div className="mt-5 mb-2">
//             <h3 className="mb-3 font-medium text-gray-900 text-14 dark:text-gray-100"> RTL / LTR </h3>
//             <button
//               id="ltr-rtl"
//               className="z-50 px-3 py-3 my-2 font-medium text-white transition-all duration-300 ease-linear group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 text-14 hover:bg-violet-700 rounded"
//               onClick={(event) => changeMode(event)}
//             >
//               <span className="ltr:hidden">LTR</span>
//               <span className="rtl:hidden">RTL</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* light-dark mode button */}
//       <button
//         onClick={() => toggleSwitcher()}
//         className="fixed z-50 flex-col gap-3 px-4 py-3 ltr:right-0 rtl:left-0 font-normal text-white group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 top-[44%] text-14 ltr:rounded-l rtl:rounded-r hidden lg:block"
//       >
//         <i className="text-xl mdi mdi-cog mdi-spin" />
//       </button>
//     </>
//   );
// }