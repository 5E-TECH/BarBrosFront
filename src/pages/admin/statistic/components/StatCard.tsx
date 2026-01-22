import { TrendingUp } from "lucide-react";
import { memo } from "react";

interface StatCardProps {
  title: string;
  value: number;
  growth?: number;
  currency?: string;
  isCurrency?: boolean;
}

const StatCard = ({
  currency = "UZS",
  title,
  value,
  growth = 0,
  isCurrency = false,
}: StatCardProps) => {
  const isPositiveGrowth = growth >= 0;

  const formattedValue = isCurrency
    ? new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        maximumFractionDigits: 0,
        currency,
      }).format(value)
    : new Intl.NumberFormat("uz-UZ").format(value);

  return (
    <div className="bg-card rounded-lg border border-[#e9e9e9] bg-white dark:bg-[#191a1f] p-6 shadow-sm dark:text-white dark:border-[#1f222b]">
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
                ? "bg-green-100 text-green-500 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-700/10 dark:text-red-400"
            }`}
          >
            <TrendingUp
              size={16}
              className={isPositiveGrowth ? "rotate-0" : "rotate-180"}
            />
            {Math.abs(growth)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(StatCard);
