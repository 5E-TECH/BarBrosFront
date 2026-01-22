import { memo, useMemo, useState } from "react";
import useStatistic from "../service/useStatistic";
import StatCard from "./StatCard";
import PeriodFilter from "./PeriodFilter";
import BookingStatisticsChart from "./BookingStatisticsChart";
import RevenueAnalyticsChart from "./RevenueAnalyticsChart";

type Period = "daily" | "weekly" | "monthly";

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("monthly");

  const { getAdminSummary } = useStatistic();
  const { data: apiData, isLoading, error } = getAdminSummary;

  const periodStats = useMemo(() => {
    if (!apiData) return { revenue: 0, growth: 0 };

    const revenueSeries = apiData.revenue.series ?? [];
    const totalRevenue = apiData.revenue.total_amount ?? 0;

    if (selectedPeriod === "daily")
      return { revenue: Math.floor(totalRevenue / 90), growth: 5 };
    if (selectedPeriod === "weekly")
      return { revenue: Math.floor(totalRevenue / 13), growth: 8 };

    return {
      revenue: revenueSeries.length ? totalRevenue / revenueSeries.length : 0,
      growth:
        revenueSeries.length > 1
          ? Math.round(
              ((+revenueSeries.at(-1)!.total_amount -
                +revenueSeries.at(-2)!.total_amount) /
                +revenueSeries.at(-2)!.total_amount) *
                100,
            )
          : 0,
    };
  }, [apiData, selectedPeriod]);

  const filteredRevenueData = useMemo(
    () => apiData?.revenue.series ?? [],
    [apiData, selectedPeriod],
  );

  return (
    <div className="space-y-6 dark:text-white">
      {isLoading && <p>Loading statistics...</p>}
      {error && <p>Error loading statistics</p>}
      {!isLoading && !error && apiData && (
        <>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Statistics Dashboard
              </h1>
              <p className="text-maintext">
                Monitor your business metrics and performance
              </p>
            </div>
            <PeriodFilter
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              currency="UZS"
              title={`${selectedPeriod[0].toUpperCase() + selectedPeriod.slice(1)} Revenue`}
              value={periodStats.revenue}
              growth={periodStats.growth}
            />
            <StatCard
              title="Total Bookings"
              value={apiData.bookings.total}
              growth={12}
            />
            <StatCard
              title="Total Barbershops"
              value={apiData.totals.barbershops}
              growth={3}
            />
          </div>

          <BookingStatisticsChart data={apiData.bookings.by_status} />

          <RevenueAnalyticsChart
            data={filteredRevenueData}
            totalUsers={apiData.totals.users}
            totalBarbers={apiData.totals.barbers}
            totalRevenue={apiData.revenue.total_amount}
          />
        </>
      )}
    </div>
  );
};

export default memo(Statistics);
