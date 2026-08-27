import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  FileText,
  Heart,
  Layers3,
  Pin,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

import NoteCard from "../../components/NoteCard";
import NoteFormModal from "../../components/NoteFormModal";
import { user } from "../../data/data";
import "./notes.css";

const STORAGE_KEY = "student-hub-notes";
const initialNotes = user.initialNotes;
// const initialNotes = [
//   {
//     id: uuidv4(),
//     title: "React Component Architecture",
//     content:
//       "Keep components small and reusable. Pages should handle page-level logic while shared UI belongs inside components. Avoid putting navigation components directly inside individual pages when the dashboard layout already provides them.",
//     category: "Lecture",
//     tags: ["react", "frontend", "architecture"],
//     color: "lavender",
//     pinned: true,
//     favorite: true,
//     updatedAt: "2026-08-25T18:30:00",
//   },
//   {
//     id: uuidv4(),
//     title: "Database Exam Revision",
//     content:
//       "Review normalization, primary and foreign keys, joins, indexes, transactions, ACID properties, and SQL aggregation functions. Practice writing queries without relying on examples.",
//     category: "Study",
//     tags: ["database", "sql", "exam"],
//     color: "cream",
//     pinned: true,
//     favorite: false,
//     updatedAt: "2026-08-24T14:20:00",
//   },
//   {
//     id: uuidv4(),
//     title: "Graduation Project Ideas",
//     content:
//       "Prepare the presentation structure: problem → solution → architecture → technologies → AI pipeline → results → future work. Keep the explanation simple and focus on the real impact of the project.",
//     category: "Project",
//     tags: ["project", "presentation"],
//     color: "green",
//     pinned: false,
//     favorite: true,
//     updatedAt: "2026-08-22T20:10:00",
//   },
//   {
//     id: uuidv4(),
//     title: "Things to Remember",
//     content:
//       "Keep Git commits meaningful. Test before pushing. Document important decisions. When working with teammates, communicate changes before modifying shared files.",
//     category: "Personal",
//     tags: ["reminders", "productivity"],
//     color: "blue",
//     pinned: false,
//     favorite: false,
//     updatedAt: "2026-08-20T11:45:00",
//   },
//   {
//     id: uuidv4(),
//     title: "JavaScript Concepts",
//     content:
//       "Review closures, promises, async/await, event loop, map/filter/reduce, destructuring, spread syntax, and modules. Practice explaining each concept instead of memorizing definitions.",
//     category: "Study",
//     tags: ["javascript", "frontend"],
//     color: "default",
//     pinned: false,
//     favorite: true,
//     updatedAt: "2026-08-18T16:30:00",
//   },
// ];

const categories = ["All", "Lecture", "Study", "Project", "Personal"];

function getStoredNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) {
      return initialNotes;
    }

    const parsedNotes = JSON.parse(savedNotes);

    return Array.isArray(parsedNotes) ? parsedNotes : initialNotes;
  } catch {
    return initialNotes;
  }
}

