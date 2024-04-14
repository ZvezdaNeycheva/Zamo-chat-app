export function ProfileDialog({ onClose }) {
    return (
        <div className="flex items-center justify-center w-full h-full top-0 left-0 absolute z-50 backdrop-blur-sm bg-black/20">
            <div className="relative bg-white min-w-full min-h-full lg:min-w-[800px] lg:min-h-[600px] lg:rounded-lg lg:shadow-lg">
                <button type="button" className="absolute top-3 ltr:right-2.5 rtl:left-2.5 text-gray-400 border-transparent hover:bg-gray-50/50/50 hover:text-gray-900 rounded-lg text-sm px-2 py-1 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:text-gray-100" onClick={onClose} >
                    <i className="text-xl text-gray-500 mdi mdi-close dark:text-zinc-100/60" />
                </button>
            </div>
        </div>
    );
}