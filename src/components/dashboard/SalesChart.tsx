
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "Jan", sales: 425000, target: 400000 },
  { month: "Feb", sales: 378000, target: 420000 },
  { month: "Mar", sales: 489000, target: 450000 },
  { month: "Apr", sales: 512000, target: 480000 },
  { month: "May", sales: 445000, target: 500000 },
  { month: "Jun", sales: 623000, target: 520000 },
  { month: "Jul", sales: 687000, target: 550000 },
  { month: "Aug", sales: 734000, target: 580000 },
  { month: "Sep", sales: 691000, target: 600000 },
  { month: "Oct", sales: 758000, target: 620000 },
  { month: "Nov", sales: 812000, target: 650000 },
  { month: "Dec", sales: 896000, target: 680000 },
];

const formatZAR = (value: number) => {
  return `R ${value.toLocaleString()}`;
};

export const SalesChart = () => {
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
