
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const regionalData = [
  { province: "Gauteng", sales: 1245680, customers: 342 },
  { province: "Western Cape", sales: 892340, customers: 256 },
  { province: "KwaZulu-Natal", sales: 628150, customers: 189 },
  { province: "Eastern Cape", sales: 456780, customers: 134 },
  { province: "Free State", sales: 298450, customers: 87 },
  { province: "Mpumalanga", sales: 234560, customers: 69 },
  { province: "Limpopo", sales: 189340, customers: 52 },
  { province: "North West", sales: 167230, customers: 48 },
  { province: "Northern Cape", sales: 123450, customers: 34 },
];

const formatZAR = (value: number) => {
  return `R ${(value / 1000).toFixed(0)}k`;
};

export const RegionalChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sales by Province
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
