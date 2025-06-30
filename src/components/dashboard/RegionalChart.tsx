
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData, extractRegionalData } from "@/services/apiService";

const formatZAR = (value: number) => {
  return `R ${(value / 1000).toFixed(0)}k`;
};

export const RegionalChart = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
  });

  const regionalData = dashboardData ? extractRegionalData(dashboardData) : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales by Region (Loading...)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-slate-500">Loading regional data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-red-500">Error loading regional data: {error.message}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sales by Region
          <span className="text-sm font-normal text-slate-500">(ZAR)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={regionalData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis 
                type="number"
                className="text-slate-600"
                tick={{ fontSize: 12 }}
                tickFormatter={formatZAR}
              />
              <YAxis 
                type="category"
                dataKey="province"
                className="text-slate-600"
                tick={{ fontSize: 11 }}
                width={100}
              />
              <Tooltip 
                formatter={(value: number) => [`R ${value.toLocaleString()}`, 'Sales']}
                labelClassName="text-slate-700"
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#3b82f6"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
