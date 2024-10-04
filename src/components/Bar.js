import { LayoutDashboard, Home, StickyNote, Layers, Calendar, LifeBuoy, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";

function Bar() {

  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<StickyNote size={20} />} text="Projects" />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
      </div>
    </>
  )
}

export default Bar