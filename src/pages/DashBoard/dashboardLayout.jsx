import { Outlet } from "react-router-dom";

import { linksData } from "../../data/data";

import SideBar from "../../components/sideBar";
import NavBar from "../../components/navBar";

export default function DashboardLayout() {
  const sideBarLinks = [...linksData];
  console.log(sideBarLinks);
  return (
    <div className="w-full min-h-screen grid grid-cols-5">
      <SideBar />
      <div className="col-span-4 md:col-span-4">
        <NavBar />
        <section className="">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
