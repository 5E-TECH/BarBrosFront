import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  growth?: number;
  currency?: string;
}

export function StatCard({
  title,
  value,
  growth = 0,
  currency = 'UZS',
}: StatCardProps) {
  const isPositiveGrowth = growth >= 0;
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm dark:text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {formattedValue}
          </p>
        </div>
        {growth !== 0 && (
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              isPositiveGrowth
                ? 'bg-green-100 text-green-500 dark:bg-green-500 dark:text-green-200'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            <TrendingUp
              size={16}
              className={isPositiveGrowth ? 'rotate-0' : 'rotate-180'}
            />
            {Math.abs(growth)}%
          </div>
        )}
      </div>
    </div>
  );
}
