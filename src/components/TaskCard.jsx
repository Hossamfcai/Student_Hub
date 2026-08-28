import { motion } from "motion/react";
import {
  CalendarDays,
  Check,
  Clock3,
  Edit3,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

const priorityStyles = {
  High: {
    badge: "bg-error-container text-on-error-container",
    dot: "bg-error",
  },
  Medium: {
    badge: "bg-primary-fixed text-on-primary-fixed-variant",
    dot: "bg-primary",
  },
  Low: {
    badge: "bg-surface-container-high text-on-surface-variant",
    dot: "bg-outline",
  },
};

const statusStyles = {
  Completed: "bg-[#e3f7ec] text-[#23784f]",
  "In Progress": "bg-primary-fixed text-on-primary-fixed-variant",
  Pending: "bg-surface-container-high text-on-surface-variant",
};

function formatDate(dateString) {
  if (!dateString) return "No deadline";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "No deadline";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(task) {
  if (!task.dueDate || task.status === "Completed") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${task.dueDate}T00:00:00`);

  return dueDate < today;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const priority = priorityStyles[task.priority] || priorityStyles.Low;
  const overdue = isOverdue(task);

  function deleteTask(task) {
    onDelete(task);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md ${
        task.status === "Completed" ? "opacity-80" : ""
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          {/* Complete button */}
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            aria-label={
              task.status === "Completed"
                ? `Mark ${task.title} as incomplete`
                : `Mark ${task.title} as complete`
            }
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
              task.status === "Completed"
                ? "border-primary bg-primary text-on-primary"
                : "border-outline-variant bg-transparent text-transparent hover:border-primary hover:text-primary"
            }`}
          >
            <Check size={14} strokeWidth={3} />
          </button>

          <div className="min-w-0">
            <h3
              className={`truncate text-base font-bold text-on-surface transition-all ${
                task.status === "Completed"
                  ? "text-on-surface-variant line-through"
                  : ""
              }`}
            >
              {task.title}
            </h3>

            <p
              className={`mt-1 line-clamp-2 text-sm leading-6 text-on-surface-variant ${
                task.status === "Completed" ? "line-through" : ""
              }`}
            >
              {task.description || "No description added."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1  ">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            <Edit3 size={15} />
          </button>

          <button
            type="button"
            onClick={() => {
              deleteTask(task);
            }}
            aria-label={`Delete ${task.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
          >
            <Trash2 size={15} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant"
            aria-label="More options"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${priority.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
          {task.priority} priority
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            statusStyles[task.status] || statusStyles.Pending
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/60 pt-4">
        <div
          className={`flex items-center gap-1.5 text-xs font-medium ${
            overdue ? "text-error" : "text-on-surface-variant"
          }`}
        >
          {overdue ? <Clock3 size={14} /> : <CalendarDays size={14} />}

          <span>
            {overdue ? "Overdue · " : "Due "}
            {formatDate(task.dueDate)}
          </span>
        </div>

        {task.category && (
          <span className="rounded-md bg-surface-container px-2 py-1 text-[11px] font-semibold text-on-surface-variant">
            {task.category}
          </span>
        )}
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-surface-container">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: task.status === "Completed" ? "100%" : "25%",
          }}
          transition={{ duration: 0.5 }}
          className="h-full bg-primary"
        />
      </div>
    </motion.article>
  );
}
