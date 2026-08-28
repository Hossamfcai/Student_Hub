import { Menu } from "lucide-react";
import defaultImage from "../assets/Images/defaultUser.jpg";
import { linksData } from "../data/data";
import NavLink from "./navLink";
import { useContext, useReducer } from "react";
import { ToggleContext } from "../context/toggleContext";
import { Link } from "react-router-dom";
import reducer, { getInitialUserState } from "../context/authReducer";

export default function NavBar() {
  const links = [...linksData];
  const { toggleSidebar } = useContext(ToggleContext);
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  return (
    <nav className="w-full h-16 bg-surface-container-lowest border-b border-outline-variant shadow-sm z-10 flex justify-between items-center px-6">
      <button
        type="button"
        className="flex lg:hidden p-2 text-on-surfsace hover:bg-surface-variant/20 rounded-md cursor-pointer"
        onClick={() => {
          toggleSidebar();
        }}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      <ul className=" lg:w-full hidden md:flex justify-center gap-4">
        {links.map((link, i) => {
          return link.title != "Profile" && <NavLink key={i} linkInfo={link} />;
        })}
      </ul>

      <div className="flex gap-4 items-center">
        <Link to="/Dashboard/Profile">
          <div className=" h-9 w-9 rounded-full  bg-surface-container-lowest shadow-xl">
            <img
              loading="lazy"
              className="rounded-full w-full h-full object-cover"
              src={userState.image.url ? userState.image.url : defaultImage}
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
