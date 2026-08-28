import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChartCard({ data = [] }) {
  // Prevent crash if data hasn't loaded yet
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[320px] flex items-center justify-center bg-surface border border-outline-variant rounded-xl text-on-surface-variant">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-[320px]  bg-surface-container-lowest rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-outline-variant hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          {/* Change dataKey to match your dataset keys (e.g., 'value', 'students', 'score') */}
          <Bar
            dataKey="value"
            fill="#4f46e5"
            radius={[6, 6, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
