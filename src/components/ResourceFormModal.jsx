import { X, Files } from "lucide-react";
import { TagsInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

// const emptyNote = {
//   title: "",
//   content: "",
//   category: "Lecture",
//   tags: "",
//   color: "default",
//   pinned: false,
//   favorite: false,
// };

export default function ResourceFormModal({ resource, onClose, onSubmit }) {
  const editing = Boolean(resource);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      link: resource?.link || "",
      title: resource?.title || "",
      type: resource?.type || "Video", // Provided default fallback
      imageUrl: resource?.imageUrl || "",
      content: resource?.content || "",
      tags: resource?.tags ? [...resource.tags] : [],
      pinned: Boolean(resource?.pinned),
      favourite: Boolean(resource?.favourite),
    },
    // Validation rules
    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      link: (value) =>
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
          ? null
          : "Invalid URL",
      type: (value) => (value ? null : "Resource type is required"),
      content: (value) =>
        value.trim().length >= 10
          ? null
          : "Content must be at least 10 characters long",
    },
  });
  useEffect(() => {
    if (resource) {
      form.setValues({
        link: resource.link || "",
        title: resource.title || "",
        type: resource.type || "Website",
        imageUrl: resource.imageUrl || "",
        content: resource.content || "",
        tags: resource.tags ? [...resource.tags] : [],
        pinned: Boolean(resource.pinned),
        favourite: Boolean(resource.favourite),
      });
    } else {
      form.reset();
    }
  }, [resource]);
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
              <Files size={14} />
              Resources
            </div>

            <h2 className="text-xl font-bold text-on-surface">
              {editing ? "Edit Resource" : "Create New Resource"}
            </h2>

            <p className="mt-1 text-sm text-on-surface-variant">
              {editing
                ? "Update your resource and keep your materials organized."
                : "Capture an video, pdf, website, or anything worth to keep it."}
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
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit(values);
            form.reset();
          })}
          className="space-y-5 p-6"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="resource-title"
              className="mb-2 block text-sm font-semibold text-on-surface"
            >
              Resource title
            </label>

            <input
              id="resource-title"
              name="title"
              placeholder="e.g. React Component Architecture"
              autoFocus
              key={form.key("title")}
              {...form.getInputProps("title")}
              className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {form.errors.title && (
              <p className="mt-1 text-xs text-red-500">{form.errors.title}</p>
            )}
          </div>
          {/* link */}
          <div>
            <label
              htmlFor="link-title"
              className="mb-2 block text-sm font-semibold text-on-surface"
            >
              Resource link
            </label>

            <input
              id="link-title"
              name="link"
              placeholder="e.g. https://www.w3schools.com/"
              autoFocus
              className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              key={form.key("link")}
              {...form.getInputProps("link")}
            />
            {form.errors.link && (
              <p className="mt-1 text-xs text-red-500">{form.errors.link}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="resource-content"
                className="block text-sm font-semibold text-on-surface"
              >
                Content
              </label>

              <span className="text-xs text-outline"></span>
            </div>

            <textarea
              id="resource-content"
              name="content"
              placeholder="Write your resource description here..."
              rows={8}
              className="w-full resize-y rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-3 text-sm leading-6 text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              key={form.key("content")}
              {...form.getInputProps("content")}
            />
            {form.errors.content && (
              <p className="mt-1 text-xs text-red-500">{form.errors.content}</p>
            )}
          </div>

          {/* typs + tags */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="resource-type"
                className="mb-2 block text-sm font-semibold text-on-surface"
              >
                Type
              </label>

              <select
                id="resource-type"
                name="type"
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                key={form.key("type")}
                {...form.getInputProps("type")}
              >
                <option value="Video">Video</option>
                <option value="Pdf">Pdf</option>
                <option value="Website">Website</option>
              </select>
            </div>

            <div>
              <TagsInput
                classNames={{
                  label: "text-sm font-semibold text-on-surface mb-1",
                  input:
                    "h-11 w-full flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm text-on-surface transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10",
                  pill: "bg-primary/10 text-primary font-medium rounded-md",
                }}
                label="Press Enter to submit a tag"
                placeholder="Enter tag"
                key={form.key("tags")}
                {...form.getInputProps("tags")}
              />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-outline-variant p-3 transition-colors hover:bg-surface-container">
              <input
                type="checkbox"
                name="pinned"
                className="h-4 w-4 accent-[var(--md-sys-color-primary)]"
                key={form.key("pinned")}
                {...form.getInputProps("pinned", { type: "checkbox" })}
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
                className="h-4 w-4 accent-[var(--md-sys-color-primary)]"
                key={form.key("favourite")}
                {...form.getInputProps("favourite", { type: "checkbox" })}
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
              {editing ? "Save Changes" : "Create Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