function StatCard({ icon: Icon, label, value, description, iconClassName }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
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

export default function Notes() {
  const [notes, setNotes] = useState(getStoredNotes);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [pinnedOnly, setPinnedOnly] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const statistics = useMemo(() => {
    const total = notes.length;

    const favorites = notes.filter((note) => note.favorite).length;

    const pinned = notes.filter((note) => note.pinned).length;

    const categoriesCount = new Set(notes.map((note) => note.category)).size;

    return {
      total,
      favorites,
      pinned,
      categoriesCount,
    };
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = notes.filter((note) => {
      const matchesSearch =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query) ||
        note.tags?.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        categoryFilter === "All" || note.category === categoryFilter;

      const matchesFavorite = !favoritesOnly || note.favorite;

      const matchesPinned = !pinnedOnly || note.pinned;

      return (
        matchesSearch && matchesCategory && matchesFavorite && matchesPinned
      );
    });

    return [...result].sort((first, second) => {
      // Pinned notes always appear first.
      if (first.pinned !== second.pinned) {
        return first.pinned ? -1 : 1;
      }

      // Then sort by updated date.
      return new Date(second.updatedAt) - new Date(first.updatedAt);
    });
  }, [notes, searchQuery, categoryFilter, favoritesOnly, pinnedOnly]);

  function openCreateModal() {
    setEditingNote(null);
    setModalOpen(true);
  }

  function openEditModal(note) {
    setEditingNote(note);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingNote(null);
  }

  function handleNoteSubmit(formData) {
    const now = new Date().toISOString();

    if (editingNote) {
      setNotes((previous) =>
        previous.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...formData,
                updatedAt: now,
              }
            : note,
        ),
      );
    } else {
      const newNote = {
        id: Date.now(),
        ...formData,
        updatedAt: now,
      };

      setNotes((previous) => [newNote, ...previous]);
    }

    closeModal();
  }

  function handleDelete(noteId) {
    const note = notes.find((item) => item.id === noteId);

    if (!note) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete "${note.title}"? This action cannot be undone.`,
    );

    if (!shouldDelete) {
      return;
    }

    setNotes((previous) => previous.filter((item) => item.id !== noteId));
  }

  function handleTogglePin(noteId) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === noteId
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  }

  function handleToggleFavorite(noteId) {
    setNotes((previous) =>
      previous.map((note) =>
        note.id === noteId
          ? {
              ...note,
              favorite: !note.favorite,
            }
          : note,
      ),
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setCategoryFilter("All");
    setFavoritesOnly(false);
    setPinnedOnly(false);
  }

  const hasActiveFilters =
    Boolean(searchQuery) ||
    categoryFilter !== "All" ||
    favoritesOnly ||
    pinnedOnly;

  return (
    <div className="notes-page min-h-[calc(100vh-4rem)] ">
      <div className="mx-auto max-w-[1500px]">
        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              <BookOpen size={15} />
              Knowledge Space
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
              Your Notes
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant md:text-base">
              Capture lectures, study material, project ideas, and everything
              you want to remember in one organized space.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus size={18} />
            New Note
          </button>
        </motion.div>

        {/* =====================================================
            STATISTICS
            ===================================================== */}

        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Total Notes"
            value={statistics.total}
            description="Notes in your workspace"
            iconClassName="bg-primary-fixed text-primary"
          />

          <StatCard
            icon={Pin}
            label="Pinned"
            value={statistics.pinned}
            description="Important notes at the top"
            iconClassName="bg-[#fff0df] text-[#a45b17]"
          />

          <StatCard
            icon={Heart}
            label="Favorites"
            value={statistics.favorites}
            description="Notes you've saved"
            iconClassName="bg-[#ffe5ec] text-[#b34767]"
          />

          <StatCard
            icon={Layers3}
            label="Categories"
            value={statistics.categoriesCount}
            description="Different note categories"
            iconClassName="bg-[#e8e7ff] text-[#514b91]"
          />
        </div>

        {/* =====================================================
            SEARCH + FILTERS
            ===================================================== */}

        <div className="mb-7 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-outline"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search notes, tags, or content..."
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest pl-10 pr-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-on-surface-variant">
                  Category:
                </span>

                {categories.map((category) => {
                  const active = categoryFilter === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setCategoryFilter(category)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        active
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container text-on-surface-variant hover:bg-primary-fixed hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPinnedOnly((previous) => !previous)}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                    pinnedOnly
                      ? "bg-primary-fixed text-primary"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <Pin size={13} fill={pinnedOnly ? "currentColor" : "none"} />
                  Pinned
                </button>

                <button
                  type="button"
                  onClick={() => setFavoritesOnly((previous) => !previous)}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
                    favoritesOnly
                      ? "bg-primary-fixed text-primary"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <Heart
                    size={13}
                    fill={favoritesOnly ? "currentColor" : "none"}
                  />
                  Favorites
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary-fixed"
                  >
                    <Trash2 size={13} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            NOTES HEADER
            ===================================================== */}

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              {categoryFilter === "All" ? "All Notes" : categoryFilter}
            </h2>

            <p className="mt-1 text-xs text-on-surface-variant">
              Showing {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Sparkles size={14} className="text-primary" />

            <span>
              {statistics.favorites} favorite
              {statistics.favorites === 1 ? "" : "s"} saved
            </span>
          </div>
        </div>

        {/* =====================================================
            NOTES GRID
            ===================================================== */}

        <AnimatePresence mode="popLayout">
          {filteredNotes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-16 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                <BookOpen size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-on-surface">
                No notes found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-on-surface-variant">
                {hasActiveFilters
                  ? "Try changing your filters or searching for something else."
                  : "You don't have any notes yet. Create your first note to get started."}
              </p>

              {hasActiveFilters ? (
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
                  Create Note
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          ADD / EDIT NOTE MODAL
          ===================================================== */}

      <NoteFormModal
        opened={modalOpen}
        note={editingNote}
        onClose={closeModal}
        onSubmit={handleNoteSubmit}
      />
    </div>
  );
}
