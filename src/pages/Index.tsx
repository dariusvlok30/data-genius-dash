
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

const fetchKPIData = async () => {
  const response = await fetch('/api/kpis');
  if (!response.ok) throw new Error('Failed to fetch KPI data');
  return response.json();
};

const fetchMetricsData = async (tab: string) => {
  const response = await fetch(`/api/metrics/${tab}`);
  if (!response.ok) throw new Error('Failed to fetch metrics data');
  return response.json();
};

const Index = () => {
  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ['kpis'],
    queryFn: fetchKPIData,
  });

  const { data: salesMetrics } = useQuery({
    queryKey: ['metrics-sales'],
    queryFn: () => fetchMetricsData('sales'),
  });

  const { data: inventoryMetrics } = useQuery({
    queryKey: ['metrics-inventory'],
    queryFn: () => fetchMetricsData('inventory'),
  });

  const { data: regionalMetrics } = useQuery({
    queryKey: ['metrics-regional'],
    queryFn: () => fetchMetricsData('regional'),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Business Intelligence Dashboard</h1>
            <p className="text-slate-600 mt-1">Real-time insights and analytics</p>
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
          ) : (
            <>
              <KPICard
                title="Total Revenue"
                value={kpiData?.totalRevenue || "Loading..."}
                change={kpiData?.revenueChange || "..."}
                trend="up"
                icon={DollarSign}
              />
              <KPICard
                title="Total Orders"
                value={kpiData?.totalOrders || "Loading..."}
                change={kpiData?.ordersChange || "..."}
                trend="up"
                icon={Package}
              />
              <KPICard
                title="Active Customers"
                value={kpiData?.activeCustomers || "Loading..."}
                change={kpiData?.customersChange || "..."}
                trend="up"
                icon={Users}
              />
              <KPICard
                title="Growth Rate"
                value={kpiData?.growthRate || "Loading..."}
                change={kpiData?.growthChange || "..."}
                trend="up"
                icon={TrendingUp}
              />
            </>
          )}
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
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
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <SalesChart />
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {salesMetrics?.thisMonth || "Loading..."}
                      </div>
                      <div className="text-sm text-green-700">This Month</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {salesMetrics?.lastMonth || "Loading..."}
                      </div>
                      <div className="text-sm text-blue-700">Last Month</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {salesMetrics?.growth || "Loading..."}
                      </div>
                      <div className="text-sm text-purple-700">Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventoryChart />
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Low Stock Items</span>
                    <span className="text-red-600 font-bold">
                      {inventoryMetrics?.lowStock || "..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Reorder Required</span>
                    <span className="text-yellow-600 font-bold">
                      {inventoryMetrics?.reorderRequired || "..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">In Stock</span>
                    <span className="text-green-600 font-bold">
                      {inventoryMetrics?.inStock || "..."}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <RegionalChart />
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionalMetrics?.topRegions?.map((region: any, index: number) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="text-xl font-bold">{region.name}</div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">
                        {region.sales}
                      </div>
                      <div className="text-sm text-slate-600">{region.percentage} of total</div>
                    </div>
                  )) || (
                    <>
                      <div className="text-center p-4 border rounded-lg animate-pulse">
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                      <div className="text-center p-4 border rounded-lg animate-pulse">
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                      <div className="text-center p-4 border rounded-lg animate-pulse">
                        <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                    </>
                  )}
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
