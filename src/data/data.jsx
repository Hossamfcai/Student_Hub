import {
  House,
  ListChecks,
  NotebookPen,
  Files,
  User,
  FileCheck,
  ClipboardClock,
  CircleCheckBig,
} from "lucide-react";

export const linksData = [
  { title: "Home", path: "/Dashboard/Home", icon: <House /> },
  { title: "Tasks", path: "/Dashboard/Tasks", icon: <ListChecks /> },
  { title: "Notes", path: "/Dashboard/Notes", icon: <NotebookPen /> },
  { title: "Resources", path: "/Dashboard/Resources", icon: <Files /> },
  { title: "Profile", path: "/Dashboard/Profile", icon: <User /> },
];

export const statisticsData = [
  {
    color: "bg-surface-container text-primary",
    icon: <FileCheck />,
    title: "Total Tasks",
    result: "100",
  },
  {
    color: "bg-error-container text-on-error-container",
    icon: <ClipboardClock />,
    title: "Incomplete %",
    result: "15",
  },
  {
    color: "bg-[#d1fae5] text-[#065f46]",
    icon: <CircleCheckBig />,
    title: "Total Completed",
    result: "85",
  },
];

export const chartData = [
  { name: "Pending", value: 5, color: "indigo.6" },
  { name: "In progress", value: 10, color: "yellow.6" },
  { name: "Completed", value: 85, color: "teal.6" },
];
