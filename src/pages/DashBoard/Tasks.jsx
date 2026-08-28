import { useMemo, useReducer, useState } from "react";
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

import { useDisclosure } from "@mantine/hooks";
import TaskCard from "../../components/TaskCard";
import TaskFormModal from "../../components/TaskFormModal";

import "./Tasks.css";
import reducer, { getInitialUserState } from "../../context/authReducer";
import DeletedModal from "../../components/DeletedModal";

const statusOptions = ["All", "Pending", "In Progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];

function StatCard({ icon: Icon, label, value, description, iconClassName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-on-surface-variant">{label}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-on-surface">
            {value}
          </p>

          <p className="mt-1 text-xs text-on-surface-variant">{description}</p>
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
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const [opened, { open, close }] = useDisclosure(false); // control deletedModal
  const [modalOpen, setModalOpen] = useState(false); // control updated or add modal
  const [task, setTask] = useState(null); //control the returned data from taskCard component

  const statistics = useMemo(() => {
    const total = userState.initialTasks.length;

    const completed = userState.initialTasks.filter(
      (task) => task.status === "Completed",
    ).length;

    const inProgress = userState.initialTasks.filter(
      (task) => task.status === "In Progress",
    ).length;

    const pending = userState.initialTasks.filter(
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
  }, [userState]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = userState.initialTasks.filter((task) => {
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

        return priorityOrder[first.priority] - priorityOrder[second.priority];
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
  }, [userState, searchQuery, statusFilter, priorityFilter, sortBy]);

  function openCreateModal() {
    setTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTask(null);
  }

  function handleTaskSubmit(formData) {
    if (task) {
      dispatch({ type: "updateTask", payload: { task, formData } });
    } else {
      dispatch({ type: "addTask", payload: formData });
    }

    closeModal();
  }

  function handleToggleComplete(taskId) {
    dispatch({ type: "onToggleComplete", payload: { id: taskId } });
  }

  function openDeleteModal(task) {
    open();

    if (task) {
      setTask(task);
    } else {
      close();
    }
  }
  function handleDelete() {
    dispatch({ type: "deleteTask", payload: { id: task.id } });

    close();
  }
  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setSortBy("dueDate");
  }

  return (
    <div className="tasks-page min-h-[calc(100vh-4rem)] ">
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
                options={["dueDate", "priority", "title", "status"]}
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
                  onDelete={openDeleteModal}
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
        task={task}
        onClose={closeModal}
        onSubmit={handleTaskSubmit}
      />
      <DeletedModal opened={opened} close={close}>
        <div className="flex flex-col items-center gap-6 px-2 py-3">
          <div className="flex flex-col items-center gap-2">
            {" "}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-container mb-sm  text-error">
              <Trash2 />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs font-bold">
              Confirm Deletion
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg px-xs text-center">
              Are you sure you want to delete this item? This action cannot be
              undone and the data will be permanently removed.
            </p>
          </div>
          <div className="flex w-full gap-3 sm:flex-row flex-col-reverse">
            <button
              className="w-full sm:w-1/2 inline-flex justify-center items-center px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-sm font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-1/2 inline-flex justify-center items-center px-4 py-2 bg-error rounded-sm font-label-md text-label-md text-on-error hover:bg-error/90 transition-colors focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
              type="button"
              onClick={handleDelete}
            >
              Delete Task
            </button>
          </div>
        </div>
      </DeletedModal>
    </div>
  );
}
