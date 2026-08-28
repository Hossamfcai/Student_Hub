import { GraduationCap, X } from "lucide-react";
import SideBarLink from "./sideBarLink";
import { linksData } from "../data/data";
import { useContext } from "react";
import { ToggleContext } from "../context/toggleContext";
import { Link } from "react-router-dom";

export default function SideBar() {
  const sideBarLinks = [...linksData];
  const { toggleSidebar, isOpen } = useContext(ToggleContext);
  return (
    <>
      <div
        onClick={() => {
          toggleSidebar();
        }}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-70 xs:w-[60%] sm:w-[50%] bg-surface border-r border-outline-variant py-8 
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:w-[22%] lg:z-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full flex items-center justify-between px-5 py-3">
          <Link to="/landingPage" className="flex items-center gap-3">
            <div className="bg-primary w-10 h-10 rounded flex items-center justify-center">
              <GraduationCap className="text-on-primary" size={30} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-headline-sm text-headline-sm font-bold text-primary">
                Student Hub
              </h1>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Academic Workspace
              </span>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={() => {
              toggleSidebar();
            }}
            className="lg:hidden text-on-surface-variant hover:text-primary"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="px-3 mt-4">
          {sideBarLinks.map((linkData, i) => (
            <SideBarLink key={i} linkData={linkData} />
          ))}
        </ul>
      </aside>
    </>
  );
}
