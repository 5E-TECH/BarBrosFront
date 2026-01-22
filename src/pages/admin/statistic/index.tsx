import { memo } from "react";
import { Statistics } from "./components/Statistics";
const MOCK_API_DATA = {
  totals: {
    users: 1240,
    barbershops: 35,
    barbers: 210,
  },
  bookings: {
    total: 680,
    by_status: {
      pending: 40,
      confirmed: 210,
      completed: 390,
      cancelled: 40,
    },
  },
  revenue: {
    total_amount: 12500000,
    series: [
      { label: "2025-01", total_amount: "4200000" },
      { label: "2025-02", total_amount: "3800000" },
      { label: "2025-03", total_amount: "4500000" },
    ],
  },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <Statistics apiData={MOCK_API_DATA} />
      </div>
    </div>
  );
};

export default memo(Index);
