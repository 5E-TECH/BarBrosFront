import { useMemo } from "react";
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
  pending: "#fbbf24",
  confirmed: "#60a5fa",
  completed: "#34d399",
  cancelled: "#f87171",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function BookingStatisticsChart({ data }: BookingStatisticsChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        name: "Bookings",
        pending: data?.pending ?? 0,
        confirmed: data?.confirmed ?? 0,
        completed: data?.completed ?? 0,
        cancelled: data?.cancelled ?? 0,
      },
    ];
  }, [data]);

  const totalBookings = useMemo(
    () =>
      (data?.pending ?? 0) +
      (data?.confirmed ?? 0) +
      (data?.completed ?? 0) +
      (data?.cancelled ?? 0),
    [data],
  );

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      dataKey: string;
    }>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[entry.dataKey] }}
            />
            <span className="text-sm font-medium text-card-foreground">
              {STATUS_LABELS[entry.dataKey]}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm dark:text-white">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">
          Booking Statistics
        </h3>
        <div className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
          Total: {totalBookings}
        </div>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Breakdown of bookings by status
      </p>

      <ResponsiveContainer width="100%" height={300} className="dark:text-white">
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          <Bar dataKey="pending" fill={STATUS_COLORS.pending} />
          <Bar dataKey="confirmed" fill={STATUS_COLORS.confirmed} />
          <Bar dataKey="completed" fill={STATUS_COLORS.completed} />
          <Bar dataKey="cancelled" fill={STATUS_COLORS.cancelled} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
