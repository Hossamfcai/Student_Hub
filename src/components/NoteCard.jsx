import { motion } from "motion/react";
import { Edit3, Heart, MoreHorizontal, Pin, Trash2 } from "lucide-react";

const categoryStyles = {
  Lecture: {
    badge: "bg-primary-fixed text-on-primary-fixed-variant",
    dot: "bg-primary",
  },
  Study: {
    badge: "bg-[#e8e7ff] text-[#514b91]",
    dot: "bg-[#6b63c5]",
  },
  Project: {
    badge: "bg-[#e3f7ec] text-[#23784f]",
    dot: "bg-[#2d9562]",
  },
  Personal: {
    badge: "bg-[#fff0df] text-[#a45b17]",
    dot: "bg-[#d17b29]",
  },
};

const noteColors = {
  default: "bg-surface-container-lowest",
  lavender: "bg-[#f4f2ff]",
  cream: "bg-[#fffaf0]",
  green: "bg-[#f1faf5]",
  blue: "bg-[#f2f7ff]",
};

function formatDate(dateString) {
  if (!dateString) {
    return "Recently";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();

  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleFavorite,
}) {
  function deleteNoteCard(note) {
    console.log("done");
    onDelete(note);
  }
  const category = categoryStyles[note.category] || categoryStyles.Personal;

  const background =
    note.color && noteColors[note.color]
      ? noteColors[note.color]
      : noteColors.default;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-outline-variant p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg ${background}`}
    >
      {/* Top accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-primary/70" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${category.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${category.dot}`} />

              {note.category}
            </span>

            {note.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-2 py-1 text-[11px] font-semibold text-on-surface-variant">
                <Pin size={10} fill="currentColor" />
                Pinned
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 text-lg font-bold leading-6 text-on-surface">
            {note.title}
          </h3>
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={() => onToggleFavorite(note.id)}
          aria-label={
            note.favorite
              ? `Remove ${note.title} from favorites`
              : `Add ${note.title} to favorites`
          }
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            note.favorite
              ? "bg-primary-fixed text-primary"
              : "text-outline hover:bg-surface-container-high hover:text-primary"
          }`}
        >
          <Heart size={17} fill={note.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Content preview */}
      <p className="mt-4 line-clamp-5 text-sm leading-6 text-on-surface-variant">
        {note.content || "This note is empty."}
      </p>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-container-lowest/70 px-2 py-1 text-[10px] font-semibold text-on-surface-variant"
            >
              #{tag}
            </span>
          ))}

          {note.tags.length > 3 && (
            <span className="px-1 py-1 text-[10px] font-semibold text-outline">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-outline-variant/60 pt-4">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span>{formatDate(note.updatedAt)}</span>

          <span className="h-1 w-1 rounded-full bg-outline" />

          <span>{note.content?.length || 0} chars</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            aria-label={note.pinned ? "Unpin note" : "Pin note"}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              note.pinned
                ? "bg-primary-fixed text-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
            }`}
          >
            <Pin size={14} fill={note.pinned ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            onClick={() => onEdit(note)}
            aria-label={`Edit ${note.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
          >
            <Edit3 size={14} />
          </button>

          <button
            type="button"
            onClick={() => {
              deleteNoteCard(note);
            }}
            aria-label={`Delete ${note.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
          >
            <Trash2 size={14} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant"
            aria-label="More options"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
