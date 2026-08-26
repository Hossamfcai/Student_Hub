import { Link, useLocation } from "react-router-dom";

export default function NavLink({ linkInfo }) {
  const location = useLocation();
  // Extract the last path segment ("Tasks" from "/Dashboard/Tasks")
  const currentTab = location.pathname.split("/").pop();
  return (
    <li
      className={
        linkInfo.path != `/Dashboard/${currentTab}`
          ? "font-label-md text-body-md font-semibold mx-6 text-on-surface-variant border-b-2 pb-1 border-white  hover:text-primary transition-all duration-300 cursor-pointer "
          : "font-label-md text-body-md  mx-4 text-primary font-semibold border-b-2 pb-1 border-primary   transition-all duration-300 cursor-pointer "
      }
    >
      <Link to={linkInfo.path}>{linkInfo.title}</Link>
    </li>
  );
}
