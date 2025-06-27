
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { quarter: "Q1 2023", revenue: 1245680, profit: 312420 },
  { quarter: "Q2 2023", revenue: 1389250, profit: 389250 },
  { quarter: "Q3 2023", revenue: 1567890, profit: 456790 },
  { quarter: "Q4 2023", revenue: 1823450, profit: 547035 },
  { quarter: "Q1 2024", revenue: 1945320, profit: 583596 },
  { quarter: "Q2 2024", revenue: 2134567, profit: 640370 },
];

const formatZAR = (value: number) => {
  return `R ${(value / 1000).toFixed(0)}k`;
};

export const RevenueChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Revenue & Profit Trends
          <span className="text-sm font-normal text-slate-500">(ZAR)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis 
                dataKey="quarter" 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-slate-600"
                tick={{ fontSize: 12 }}
                tickFormatter={formatZAR}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `R ${value.toLocaleString()}`, 
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]}
                labelClassName="text-slate-700"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                name="revenue"
              />
              <Bar 
                dataKey="profit" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="profit"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
