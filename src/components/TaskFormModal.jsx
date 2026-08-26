import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyTask = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium",
  category: "Study",
  status: "Pending",
};

export default function TaskFormModal({
  opened,
  task,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyTask);

  const editing = Boolean(task);

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        priority: task.priority || "Medium",
        category: task.category || "Study",
        status: task.status || "Pending",
      });
    } else {
      setForm(emptyTask);
    }
  }, [task, opened]);

  if (!opened) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15132a]/45 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-on-surface">
              {editing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-on-surface-variant">
              {editing
                ? "Update the details of your task."
                : "Add a task to keep your academic work organized."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-semibold text-on-surface"
            >
              Task title
            </label>

            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Complete database assignment"
              autoFocus
              className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-semibold text-on-surface"
            >
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a short description..."
              rows={3}
              className="w-full resize-none rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Due date */}
            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Due date
              </label>

              <input
                id="task-due-date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Priority
              </label>

              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="task-category"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Category
              </label>

              <select
                id="task-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="Study">Study</option>
                <option value="Assignment">Assignment</option>
                <option value="Project">Project</option>
                <option value="Exam">Exam</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="task-status"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Status
              </label>

              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-outline-variant pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-lg border border-outline-variant px-5 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-11 rounded-lg bg-primary px-6 text-sm font-bold text-on-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {editing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}