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

// --- Dynamic Chart Data (Based on the single-line image) ---
const chartData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 68000 },
];

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }}>
            {`${p.name}: $${p.value.toLocaleString('en-US')}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SingleLineRevenueChart = () => {
  return (
    // Outer container with light shadow and white background
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Revenue Growth</h2>
      
      {/* Responsive Container wrapper */}
      <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                  {/* Grid lines (dashed lines in the background) */}
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  
                  {/* X-Axis (Months) */}
                  <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      padding={{ left: 20, right: 20 }} 
                      className="text-xs text-gray-600 font-medium" 
                  />
                  
                  {/* Y-Axis (The dollar values on the left) */}
                  <YAxis 
                      domain={[0, 80000]} // Matches the image's max Y-axis
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-600 font-medium"
                  />
                  
                  {/* Tooltip on hover (Uses the corrected component) */}
                  <Tooltip content={<CustomTooltip />} />
                  
                  {/* Legend (at the bottom center) */}
                  <Legend 
                      verticalAlign="bottom" 
                      align="center" 
                      wrapperStyle={{ paddingTop: '20px' }} 
                      iconType="circle"
                  />
                  
                  {/* --- Revenue Line --- */}
                  <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4F46E5" // A nice blue/indigo color
                      strokeWidth={2}
                      dot={{ r: 4 }} // Solid circles for data points
                      activeDot={{ r: 6 }}
                      name="Revenue"
                  />

              </LineChart>
          </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SingleLineRevenueChart;