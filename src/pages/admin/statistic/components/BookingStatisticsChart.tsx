import { memo, useMemo, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BookingStats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface BookingStatisticsChartProps {
  data: BookingStats;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#fa8b00",
  confirmed: "#155dfc",
  completed: "#00c950",
  cancelled: "#e7000b",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const BookingStatisticsChart = ({ data }: BookingStatisticsChartProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const chartData = useMemo(() => {
    return Object.keys(data).map((key) => ({
      status: STATUS_LABELS[key],
      value: data[key as keyof BookingStats],
      fill: STATUS_COLORS[key],
    }));
  }, [data]);

  const totalBookings = useMemo(
    () => Object.values(data).reduce((sum, val) => sum + val, 0),
    [data]
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="rounded-lgr bg-card p-3 shadow-lg text-white">
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            />
            <span className="text-md font-medium text-card-foreground">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-white dark:bg-[#191a1f] border border-[#e9e9e9] bg-card p-6 shadow-sm dark:text-white dark:border-[#1f222b]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-card-foreground">
          Booking Statistics
        </h3>
        <div className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
          Total: {totalBookings}
        </div>
      </div>
      <p className="mb-6 text-sm text-maintext">
        Breakdown of bookings by status
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis type="number" stroke="var(--color-muted-foreground)" />
          <YAxis
            type="category"
            dataKey="status"
            stroke="var(--color-muted-foreground)"
            tick={{ fill: isDark ? "#8A9099" : "#000000", fontSize: 14 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Legend wrapperStyle={{ paddingTop: 10 }} />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(BookingStatisticsChart);