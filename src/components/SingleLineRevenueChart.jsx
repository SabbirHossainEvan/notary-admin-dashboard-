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
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 68000 },
];


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

    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Revenue Growth</h2>
      

      <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  
                  <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      padding={{ left: 20, right: 20 }} 
                      className="text-xs text-gray-600 font-medium" 
                  />
                  
                  <YAxis 
                      domain={[0, 80000]} 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-600 font-medium"
                  />
                  

                  <Tooltip content={<CustomTooltip />} />
                  
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
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ r: 4 }} 
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