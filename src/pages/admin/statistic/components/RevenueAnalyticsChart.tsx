import { memo, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueSeries {
  label: string;
  total_amount: string | number;
}

interface RevenueAnalyticsChartProps {
  data: RevenueSeries[];
  totalUsers: number;
  totalBarbers: number;
  totalRevenue: number;
}

const RevenueAnalyticsChart = ({
  data,
  totalUsers,
  totalBarbers,
  totalRevenue,
}: RevenueAnalyticsChartProps) => {
  const chartData = useMemo(() => {
    return (data ?? []).map((item) => ({
      month: item.label,
      amount:
        typeof item.total_amount === "string"
          ? parseInt(item.total_amount, 10) || 0
          : item.total_amount ?? 0,
    }));
  }, [data]);

  const formattedTotalRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits: 0,
    currency: "UZS",
  }).format(totalRevenue);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;

    const value = payload[0].value ?? 0;
    const formatted = new Intl.NumberFormat("en-US", {
      currency: "UZS",
      maximumFractionDigits: 0,
      style: "currency",
    }).format(value);

    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">{formatted}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 dark:text-white">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-card p-4 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
          <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">
            {totalUsers?.toLocaleString() ?? 0}
          </p>
        </div>
        <div className="rounded-lg bg-card p-4 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
          <p className="text-sm font-medium text-muted-foreground">Total Barbers</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">
            {totalBarbers?.toLocaleString() ?? 0}
          </p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="rounded-lg bg-card p-6 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
          Revenue Analytics
        </h3>
        <p className="mb-6 text-sm text-maintext">Monthly revenue trend over time</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 14 }} />
            <YAxis
              tick={{ fontSize: 14 }}
              domain={[0, "dataMax + 1000"]}
              className="font-medium text-white"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="amount"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total revenue */}
      <div className="rounded-lg bg-card p-6 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
        <p className="text-sm font-medium text-muted-foreground">Total Revenue (UZS)</p>
        <p className="mt-2 text-3xl font-bold text-card-foreground">{formattedTotalRevenue}</p>
      </div>
    </div>
  );
};

export default memo(RevenueAnalyticsChart);
