import { useState } from "react";
import { Home, StickyNote, Layers, Calendar, LifeBuoy, Settings } from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import HomeContent from "../components/Dashboard/HomeContent";
import TasksContent from "../components/Dashboard/TasksContent";
import NotesContent from "../components/Dashboard/NotesContent";
import CalendarContent from "../components/Dashboard/CalendarContent";
import SettingsContent from "../components/Dashboard/SettingsContent";
import HelpContent from "../components/Dashboard/HelpContent";

function Dashboard() {
  const [activeContent, setActiveContent] = useState("Home");

  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        return <HomeContent/>;
      case "Tasks":
        return <TasksContent/>;
      case "Notes":
        return <NotesContent/>;
      case "Calendar":
        return <CalendarContent/>;
      case "Settings":
        return <SettingsContent/>;
      case "Help":
        return <HelpContent/>;
      default:
        return <h2 className="text-white">Welcome</h2>;
    }
  };

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem 
          icon={<Home size={20} />} 
          text="Home" 
          active={activeContent === "Home"} 
          onClick={() => setActiveContent("Home")}  
        />
        <SidebarItem 
          icon={<Layers size={20} />} 
          text="Tasks" 
          active={activeContent === "Tasks"} 
          onClick={() => setActiveContent("Tasks")}  
        />
        <SidebarItem 
          icon={<StickyNote size={20} />} 
          text="Notes" 
          active={activeContent === "Notes"} 
          onClick={() => setActiveContent("Notes")}  
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          text="Calendar" 
          active={activeContent === "Calendar"} 
          onClick={() => setActiveContent("Calendar")}  
        />
        <hr className="my-3" />
        <SidebarItem 
          icon={<Settings size={20} />} 
          text="Settings" 
          active={activeContent === "Settings"} 
          onClick={() => setActiveContent("Settings")}  
        />
        <SidebarItem 
          icon={<LifeBuoy size={20} />} 
          text="Help" 
          active={activeContent === "Help"} 
          onClick={() => setActiveContent("Help")} 
        />
      </Sidebar>

      <div className="flex-grow p-6 sidebar-main">
        <h1 className="font-bold text-white">👋 Welcome, fullName</h1>
        <div className="container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
