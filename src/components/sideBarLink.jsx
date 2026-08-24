import { Link } from "react-router-dom";
export default function SideBarLink({ linkData }) {
  //   console.log(linkData);
  return (
    <li className="w-full my-3">
      <Link
        to={linkData.path}
        className="font-body-md flex items-center gap-3 px-8 py-3 text-on-surface-variant  hover:bg-surface-container-high  transition-all duration-200 ease-in-out rounded-lg font-label-md text-label-md"
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
