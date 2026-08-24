import { Bell, Settings } from "lucide-react";
import { Avatar, Input } from "@mantine/core";

export default function NavBar() {
  return (
    <nav className="w-full h-16 bg-surface-container-lowest  border-b border-outline-variant shadow-sm z-10 flex justify-around  items-center px-gutter">
      <Input radius="lg" placeholder="Input component" />
      <ul className="flex ">
        <li className="font-label-md text-body-md font-semibold mx-4 text-on-surface-variant  hover:text-primary transition-colors cursor-pointer active:opacity-70">
          Home
        </li>
        <li className="font-label-md text-body-md font-semibold mx-4 text-on-surface-variant  hover:text-primary transition-colors cursor-pointer active:opacity-70">
          Tasks
        </li>
        <li className="font-label-md text-body-md font-semibold mx-4 text-on-surface-variant  hover:text-primary transition-colors cursor-pointer active:opacity-70">
          Notes
        </li>
        <li className="font-label-md text-body-md font-semibold mx-4 text-on-surface-variant  hover:text-primary transition-colors cursor-pointer active:opacity-70">
          Resources
        </li>
        <li className="font-label-md text-body-md font-semibold mx-4 text-on-surface-variant  hover:text-primary transition-colors cursor-pointer active:opacity-70">
          Profile
        </li>
      </ul>
      <div className=" flex gap-4 items-center">
        <Bell />
        <Settings />
        <Avatar radius="xl" />
      </div>
    </nav>
  );
}
