import { motion } from "motion/react";
export default function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClassName,
}) {
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
