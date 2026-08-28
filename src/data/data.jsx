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
import { v4 as uuidv4 } from "uuid";

export const linksData = [
  { title: "Home", path: "/Dashboard/Home", icon: <House /> },
  { title: "Tasks", path: "/Dashboard/Tasks", icon: <ListChecks /> },
  { title: "Notes", path: "/Dashboard/Notes", icon: <NotebookPen /> },
  { title: "Resources", path: "/Dashboard/Resources", icon: <Files /> },
  { title: "Profile", path: "/Dashboard/Profile", icon: <User /> },
];

export const statisticsData = [
  {
    icon: <FileCheck />,
    title: "Total Tasks",
    result: "",
  },
  {
    icon: <ClipboardClock />,
    title: "Total Notes ",
    result: "",
  },
  {
    icon: <CircleCheckBig />,
    title: "Total Resources",
    result: "",
  },
];

export const chartData = [
  { name: "Pending", value: 5, color: "indigo.6" },
  { name: "In progress", value: 10, color: "yellow.6" },
  { name: "Completed", value: 85, color: "teal.6" },
];

export const user = {
  image: "",
  name: "",
  major: "",
  universtiy: "",
  studentId: "",
  email: "",
  phone: "",
  address: "",
  college: "",
  degree: "",
  connect: ["github", "linkedIn"],
  skills: [
    "UI/UX Design",
    "Tailwind CSS",
    "JavaScript",
    "React",
    "Python",
    "Git",
  ],
  initialNotes: [
    {
      id: uuidv4(),
      title: "React Component Architecture",
      content:
        "Keep components small and reusable. Pages should handle page-level logic while shared UI belongs inside components. Avoid putting navigation components directly inside individual pages when the dashboard layout already provides them.",
      category: "Lecture",
      tags: ["react", "frontend", "architecture"],
      color: "lavender",
      pinned: true,
      favorite: true,
      updatedAt: "2026-08-25T18:30:00",
    },
    {
      id: uuidv4(),
      title: "Database Exam Revision",
      content:
        "Review normalization, primary and foreign keys, joins, indexes, transactions, ACID properties, and SQL aggregation functions. Practice writing queries without relying on examples.",
      category: "Study",
      tags: ["database", "sql", "exam"],
      color: "cream",
      pinned: true,
      favorite: false,
      updatedAt: "2026-08-24T14:20:00",
    },
    {
      id: uuidv4(),
      title: "Graduation Project Ideas",
      content:
        "Prepare the presentation structure: problem → solution → architecture → technologies → AI pipeline → results → future work. Keep the explanation simple and focus on the real impact of the project.",
      category: "Project",
      tags: ["project", "presentation"],
      color: "green",
      pinned: false,
      favorite: true,
      updatedAt: "2026-08-22T20:10:00",
    },
    {
      id: uuidv4(),
      title: "Things to Remember",
      content:
        "Keep Git commits meaningful. Test before pushing. Document important decisions. When working with teammates, communicate changes before modifying shared files.",
      category: "Personal",
      tags: ["reminders", "productivity"],
      color: "blue",
      pinned: false,
      favorite: false,
      updatedAt: "2026-08-20T11:45:00",
    },
    {
      id: uuidv4(),
      title: "JavaScript Concepts",
      content:
        "Review closures, promises, async/await, event loop, map/filter/reduce, destructuring, spread syntax, and modules. Practice explaining each concept instead of memorizing definitions.",
      category: "Study",
      tags: ["javascript", "frontend"],
      color: "default",
      pinned: false,
      favorite: true,
      updatedAt: "2026-08-18T16:30:00",
    },
  ],
  initialTasks: [
    {
      id: uuidv4(),
      title: "Complete Database Assignment",
      description:
        "Finish the SQL queries and prepare the final documentation for submission.",
      dueDate: "2026-08-28",
      priority: "High",
      category: "Assignment",
      status: "In Progress",
    },
    {
      id: uuidv4(),
      title: "Review React Lecture",
      description:
        "Go through the component architecture lecture and review the examples.",
      dueDate: "2026-08-29",
      priority: "Medium",
      category: "Study",
      status: "Pending",
    },
    {
      id: uuidv4(),
      title: "Prepare Project Presentation",
      description:
        "Finalize the slides and prepare the talking points for the presentation.",
      dueDate: "2026-09-02",
      priority: "High",
      category: "Project",
      status: "In Progress",
    },
    {
      id: uuidv4(),
      title: "Read Chapter 5",
      description:
        "Read the assigned chapter and write down the important concepts.",
      dueDate: "2026-09-04",
      priority: "Low",
      category: "Study",
      status: "Pending",
    },
    {
      id: uuidv4(),
      title: "Submit UX Research",
      description:
        "Upload the completed UX research report before the deadline.",
      dueDate: "2026-08-25",
      priority: "Medium",
      category: "Assignment",
      status: "Completed",
    },
    {
      id: uuidv4(),
      title: "Practice JavaScript Questions",
      description:
        "Complete the practice questions covering arrays, objects, and functions.",
      dueDate: "2026-08-31",
      priority: "Low",
      category: "Study",
      status: "Pending",
    },
  ],
  resources: [
    {
      id: uuidv4(),
      title: "React Component Architecture",
      type: "video",
      imageUrl: "",
      content:
        "Keep components small and reusable. Pages should handle page-level logic while shared UI belongs inside components. Avoid putting navigation components directly inside individual pages when the dashboard layout already provides them.",
      category: "Lecture",
      tags: ["react", "frontend", "architecture"],
      pinned: true,
      favorite: true,
      updatedAt: "2026-08-25T18:30:00",
    },
  ],
};
