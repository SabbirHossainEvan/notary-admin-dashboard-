import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const chartData = [
  { name: 'Jan', Revenue: 45000 },
  { name: 'Feb', Revenue: 52000 },
  { name: 'Mar', Revenue: 48000 },
  { name: 'Apr', Revenue: 61000 },
  { name: 'May', Revenue: 55000 },
  { name: 'Jun', Revenue: 68000 },
];

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p style={{ color: payload[0].color }}>
            {`Revenue: $${payload[0].value.toLocaleString('en-US')}`}
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyRevenueChart = () => {
  return (

    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full mt-10">
      
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Revenue Growth</h2>
      
      <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  
                  {/* X-Axis (Months) */}
                  <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      className="text-xs text-gray-600 font-medium" 
                      padding={{ left: 20, right: 20 }}
                  />
                  
                  {/* Y-Axis (The revenue values on the left) */}
                  <YAxis 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                      domain={[0, 80000]} 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-600 font-medium"
                  />
                  
                  {/* Tooltip on hover */}
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Legend (at the bottom center) */}
                  <Legend 
                      verticalAlign="bottom" 
                      align="center" 
                      wrapperStyle={{ paddingTop: '20px' }} 
                      iconType="circle" 
                  />
                  
                  <Line 
                      type="monotone" 
                      dataKey="Revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                  />

              </LineChart>
          </ResponsiveContainer>
      </div>

    </div>
  );
};

export default MonthlyRevenueChart;