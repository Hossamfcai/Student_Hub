import { useEffect, useState } from "react";
import { Palette, X } from "lucide-react";

const emptyNote = {
  title: "",
  content: "",
  category: "Lecture",
  tags: "",
  color: "default",
  pinned: false,
  favorite: false,
};

const colorOptions = [
  {
    value: "default",
    label: "Default",
    className: "bg-surface-container-high",
  },
  {
    value: "lavender",
    label: "Lavender",
    className: "bg-[#dcd8ff]",
  },
  {
    value: "cream",
    label: "Cream",
    className: "bg-[#ffe8bd]",
  },
  {
    value: "green",
    label: "Green",
    className: "bg-[#ccefdc]",
  },
  {
    value: "blue",
    label: "Blue",
    className: "bg-[#d9eaff]",
  },
];

export default function NoteFormModal({
  opened,
  note,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyNote);

  const editing = Boolean(note);

  useEffect(() => {
    if (note) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: note.title || "",
        content: note.content || "",
        category: note.category || "Lecture",
        tags: Array.isArray(note.tags)
          ? note.tags.join(", ")
          : note.tags || "",
        color: note.color || "default",
        pinned: Boolean(note.pinned),
        favorite: Boolean(note.favorite),
      });
    } else {
      setForm(emptyNote);
    }
  }, [note, opened]);

  if (!opened) {
    return null;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleColorChange(color) {
    setForm((previous) => ({
      ...previous,
      color,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter(Boolean);

    onSubmit({
      ...form,
      title: form.title.trim(),
      content: form.content.trim(),
      tags,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15132a]/45 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 py-5">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              <Palette size={14} />

              Notes
            </div>

            <h2 className="text-xl font-bold text-on-surface">
              {editing ? "Edit Note" : "Create New Note"}
            </h2>

            <p className="mt-1 text-sm text-on-surface-variant">
              {editing
                ? "Update your note and keep your ideas organized."
                : "Capture an idea, lecture, reminder, or anything worth remembering."}
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
              htmlFor="note-title"
              className="mb-2 block text-sm font-semibold text-on-surface"
            >
              Note title
            </label>

            <input
              id="note-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. React Component Architecture"
              autoFocus
              className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="note-content"
                className="block text-sm font-semibold text-on-surface"
              >
                Content
              </label>

              <span className="text-xs text-outline">
                {form.content.length} characters
              </span>
            </div>

            <textarea
              id="note-content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your note here..."
              rows={8}
              className="w-full resize-y rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-3 text-sm leading-6 text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Category + tags */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="note-category"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Category
              </label>

              <select
                id="note-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="Lecture">Lecture</option>
                <option value="Study">Study</option>
                <option value="Project">Project</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="note-tags"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Tags
              </label>

              <input
                id="note-tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="react, frontend, exam"
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <p className="mt-1 text-[11px] text-outline">
                Separate tags with commas.
              </p>
            </div>
          </div>

          {/* Color */}
          <div>
            <span className="mb-3 block text-sm font-semibold text-on-surface">
              Note color
            </span>

            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => {
                const selected = form.color === color.value;

                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorChange(color.value)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
                      selected
                        ? "border-primary ring-2 ring-primary/10"
                        : "border-outline-variant hover:border-primary/40"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full ${color.className}`}
                    />

                    {color.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-outline-variant p-3 transition-colors hover:bg-surface-container">
              <input
                type="checkbox"
                name="pinned"
                checked={form.pinned}
                onChange={handleChange}
                className="h-4 w-4 accent-[var(--md-sys-color-primary)]"
              />

              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Pin this note
                </p>

                <p className="text-xs text-on-surface-variant">
                  Keep it at the top of your notes.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-outline-variant p-3 transition-colors hover:bg-surface-container">
              <input
                type="checkbox"
                name="favorite"
                checked={form.favorite}
                onChange={handleChange}
                className="h-4 w-4 accent-[var(--md-sys-color-primary)]"
              />

              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Add to favorites
                </p>

                <p className="text-xs text-on-surface-variant">
                  Quickly find this note later.
                </p>
              </div>
            </label>
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
              {editing ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}