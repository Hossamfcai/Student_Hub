import { motion } from "motion/react";
import { Plus, Files, FileText, Heart, Layers3, Pin } from "lucide-react";
import StatCard from "../../components/StateCard";
import { useMemo, useReducer } from "react";
import reducer, { getInitialUserState } from "../../context/authReducer";

export default function Resources() {
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

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
            label="Total Notes"
            value={5}
            description="Notes in your workspace"
            iconClassName="bg-primary-fixed text-primary"
          />

          <StatCard
            icon={Pin}
            label="Pinned"
            value={6}
            description="Important notes at the top"
            iconClassName="bg-[#fff0df] text-[#a45b17]"
          />

          <StatCard
            icon={Heart}
            label="Favorites"
            value={6}
            description="Notes you've saved"
            iconClassName="bg-[#ffe5ec] text-[#b34767]"
          />

          <StatCard
            icon={Layers3}
            label="Categories"
            value={4}
            description="Different note categories"
            iconClassName="bg-[#e8e7ff] text-[#514b91]"
          />
        </div>
      </div>
    </div>
  );
}
