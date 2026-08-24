import { GraduationCap } from "lucide-react";

import SideBarLink from "./sideBarLink";
import { linksData } from "../data/data";

export default function SideBar() {
  const sideBarLinks = [...linksData];
  console.log(sideBarLinks);
  return (
    <div className="w-full hidden md:flex md:col-span-1 bg-surface border-r border-outline-variant px-5">
      <aside className="w-full h-full">
        <div className="w-full flex items-center gap-3 mt-8 mb-6 px-2">
          <div className="bg-primary w-10 h-10 rounded  flex items-center justify-center">
            {" "}
            <GraduationCap className="col-span-1 text-on-primary" size={30} />
          </div>
          <div className="flex flex-col col-span-4">
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">
              Student Hub
            </h1>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Academic Workspace
            </span>
          </div>
        </div>
        <ul>
          {sideBarLinks.map((linkData, i) => {
            return <SideBarLink key={i} linkData={linkData} />;
          })}
        </ul>
      </aside>
    </div>
  );
}
