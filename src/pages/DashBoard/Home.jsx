import BarChartCard from "../../components/barChart";
import PieChartCard from "../../components/pieChart";
import StatisticsCard from "../../components/statisticsCard";
import { statisticsData, chartData } from "../../data/data";
import { motion } from "motion/react";
// import { user } from "../../data/data";
// import { useEffect } from "react";

export default function Home() {
  const statisticsCards = [...statisticsData];

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
      className="flex flex-col"
    >
      <header className="my-3">
        <h2 className="font-headline-lg font-bold text-headline-lg text-on-background mb-2">
          Welcome back, Alex
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Here's an overview of your academic progress today.
        </p>
      </header>
      <section className="flex flex-col">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statisticsCards.map((card, i) => {
            return <StatisticsCard key={i} info={card} id={i + 1} />;
          })}
        </div>
        <div className="grid grid-cols-1 gap-y-6 gap-x-2  lg:grid-cols-3 justify-items-center my-6">
          {/* Chart takes up 2 out of 3 columns on desktop */}
          <div className="lg:col-span-2 w-full">
            <PieChartCard data={chartData} />
          </div>

          {/* Reserved space for another card or widget */}
          <div className="lg:col-span-1 w-full">
            <BarChartCard data={chartData} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
