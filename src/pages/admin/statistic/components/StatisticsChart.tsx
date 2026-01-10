import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";

const data = [
  { name: "Mon", income: 250, expense: 100 },
  { name: "Tue", income: 300, expense: 150 },
  { name: "Wed", income: 400, expense: 200 },
  { name: "Thu", income: 280, expense: 120 },
  { name: "Fri", income: 380, expense: 170 },
  { name: "Sat", income: 350, expense: 160 },
  { name: "Sun", income: 230, expense: 90 },
];

const StatisticsChart = () => {
  return (
    <div className="h-full bg-white shadow-sm rounded-xl p-5 w-full dark:bg-[#191a1f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-maintext font-semibold">Statistics</h2>

        <button className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm text-maintext">
          <Calendar size={18} />
          <span>19 Aug – 25 Aug</span>
        </button>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={35}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="income" fill="#FF8A00" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 justify-center mt-4 text-sm text-helpertext">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          <span>Income</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-300"></span>
          <span>Expense</span>
        </div>
      </div>
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-3 rounded-xl border text-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <p className="font-semibold">{payload[0].value}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
          <p className="font-semibold">{payload[0].value / 2}</p>
        </div>

        <p className="text-gray-400 mt-1">
          23 August, 2020
        </p>
      </div>
    );
  }
  return null;
};

export default StatisticsChart;
