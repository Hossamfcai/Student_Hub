import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  ListFilter,
  Plus,
  Search,
  Target,
  Trash2,
} from "lucide-react";

import TaskCard from "../../components/TaskCard";
import TaskFormModal from "../../components/TaskFormModal";

import "./tasks.css";

const initialTasks = [
  {
    id: 1,
    title: "Complete Database Assignment",
    description:
      "Finish the SQL queries and prepare the final documentation for submission.",
    dueDate: "2026-08-28",
    priority: "High",
    category: "Assignment",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Review React Lecture",
    description:
      "Go through the component architecture lecture and review the examples.",
    dueDate: "2026-08-29",
    priority: "Medium",
    category: "Study",
    status: "Pending",
  },
  {
    id: 3,
    title: "Prepare Project Presentation",
    description:
      "Finalize the slides and prepare the talking points for the presentation.",
    dueDate: "2026-09-02",
    priority: "High",
    category: "Project",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Read Chapter 5",
    description:
      "Read the assigned chapter and write down the important concepts.",
    dueDate: "2026-09-04",
    priority: "Low",
    category: "Study",
    status: "Pending",
  },
  {
    id: 5,
    title: "Submit UX Research",
    description:
      "Upload the completed UX research report before the deadline.",
    dueDate: "2026-08-25",
    priority: "Medium",
    category: "Assignment",
    status: "Completed",
  },
  {
    id: 6,
    title: "Practice JavaScript Questions",
    description:
      "Complete the practice questions covering arrays, objects, and functions.",
    dueDate: "2026-08-31",
    priority: "Low",
    category: "Study",
    status: "Pending",
  },
];

const STORAGE_KEY = "student-hub-tasks";

const statusOptions = ["All", "Pending", "In Progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];

function getStoredTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return initialTasks;
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks) ? parsedTasks : initialTasks;
  } catch {
    return initialTasks;
  }
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClassName,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-on-surface-variant">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-on-surface">
            {value}
          </p>

          <p className="mt-1 text-xs text-on-surface-variant">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </motion.div>
  );
}

function FilterSelect({ value, onChange, options, label }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 appearance-none rounded-lg border border-outline-variant bg-surface-container-lowest pl-3 pr-9 text-sm font-medium text-on-surface-variant outline-none transition-all hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline"
      />
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState(getStoredTasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const statistics = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "Completed",
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress",
    ).length;

    const pending = tasks.filter(
      (task) => task.status === "Pending",
    ).length;

    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      inProgress,
      pending,
      completionPercentage,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...result].sort((first, second) => {
      if (sortBy === "priority") {
        const priorityOrder = {
          High: 1,
          Medium: 2,
          Low: 3,
        };

        return (
          priorityOrder[first.priority] - priorityOrder[second.priority]
        );
      }

      if (sortBy === "title") {
        return first.title.localeCompare(second.title);
      }

      if (sortBy === "status") {
        return first.status.localeCompare(second.status);
      }

      return (
        new Date(`${first.dueDate}T00:00:00`) -
        new Date(`${second.dueDate}T00:00:00`)
      );
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  function openCreateModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleTaskSubmit(formData) {
    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                ...formData,
              }
            : task,
        ),
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
      };

      setTasks((previous) => [newTask, ...previous]);
    }

    closeModal();
  }

  function handleToggleComplete(taskId) {
    setTasks((previous) =>
      previous.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const completed = task.status === "Completed";

        return {
          ...task,
          status: completed ? "Pending" : "Completed",
        };
      }),
    );
  }

  function handleDelete(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`,
    );

    if (!shouldDelete) {
      return;
    }

    setTasks((previous) =>
      previous.filter((item) => item.id !== taskId),
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("dueDate");
  }

  return (
    <div className="tasks-page min-h-[calc(100vh-4rem)] bg-surface px-5 py-7 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              <ClipboardList size={15} />
              Task Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
              Your Tasks
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant md:text-base">
              Organize your academic responsibilities, keep track of deadlines,
              and stay on top of your progress.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus size={18} />
            Add Task
          </button>
        </motion.div>

        {/* =====================================================
            STATISTICS
            ===================================================== */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ClipboardList}
            label="Total Tasks"
            value={statistics.total}
            description="Tasks in your workspace"
            iconClassName="bg-primary-fixed text-primary"
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={statistics.completed}
            description={`${statistics.completionPercentage}% completion rate`}
            iconClassName="bg-[#e3f7ec] text-[#23784f]"
          />

          <StatCard
            icon={Clock3}
            label="In Progress"
            value={statistics.inProgress}
            description="Currently being worked on"
            iconClassName="bg-primary-fixed text-primary"
          />

          <StatCard
            icon={Target}
            label="Pending"
            value={statistics.pending}
            description="Waiting to be started"
            iconClassName="bg-surface-container-high text-on-surface-variant"
          />
        </div>

        {/* =====================================================
            PROGRESS
            ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-7 rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-on-surface">
                Overall progress
              </h2>

              <p className="mt-1 text-xs text-on-surface-variant">
                Keep going — you're making progress.
              </p>
            </div>

            <span className="text-lg font-bold text-primary">
              {statistics.completionPercentage}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-container">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${statistics.completionPercentage}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-primary"
            />
          </div>
        </motion.div>

        {/* =====================================================
            FILTERS
            ===================================================== */}

        <div className="mb-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}
            <div className="relative w-full xl:max-w-md">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tasks..."
                className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest pl-10 pr-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
                <ListFilter size={15} />
                Filters
              </div>

              <FilterSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                label="Filter by status"
              />

              <FilterSelect
                value={priorityFilter}
                onChange={setPriorityFilter}
                options={priorityOptions}
                label="Filter by priority"
              />

              <FilterSelect
                value={sortBy}
                onChange={setSortBy}
                options={[
                  "dueDate",
                  "priority",
                  "title",
                  "status",
                ]}
                label="Sort tasks"
              />

              {(searchQuery ||
                statusFilter !== "All" ||
                priorityFilter !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary-fixed"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            TASK LIST HEADER
            ===================================================== */}

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              {statusFilter === "All" ? "All Tasks" : statusFilter}
            </h2>

            <p className="mt-1 text-xs text-on-surface-variant">
              Showing {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        {/* =====================================================
            TASK LIST
            ===================================================== */}

        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-4 xl:grid-cols-2"
            >
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-16 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                <ClipboardList size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-on-surface">
                No tasks found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-on-surface-variant">
                {searchQuery ||
                statusFilter !== "All" ||
                priorityFilter !== "All"
                  ? "Try changing your filters or search for something else."
                  : "You don't have any tasks yet. Create your first task to get started."}
              </p>

              {searchQuery ||
              statusFilter !== "All" ||
              priorityFilter !== "All" ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm font-bold text-primary hover:underline"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-on-primary"
                >
                  <Plus size={16} />
                  Create Task
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      <TaskFormModal
        opened={modalOpen}
        task={editingTask}
        onClose={closeModal}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
}
