import { motion } from "motion/react";
import { useReducer } from "react";
import reducer, { getInitialUserState } from "../context/authReducer";
export default function StatisticsCard({ info, id }) {
  const [userState] = useReducer(reducer, null, getInitialUserState);
  const totalTasks = userState.initialTasks.length;
  const totalNotes = userState.initialNotes.length;
  const totalResources = userState.initialNotes.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: id * 0.1 }}
      className="flex flex-col gap-5 w-full col-span-1 bg-surface-container-lowest rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow"
    >
      <div className="flex gap-5 items-center ">
        <div
          className={`w-16 h-16 rounded-2xl  bg-primary/10 text-primary flex items-center justify-center `}
        >
          {info.icon}
        </div>
        <div className="flex flex-col">
          {" "}
          <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
            {info.title}
          </span>
          <h2 className="font-display-lg text-display-lg font-bold text-on-background">
            {info.title == "Total Tasks" && totalTasks}
            {info.title == "Total Notes" && totalNotes}
            {info.title == "Total Resources" && totalResources}
          </h2>
        </div>
      </div>
    </motion.div>
  );
}
