import { memo, useMemo } from "react";
import {
  AreaChart,
  Area,
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
          ? parseInt(item.total_amount, 10)
          : item.total_amount,
    }));
  }, [data]);

  const formattedTotalRevenue = new Intl.NumberFormat("en-US", {
    currency: "UZS",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
    }>;
  }) => {
    if (!active || !payload || payload.length === 0) return null;

    const value = payload[0].value ?? 0;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "UZS",
      maximumFractionDigits: 0,
    }).format(value);

    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">{formatted}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 dark:text-white">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-card p-4 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
          <p className="text-sm font-medium text-muted-foreground">
            Total Users
          </p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">
            {totalUsers?.toLocaleString() ?? 0}
          </p>
        </div>
        <div className="rounded-lg bg-white dark:bg-[#191a1f] border border-[#e9e9e9] bg-card p-4 shadow-sm dark:border-[#1f222b]">
          <p className="text-sm font-medium text-muted-foreground">
            Total Barbers
          </p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">
            {totalBarbers?.toLocaleString() ?? 0}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-white dark:bg-[#191a1f] border border-[#e9e9e9] bg-card p-6 shadow-sm dark:border-[#1f222b]">
        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
          Revenue Analytics
        </h3>
        <p className="mb-6 text-sm text-maintext">
          Monthly revenue trend over time
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--color-primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg bg-card p-6 shadow-sm bg-white dark:bg-[#191a1f] border border-[#e9e9e9] dark:border-[#1f222b]">
        <p className="text-sm font-medium text-muted-foreground">
          Total Revenue (UZS)
        </p>
        <p className="mt-2 text-3xl font-bold text-card-foreground">
          {formattedTotalRevenue}
        </p>
      </div>
    </div>
  );
}

export default memo(RevenueAnalyticsChart);