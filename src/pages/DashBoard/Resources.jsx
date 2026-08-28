import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Files,
  FileText,
  Heart,
  Layers3,
  Pin,
  Trash2,
  Search,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { notifications } from "@mantine/notifications";
import StatCard from "../../components/StateCard";
import { useMemo, useReducer, useState } from "react";
import reducer, { getInitialUserState } from "../../context/authReducer";
import ResourceCard from "../../components/ResourceCard";
import { useDisclosure } from "@mantine/hooks";
import DeletedModal from "../../components/DeletedModal";
import ResourceFormModal from "../../components/ResourceFormModal";

const types = ["All", "Video", "Pdf", "Website"];
export default function Resources() {
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [pinnedOnly, setPinnedOnly] = useState(false);

  const [opened, { open, close }] = useDisclosure(false); // control deletedModal
  const [modalOpen, setModalOpen] = useState(false);
  const [resource, setResource] = useState(null);

  const statistics = useMemo(() => {
    const total = userState.resources.length;

    const favourite = userState.resources.filter(
      (resource) => resource.favourite,
    ).length;

    const pinned = userState.resources.filter(
      (resource) => resource.pinned,
    ).length;

    const categoriesCount = new Set(
      userState.resources.map((resource) => resource.type),
    ).size;

    return {
      total,
      favourite,
      pinned,
      categoriesCount,
    };
  }, [userState]);

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = userState.resources.filter((resource) => {
      const matchesSearch =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.content.toLowerCase().includes(query) ||
        resource.type.toLowerCase().includes(query) ||
        resource.tags?.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        typeFilter === "All" || resource.type === typeFilter;

      const matchesFavorite = !favoritesOnly || resource.favourite;

      const matchesPinned = !pinnedOnly || resource.pinned;

      return (
        matchesSearch && matchesCategory && matchesFavorite && matchesPinned
      );
    });

    return [...result].sort((first, second) => {
      // Pinned userState.resources always appear first.
      if (first.pinned !== second.pinned) {
        return first.pinned ? -1 : 1;
      }

      // Then sort by updated date.
      return new Date(second.updatedAt) - new Date(first.updatedAt);
    });
  }, [userState, searchQuery, typeFilter, favoritesOnly, pinnedOnly]);
  function showNotification(message) {
    notifications.show({
      title: "Notification",
      message: message,
    });
  }

  function clearFilters() {
    setSearchQuery("");
    setTypeFilter("All");
    setFavoritesOnly(false);
    setPinnedOnly(false);
  }

  function openCreateModal() {
    setResource(null);
    setModalOpen(true);
  }

  function openEditModal(resource) {
    setResource(resource);
    setModalOpen(true);
  }

  function closeModal() {
    console.log("iam here");
    setModalOpen(false);
    setResource(null);
  }

  function handleResourceSubmit(formData) {
    if (resource) {
      dispatch({
        type: "updateResource",
        payload: { formData, id: resource.id },
      });
      showNotification("Resource has been updated successfully");
    } else {
      dispatch({ type: "addResource", payload: { formData } });
      showNotification("Resource has been added successfully");
    }

    closeModal();
  }
  function openDeletedModal(resource) {
    open();

    if (resource) {
      setResource(resource);
    } else {
      close();
    }
  }

  function handleDelete() {
    dispatch({ type: "deleteResource", payload: { id: resource.id } });
    close();
    showNotification("Resources has been deleted successfully");
  }

  function handleTogglePin(resourceId) {
    dispatch({ type: "onResourceTogglePin", payload: { id: resourceId } });
    showNotification("Resources has been changed pin status successfully");
  }

  function handleToggleFavorite(resourceId) {
    dispatch({ type: "onResourceToggleFavorite", payload: { id: resourceId } });
    showNotification(
      "Resources has been changed favourite status successfully",
    );
  }

  const hasActiveFilters =
    Boolean(searchQuery) || typeFilter !== "All" || favoritesOnly || pinnedOnly;

  return (
    <div className="notes-page min-h-[calc(100vh-4rem)] ">
      <div className="mx-auto max-w-375">
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
              <Files size={15} />
              Materials collection
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
              Your Resources
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant md:text-base">
              Manage and access your academic materials.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus size={18} />
            New Resource
          </button>
        </motion.div>
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Total Resources"
            value={statistics.total}
            description="Resources in your workspace"
            iconClassName="bg-primary-fixed text-primary"
          />

          <StatCard
            icon={Pin}
            label="Pinned"
            value={statistics.pinned}
            description="Important resources at the top"
            iconClassName="bg-[#fff0df] text-[#a45b17]"
          />

          <StatCard
            icon={Heart}
            label="Favorites"
            value={statistics.favourite}
            description="Resources you've saved"
            iconClassName="bg-[#ffe5ec] text-[#b34767]"
          />

          <StatCard
            icon={Layers3}
            label="Types"
            value={statistics.categoriesCount}
            description="Different resources types"
            iconClassName="bg-[#e8e7ff] text-[#514b91]"
          />
        </div>
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
                placeholder="Search resources..."
                className="h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest pl-10 pr-3 text-sm text-on-surface outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-on-surface-variant">
                  Category:
                </span>

                {types.map((type) => {
                  const active = typeFilter === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTypeFilter(type)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                        active
                          ? "bg-primary text-on-primary shadow-sm"
                          : "bg-surface-container text-on-surface-variant hover:bg-primary-fixed hover:text-primary"
                      }`}
                    >
                      {type}
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
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              {typeFilter === "All" ? "All Resources" : typeFilter}
            </h2>

            <p className="mt-1 text-xs text-on-surface-variant">
              Showing {filteredResources.length}{" "}
              {filteredResources.length === 1 ? "resource" : "resources"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Sparkles size={14} className="text-primary" />

            <span>
              {statistics.favourite} favourite
              {statistics.favourite === 1 ? "" : "s"} saved
            </span>
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          {filteredResources.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
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
                No resources found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-on-surface-variant">
                {hasActiveFilters
                  ? "Try changing your filters or searching for something else."
                  : "You don't have any resources yet. Create your first resource to get started."}
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
                  // onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-on-primary"
                >
                  <Plus size={16} />
                  Create Resource
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {modalOpen && (
        <ResourceFormModal
          resource={resource}
          onClose={closeModal}
          onSubmit={handleResourceSubmit}
        />
      )}
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
