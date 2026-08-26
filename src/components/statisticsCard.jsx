import { motion } from "motion/react";
export default function StatisticsCard({ info, id }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: id * 0.1 }}
      className="flex flex-col gap-5 w-[90%] col-span-1 bg-surface-container-lowest rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow"
    >
      <div className="flex gap-2 items-center ">
        <div
          className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center `}
        >
          {info.icon}
        </div>
        <span className="font-label-md text-label-md text-on-surface-variant">
          {info.title}
        </span>
      </div>

      <h2 className="font-display-lg text-display-lg font-bold ml-3 text-on-background">
        {info.result}
      </h2>
    </motion.div>
  );
}
