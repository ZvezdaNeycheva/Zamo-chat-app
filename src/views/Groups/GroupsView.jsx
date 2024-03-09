import { Groups } from "./Groups";
import { PartFromIndex } from "../../components/Main/PartFromIndex";
import { SidebarMenu } from "../../components/Sidebar-menu/SidebarMenu";

export function GroupsView() {
    return (
        <div>
            <div>
                <SidebarMenu />
            </div>
            <div>
                <Groups />
                <PartFromIndex />
            </div>
        </div>
    );
}