# 🎓 Student Hub

**Student Hub** is an all-in-one web application built to help students organize their academic life in one place. Instead of juggling separate apps for tasks, notes, and study resources, students get a single dashboard that brings everything together — along with a live overview of their progress and a personal profile that reflects who they are.

🔗 **Live App:** [student-hub-eight-nu.vercel.app](https://student-hub-eight-nu.vercel.app/)

---

## ✨ Features

### 🏠 Home / Statistics Dashboard
A landing dashboard that gives students an instant, visual summary of their academic activity — how many tasks are pending or completed, how many notes they've written, and how many resources they've saved. It turns raw data into simple charts so students can understand their progress at a glance instead of digging through lists.

### ✅ Tasks
A complete task management system where students can create, edit, organize, and track their assignments and to-dos, with clear status updates and progress tracking to make sure nothing is forgotten before a deadline.

### 📝 Notes
A dedicated space for students to write, save, and manage their study notes — helping them capture ideas and lessons in an organized way instead of scattered pieces of paper or random apps.

### 📚 Resources
A hub for organizing useful study materials, links, and references, so students can keep everything related to a subject or topic in one accessible place.

### 👤 Profile
A personal profile page that gathers all the information related to the student — a single place that reflects their identity and their journey inside the app.

### 🔔 Smart Notifications
Every important action across the system (creating, updating, deleting tasks, notes, or resources) triggers a notification, keeping the user constantly informed about what's happening in their account without needing to double-check manually.

### Why it benefits users
- **Everything in one place** — no more switching between a to-do app, a notes app, and bookmarks for resources.
- **Clarity through statistics** — students immediately see how productive they are and where they need to focus.
- **Organized academic identity** — the profile page keeps a student's information and activity connected and easy to review.
- **Instant feedback** — notifications make the app feel alive and responsive, so users always know their actions were successful.
- **Clean, modern experience** — smooth UI and animations make daily use pleasant rather than tedious.

---

## 🛠️ Tech Stack & Libraries

| Library | Purpose | Why we chose it |
|---|---|---|
| **@mantine/core** | Core UI component library | Provides a rich set of accessible, ready-made, highly customizable components, which let us build a polished dashboard UI without reinventing basic building blocks from scratch. |
| **@mantine/form** | Form state & validation | Simplifies handling form state, validation rules, and error messages for tasks, notes, and profile forms in a consistent, predictable way. |
| **@mantine/hooks** | Utility React hooks | Offers a collection of battle-tested hooks (debounce, disclosure, media queries, etc.) that reduce boilerplate and keep components clean. |
| **@mantine/notifications** | Notification system | Powers the toast-style notifications shown after every action in the system, giving users immediate, non-intrusive feedback. |
| **@tailwindcss/postcss** & **@tailwindcss/vite** | Utility-first CSS integration | Enables fast, consistent styling with Tailwind directly inside the Vite build pipeline, working alongside Mantine for custom layout and spacing needs. |
| **postcss** | CSS transformation | The processing engine required to run Tailwind and Mantine's PostCSS-based plugins. |
| **postcss-preset-mantine** | Mantine-specific PostCSS features | Adds Mantine-friendly CSS features (like `light-dark()` and spacing functions) so Mantine's theming system works smoothly with our custom CSS. |
| **postcss-simple-vars** | CSS variables support | Lets us define and reuse simple CSS variables across stylesheets for consistent design tokens. |
| **lucide-react** | Icon library | A clean, lightweight, and consistent icon set used throughout the UI for clarity and visual consistency. |
| **motion** | Animations | Adds smooth, meaningful transitions and micro-interactions, making the interface feel modern and alive rather than static. |
| **react** & **react-dom** | Core framework | The foundation of the entire application — a component-based library for building fast, interactive user interfaces. |
| **react-router-dom** | Client-side routing | Manages navigation between pages (Dashboard, Tasks, Notes, Resources, Profile) without full page reloads, enabling a true single-page app experience. |
| **recharts** | Data visualization | Used to build the statistics charts on the home page, turning task/notes/resources data into readable, interactive graphs. |
| **uuid** | Unique ID generation | Generates reliable unique identifiers for tasks, notes, and resources so each item can be tracked, edited, or deleted safely. |

---

## 👨‍💻 Development Team

### Hossam Ibrahim
Responsible for the overall **architecture and routing** of the application. His contributions include:
- Designing and structuring the app's routes and navigation flow using `react-router-dom`.
- Building the **Home / Statistics page**, including the charts and data summaries shown to the user.
- Building the **Resources page** and its full functionality.
- Building the **Profile page**, bringing together all user-related information.
- **Separating logic from UI** across the app by introducing the **reducer pattern**, keeping components focused on presentation while state logic stays centralized and predictable.
- Integrating **notifications** across all system actions, ensuring every create/update/delete action gives the user clear, consistent feedback.

### Menna El Sayed
Responsible for building the **Tasks page** with all of its features, along with the **Notes page** and the **Landing page**. Her contributions include:
- Designing and implementing the complete **Tasks** experience — creating, editing, updating status, and organizing tasks.
- Building the **Notes page**, allowing students to create, edit, and manage their study notes.
- Designing and building the **Landing page**, the first impression users get of Student Hub.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 📌 Summary

Student Hub combines task management, note-taking, and resource organization into one clean, statistics-driven dashboard — built with a modern React stack (Mantine, Tailwind, Recharts, and more) and a clear separation between UI and logic, so students can stay organized and focused on what matters: learning.
