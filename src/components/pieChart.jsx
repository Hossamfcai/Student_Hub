import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8B5CF6", "#F59E0B", "#3525cd"];

export default function PieChartCard({ data = [] }) {
  // Prevent crash if data hasn't loaded yet
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center bg-surface border border-outline-variant rounded-xl text-on-surface-variant">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-[320px] bg-surface-container-lowest rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow flex flex-col items-center">
      <ResponsiveContainer width="90%" height="90%" minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55} // Creating the inner donut hole
            outerRadius={80}
            paddingAngle={4} // Adds a clean gap between segments
            dataKey="value"
            label={({ name }) => `${name}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
