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
    <div className="h-full bg-white shadow-sm rounded-xl p-4 md:p-5 w-full dark:bg-[#191a1f] dark:border-gray-800">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h2 className="text-xl text-maintext dark:text-white font-semibold">
          Statistics
        </h2>

        <button className="flex items-center gap-2 border dark:border-gray-700 rounded-lg px-2 py-1 md:px-3 text-[12px] md:text-sm text-maintext dark:text-gray-300">
          <Calendar size={16} className="md:w-[18px]" />
          <span>19 Aug – 25 Aug</span>
        </button>
      </div>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={window.innerWidth < 640 ? 20 : 35}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 16, fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#9ca3af" }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />
            <Bar dataKey="income" fill="#FF8A00" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 md:gap-6 justify-center mt-6 text-[12px] md:text-sm text-helpertext">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="dark:text-gray-400">Income</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-300"></span>
          <span className="dark:text-gray-400">Expense</span>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#24252d] shadow-md p-3 rounded-xl border dark:border-gray-700 text-sm">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          <p className="font-semibold dark:text-white">{payload[0].value}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
          <p className="font-semibold dark:text-white">
            {payload[0].value / 2}
          </p>
        </div>

        <p className="text-gray-400 text-[10px] mt-1">23 August, 2020</p>
      </div>
    );
  }
  return null;
};

export default StatisticsChart;
