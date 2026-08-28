import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToggleContext } from "../context/toggleContext";
export default function SideBarLink({ linkData }) {
  const location = useLocation();
  // Extract the last path segment (e.g., "Tasks" from "/Dashboard/Tasks")
  const currentTab = location.pathname.split("/").pop();
  const { toggleSidebar } = useContext(ToggleContext);

  return (
    <li className="w-full my-3">
      <Link
        to={linkData.path}
        className={
          linkData.path != `/Dashboard/${currentTab}`
            ? "font-body-md flex items-center gap-3 px-4 py-4 text-on-surface-variant  hover:bg-surface-container-high  transition-all duration-300 ease-in-out rounded-sm font-label-md text-label-md"
            : "font-body-md flex items-center gap-3 px-6 py-4 border-l-4 border-primary rounded-r-sm   bg-secondary-container text-on-surface-variant  transition-all duration-300   font-label-md text-label-md"
        }
        onClick={toggleSidebar}
      >
        {" "}
        {linkData.icon}
        <span className="font-body-md text-lg font-semibold">
          {linkData.title}
        </span>
      </Link>
    </li>
  );
}
