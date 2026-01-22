
import  { useMemo, useState } from 'react';
import { StatCard } from './StatCard';
import { BookingStatisticsChart } from './BookingStatisticsChart';
import { PeriodFilter } from './PeriodFilter';
import { RevenueAnalyticsChart } from './RevebueAnalyticsChart';

interface ApiResponse {
  totals: {
    users: number;
    barbershops: number;
    barbers: number;
  };
  bookings: {
    total: number;
    by_status: {
      pending: number;
      confirmed: number;
      completed: number;
      cancelled: number;
    };
  };
  revenue: {
    total_amount: number;
    series: Array<{
      label: string;
      total_amount: string | number;
    }>;
  };
}

type Period = 'daily' | 'weekly' | 'monthly';

interface StatisticsProps {
  apiData: ApiResponse;
}

export function Statistics({ apiData }: StatisticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('monthly');

  // Calculate period-based statistics
  const periodStats = useMemo(() => {
    const revenueSeries = apiData?.revenue?.series ?? [];
    const totalRevenue = apiData?.revenue?.total_amount ?? 0;

    if (selectedPeriod === 'daily') {
      // Mock daily calculations (divide by days in period)
      return {
        revenue: Math.floor(totalRevenue / 90), // Assume 3-month period
        growth: 5,
      };
    }

    if (selectedPeriod === 'weekly') {
      // Mock weekly calculations
      return {
        revenue: Math.floor(totalRevenue / 13), // Assume 13 weeks
        growth: 8,
      };
    }

    // Monthly (default)
    return {
      revenue: totalRevenue / revenueSeries.length,
      growth: revenueSeries.length > 1
        ? Math.round(
            (((revenueSeries[revenueSeries.length - 1]?.total_amount as number)
              - (revenueSeries[revenueSeries.length - 2]?.total_amount as number))
              / (revenueSeries[revenueSeries.length - 2]?.total_amount as number)) *
              100
          )
        : 0,
    };
  }, [apiData, selectedPeriod]);

  const filteredRevenueData = useMemo(() => {
    if (selectedPeriod === 'monthly') {
      return apiData?.revenue?.series ?? [];
    }

    // For daily/weekly, use the existing data as reference
    return apiData?.revenue?.series ?? [];
  }, [apiData, selectedPeriod]);

  return (
    <div className="space-y-6 dark:text-white">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Statistics Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Monitor your business metrics and performance
          </p>
        </div>
        <PeriodFilter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title={`${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Revenue`}
          value={periodStats.revenue}
          growth={periodStats.growth}
          currency="UZS"
        />
        <StatCard
          title="Total Bookings"
          value={apiData?.bookings?.total ?? 0}
          growth={12}
          currency="UZS"
        />
        <StatCard
          title="Total Barbershops"
          value={apiData?.totals?.barbershops ?? 0}
          growth={3}
          currency="UZS"
        />
      </div>

      {/* Booking Statistics Chart */}
      <BookingStatisticsChart data={apiData?.bookings?.by_status ?? {}} />

      {/* Revenue Analytics Chart with Header and Footer */}
      <RevenueAnalyticsChart
        data={filteredRevenueData}
        totalUsers={apiData?.totals?.users ?? 0}
        totalBarbers={apiData?.totals?.barbers ?? 0}
        totalRevenue={apiData?.revenue?.total_amount ?? 0}
      />
    </div>
  );
}
