

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

export function PeriodFilter({
  selectedPeriod,
  onPeriodChange,
}: PeriodFilterProps) {
  return (
    <div className="flex gap-2">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors border dark:text-white ${
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
