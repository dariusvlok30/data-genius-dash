
const API_BASE_URL = 'http://10.51.0.16:8089';

export interface DashboardData {
  dashboard_data: {
    overview_metrics: {
      total_revenue: number;
      total_orders: number;
      active_customers: number;
    };
    growth_metrics: {
      revenue_growth: {
        Total_Revenue: number;
        Previous_Month_Revenue: number;
        Revenue_Growth_Percent: number;
      };
      orders_growth: {
        Total_Orders: number;
        Previous_Month_Orders: number;
        Orders_Growth_Percent: number;
      };
    };
    regional_performance: Array<{
      Region: string;
      Total_Revenue: number;
      Total_Orders: number;
      Active_Customers: number;
      Percentage_of_Total: number;
    }>;
    monthly_sales: Array<{
      Month: string;
      Revenue: number;
      Gross_Revenue: number;
      Orders: number;
      Customers: number;
      Month_over_Month_Growth: number;
    }>;
    quarterly_performance: Array<any>;
    inventory_status: {
      In_Stock: number;
      Low_Stock: number;
      Out_of_Stock: number;
      Reorder_Required: number;
      Total_Products: number;
    };
    inventory_distribution: Array<any>;
    low_stock_items: Array<any>;
    top_products: Array<any>;
    ai_analysis: string;
  };
  last_updated: string;
  server_time: string;
  status: string;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await fetch(`${API_BASE_URL}/dashboardresults?format=json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  return response.json();
};

// Helper functions to extract specific data
export const extractKPIData = (data: DashboardData) => {
  const { overview_metrics, growth_metrics } = data.dashboard_data;
  return {
    totalRevenue: `R ${overview_metrics.total_revenue.toLocaleString()}`,
    revenueChange: `${growth_metrics.revenue_growth.Revenue_Growth_Percent > 0 ? '+' : ''}${growth_metrics.revenue_growth.Revenue_Growth_Percent.toFixed(1)}%`,
    totalOrders: overview_metrics.total_orders.toLocaleString(),
    ordersChange: `${growth_metrics.orders_growth.Orders_Growth_Percent > 0 ? '+' : ''}${growth_metrics.orders_growth.Orders_Growth_Percent.toFixed(1)}%`,
    activeCustomers: overview_metrics.active_customers.toLocaleString(),
    customersChange: "N/A", // Not available in current data
    growthRate: `${growth_metrics.revenue_growth.Revenue_Growth_Percent.toFixed(1)}%`,
    growthChange: `${growth_metrics.revenue_growth.Revenue_Growth_Percent > 0 ? 'up' : 'down'}`
  };
};

export const extractSalesData = (data: DashboardData) => {
  return data.dashboard_data.monthly_sales.map(item => ({
    month: item.Month,
    sales: item.Revenue,
    target: item.Gross_Revenue,
    growth: item.Month_over_Month_Growth
  }));
};

export const extractRegionalData = (data: DashboardData) => {
  return data.dashboard_data.regional_performance.map(item => ({
    province: item.Region,
    sales: item.Total_Revenue
  }));
};

export const extractInventoryData = (data: DashboardData) => {
  const { inventory_status } = data.dashboard_data;
  return [
    { category: 'In Stock', count: inventory_status.In_Stock },
    { category: 'Low Stock', count: inventory_status.Low_Stock },
    { category: 'Out of Stock', count: inventory_status.Out_of_Stock },
    { category: 'Reorder Required', count: inventory_status.Reorder_Required }
  ];
};
