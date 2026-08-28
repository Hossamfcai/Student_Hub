import { useMemo, useReducer, useState } from "react";
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
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import NoteCard from "../../components/NoteCard";
import NoteFormModal from "../../components/NoteFormModal";
import "../../styles/notes.css";
import reducer, { getInitialUserState } from "../../context/authReducer";
import DeletedModal from "../../components/DeletedModal";
import StatCard from "../../components/StateCard";

const categories = ["All", "Lecture", "Study", "Project", "Personal"];

export default function Notes() {
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [pinnedOnly, setPinnedOnly] = useState(false);

  const [opened, { open, close }] = useDisclosure(false); // control deletedModal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const statistics = useMemo(() => {
    const total = userState.initialNotes.length;

    const favorites = userState.initialNotes.filter(
      (note) => note.favorite,
    ).length;

    const pinned = userState.initialNotes.filter((note) => note.pinned).length;

    const categoriesCount = new Set(
      userState.initialNotes.map((note) => note.category),
    ).size;

    return {
      total,
      favorites,
      pinned,
      categoriesCount,
    };
  }, [userState]);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = userState.initialNotes.filter((note) => {
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
      // Pinned userState.initialNotes always appear first.
      if (first.pinned !== second.pinned) {
        return first.pinned ? -1 : 1;
      }

      // Then sort by updated date.
      return new Date(second.updatedAt) - new Date(first.updatedAt);
    });
  }, [userState, searchQuery, categoryFilter, favoritesOnly, pinnedOnly]);

  function showNotification(message) {
    notifications.show({
      title: "Notification",
      message: message,
    });
  }

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
      dispatch({
        type: "updateNote",
        payload: { formData, updatedAt: now, id: editingNote.id },
      });
      showNotification("Note has been updated successfully");
    } else {
      dispatch({ type: "addNote", payload: { formData, updatedAt: now } });
      showNotification("Note has been added successfully");
    }

    closeModal();
  }
  function openDeletedModal(note) {
    open();

    if (note) {
      setEditingNote(note);
    } else {
      close();
    }
  }

  function handleDelete() {
    dispatch({ type: "deleteNote", payload: { id: editingNote.id } });
    showNotification("Note has been deleted successfully");
    close();
  }

  function handleTogglePin(noteId) {
    dispatch({ type: "onTogglePin", payload: { id: noteId } });
    showNotification("Note has been changed pin status successfully");
  }

  function handleToggleFavorite(noteId) {
    dispatch({ type: "onToggleFavorite", payload: { id: noteId } });
    showNotification("Note has been changed favourite status  successfully");
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
                  onDelete={openDeletedModal}
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
