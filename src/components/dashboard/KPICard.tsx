
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export const KPICard = ({ title, value, change, trend, icon: Icon }: KPICardProps) => {
  const isPositive = trend === "up";
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <div className="flex items-center mt-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change}
              </span>
              <span className="text-sm text-slate-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
