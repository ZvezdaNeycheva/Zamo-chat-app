import { Meta } from "../components/Meta/Meta";
import { SidebarMenu } from "../components/Sidebar-menu/SidebarMenu";

export function Layout({selectedAppBarButton, sideBarContent, mainContent}) {
    return (
        <>
            <Meta title={'Chat App'}></Meta>

            <div className="lg:flex">
                {/* <!-- Start left sidebar-menu --> */}
                <SidebarMenu selected={selectedAppBarButton} />
                {/* <!-- end left sidebar-menu --> */}

                {sideBarContent && (
                    <div className="chat-leftsidebar lg:w-[380px] group-data-[theme-color=violet]:bg-slate-50 group-data-[theme-color=green]:bg-green-50/20 group-data-[theme-color=red]:bg-red-50/20 shadow overflow-y-hidden mb-[80px] lg:mb-0 group-data-[theme-color=violet]:dark:bg-zinc-700 group-data-[theme-color=green]:dark:bg-zinc-700 group-data-[theme-color=red]:dark:bg-zinc-700">
                        <div>
                            <div className="tab-content active"> {sideBarContent} </div>
                        </div>
                    </div>
                )}

                {/* <!-- Start User chat --> */}
                <div className={`w-full overflow-hidden transition-all duration-150 user-chat dark:bg-zinc-800 ${mainContent && !sideBarContent ? 'bg-slate-50' : ''}`}>
                    {mainContent}
                </div>
                {/* <!-- End User chat --> */}
            </div>
        </>
    )
}
