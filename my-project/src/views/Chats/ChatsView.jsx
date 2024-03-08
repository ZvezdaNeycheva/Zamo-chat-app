import { PartFromIndex } from "../../components/Main/PartFromIndex";
import { SidebarMenu } from "../../components/Sidebar-menu/SidebarMenu";
import { Chats } from "./Chats";
import './ChatsView.css';

export function ChatsView() {
    return (
        <div className="container">
            <div className="sidebar">
                <SidebarMenu />
            </div>
            <div className="content">
                <div className="chats">
                    <Chats />
                </div>
                <div className="part">
                    <PartFromIndex />
                </div>
            </div>
        </div>

    );
}
