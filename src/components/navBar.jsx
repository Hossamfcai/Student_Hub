import { Menu } from "lucide-react";
import { Avatar } from "@mantine/core";
import { linksData } from "../data/data";
import NavLink from "./navLink";
import { useContext } from "react";
import { ToggleContext } from "../context/toggleContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const links = [...linksData];
  const { toggleSidebar } = useContext(ToggleContext);

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
          <Avatar radius="xl" />
        </Link>
      </div>
    </nav>
  );
}
