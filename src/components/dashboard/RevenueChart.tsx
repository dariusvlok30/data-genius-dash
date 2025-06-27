
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

const fetchRevenueData = async () => {
  const response = await fetch('/api/revenue/quarterly');
  if (!response.ok) throw new Error('Failed to fetch revenue data');
  return response.json();
};

const formatZAR = (value: number) => {
  return `R ${(value / 1000).toFixed(0)}k`;
};

export const RevenueChart = () => {
  const { data: revenueData, isLoading, error } = useQuery({
    queryKey: ['revenue-quarterly'],
    queryFn: fetchRevenueData,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Trends (Loading...)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-slate-500">Loading revenue data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Profit Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-red-500">Error loading revenue data</div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
