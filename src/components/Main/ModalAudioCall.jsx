export function ModalAudioCall() {
  return (
    <li className="relative z-50 hidden modal" id="audiCallModal">
    <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 transition-opacity bg-black bg-opacity-50 modal-overlay"></div>
        <div className="flex items-center justify-center max-w-lg min-h-screen p-4 mx-auto text-center animate-translate">
            <div className="relative w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl -top-10 dark:bg-zinc-700">
                <div className="group-data-[theme-color=violet]:bg-violet-800/10 group-data-[theme-color=green]:bg-green-50/50 group-data-[theme-color=red]:bg-red-50/50 group-data-[theme-color=violet]:dark:bg-zinc-600 group-data-[theme-color=green]:dark:bg-zinc-600 group-data-[theme-color=red]:dark:bg-zinc-600">
                    <div className="p-4">
                        <div className="p-6">
                            <div className="p-4 text-center">
                                <div className="mb-6">
                                    <img src="assets/images/users/avatar-4.jpg" alt="" className="w-24 h-24 mx-auto rounded-full" />
                                </div>

                                <h5 className="mb-1 text-gray-800 truncate dark:text-gray-50">Doris Brown</h5>
                                <p className="text-gray-500 dark:text-gray-300">Start Audio Call</p>

                                <div className="mt-10">
                                    <ul className="flex justify-center mb-1">
                                        <li className="px-2 ml-0 mr-2">
                                            <button type="button" className="w-12 h-12 text-white bg-red-500 border-transparent rounded-full btn hover:bg-red-600" data-tw-dismiss="modal">
                                                <span className="text-xl bg-transparent">
                                                    <i className="ri-close-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                        <li className="px-2">
                                            <button type="button" className="w-12 h-12 text-white bg-green-500 border-transparent rounded-full btn hover:bg-green-600">
                                                <span className="text-xl bg-transparent">
                                                    <i className="ri-phone-fill"></i>
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</li>
  )
}