import { Outlet } from "react-router-dom";
import SideBar from "../../components/sideBar";
import NavBar from "../../components/navBar";
import { useEffect, useState } from "react";
import { ToggleContext } from "../../context/toggleContext";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((previous) => !previous);
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = (e) => {
      if (e.matches) setIsSidebarOpen(false);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <ToggleContext.Provider value={{ toggleSidebar, isOpen: isSidebarOpen }}>
      <div className="w-full h-screen flex overflow-hidden">
        <SideBar />

        <div className="w-full lg:w-[78%] flex flex-col h-full min-w-0">
          <NavBar />
          <section className="flex-1 overflow-y-auto scrollbar-thin mx-5">
            <Outlet />
          </section>
        </div>
      </div>
    </ToggleContext.Provider>
  );
}
