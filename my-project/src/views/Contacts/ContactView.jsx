import { Contacts } from "./Contacts";
import { PartFromIndex } from "../../components/Main/PartFromIndex";
import { SidebarMenu } from "../../components/Sidebar-menu/SidebarMenu";

export function ContactsView() {
    return (
        <div>
            <div>
                <SidebarMenu />
            </div>
            <div>
                <Contacts />
                <PartFromIndex />
            </div>
        </div>
    );
}