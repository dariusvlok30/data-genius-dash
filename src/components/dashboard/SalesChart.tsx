
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";

const fetchSalesData = async () => {
  const response = await fetch('/api/sales/monthly');
  if (!response.ok) throw new Error('Failed to fetch sales data');
  return response.json();
};

const formatZAR = (value: number) => {
  return `R ${value.toLocaleString()}`;
};

export const SalesChart = () => {
  const { data: salesData, isLoading, error } = useQuery({
    queryKey: ['sales-monthly'],
    queryFn: fetchSalesData,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance (Loading...)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-slate-500">Loading sales data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-red-500">Error loading sales data</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sales Performance
          <span className="text-sm font-normal text-slate-500">(ZAR)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis 
                dataKey="month" 
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
                  formatZAR(value), 
                  name === 'sales' ? 'Actual Sales' : 'Target'
                ]}
                labelClassName="text-slate-700"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#1d4ed8' }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#64748b" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#64748b', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
