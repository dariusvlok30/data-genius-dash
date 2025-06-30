
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData, extractInventoryData } from "@/services/apiService";

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const InventoryChart = () => {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
  });

  const inventoryData = dashboardData ? extractInventoryData(dashboardData) : [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status (Loading...)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-slate-500">Loading inventory data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-red-500">Error loading inventory data: {error.message}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasInventoryData = inventoryData.some(item => item.count > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {hasInventoryData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-slate-500 mb-2">No inventory data available</div>
                <div className="text-sm text-slate-400">All inventory values are currently zero</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
