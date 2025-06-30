
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, DollarSign, Package, Users, BarChart3 } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { RegionalChart } from "@/components/dashboard/RegionalChart";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData, extractKPIData } from "@/services/apiService";

const Index = () => {
  const { data: dashboardData, isLoading: kpiLoading, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: fetchDashboardData,
  });

  const kpiData = dashboardData ? extractKPIData(dashboardData) : null;
  const regionalData = dashboardData?.dashboard_data.regional_performance || [];
  const salesData = dashboardData?.dashboard_data.monthly_sales || [];
  const inventoryStatus = dashboardData?.dashboard_data.inventory_status;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-red-500 text-lg mb-2">Error loading dashboard data</div>
              <div className="text-slate-600">{error.message}</div>
              <div className="text-sm text-slate-500 mt-2">
                Please check if the API endpoint is accessible: http://10.51.0.16:8089/dashboardresults?format=json
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Business Intelligence Dashboard</h1>
            <p className="text-slate-600 mt-1">Real-time insights and analytics</p>
            {dashboardData && (
              <p className="text-xs text-slate-500 mt-1">
                Last updated: {new Date(dashboardData.last_updated).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <ExportButton />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiLoading ? (
            <>
              {[1,2,3,4].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-20 bg-slate-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : kpiData ? (
            <>
              <KPICard
                title="Total Revenue"
                value={kpiData.totalRevenue}
                change={kpiData.revenueChange}
                trend={kpiData.revenueChange.includes('-') ? 'down' : 'up'}
                icon={DollarSign}
              />
              <KPICard
                title="Total Orders"
                value={kpiData.totalOrders}
                change={kpiData.ordersChange}
                trend={kpiData.ordersChange.includes('-') ? 'down' : 'up'}
                icon={Package}
              />
              <KPICard
                title="Active Customers"
                value={kpiData.activeCustomers}
                change={kpiData.customersChange}
                trend="up"
                icon={Users}
              />
              <KPICard
                title="Growth Rate"
                value={kpiData.growthRate}
                change={kpiData.revenueChange}
                trend={kpiData.revenueChange.includes('-') ? 'down' : 'up'}
                icon={TrendingUp}
              />
            </>
          ) : null}
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <RevenueChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InventoryChart />
              <RegionalChart />
            </div>
            
            {dashboardData?.dashboard_data.ai_analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Business Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">
                      {dashboardData.dashboard_data.ai_analysis}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <SalesChart />
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.slice(-3).map((month, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">{month.Month}</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            R {month.Revenue.toLocaleString()}
                          </div>
                          <div className={`text-sm ${month.Month_over_Month_Growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {month.Month_over_Month_Growth >= 0 ? '+' : ''}{month.Month_over_Month_Growth}% growth
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalChart />
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionalData.slice(0, 6).map((region, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold">{region.Region}</div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">
                        R {region.Total_Revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">{region.Percentage_of_Total}% of total</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {region.Total_Orders} orders • {region.Active_Customers} customers
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
