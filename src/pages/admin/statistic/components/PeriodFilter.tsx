import { memo } from "react";


export type Period = 'daily' | 'weekly' | 'monthly';

interface PeriodFilterProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const PeriodFilter =({
  selectedPeriod,
  onPeriodChange,
}: PeriodFilterProps) => {
  return (
    <div className="flex gap-2">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-maintext border border-[#e9e9e9] dark:text-white dark:border-gray-700 ${
            selectedPeriod === period.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-muted'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

export default memo(PeriodFilter)