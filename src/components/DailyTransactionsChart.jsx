import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const chartData = [
  { name: 'Mon', transactions: 25 }, 
  { name: 'Tue', transactions: 31 }, 
  { name: 'Wed', transactions: 28 }, 
  { name: 'Thu', transactions: 34 }, 
  { name: 'Fri', transactions: 37 }, 
  { name: 'Sat', transactions: 35 }, 
  { name: 'Sun', transactions: 29 }, 
];

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p style={{ color: payload[0].color }}>
            {`Transactions: ${payload[0].value.toLocaleString('en-US')}`}
        </p>
      </div>
    );
  }
  return null;
};

const DailyTransactionsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Daily Transactions</h2>
      
      <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
              <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  barCategoryGap="20%" 
              >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  
                  <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      className="text-xs text-gray-600 font-medium" 
                  />
                  
                  <YAxis 
                      domain={[0, 40]} 
                      axisLine={false}
                      tickLine={false}
                      className="text-xs text-gray-600 font-medium"
                  />
                  
                  {/* Tooltip on hover */}
                  <Tooltip content={<CustomTooltip />} />
                  
                  <Legend 
                      verticalAlign="bottom" 
                      align="center" 
                      wrapperStyle={{ paddingTop: '20px' }} 
                      iconType="square" 
                  />

                  <Bar 
                      dataKey="transactions" 
                      fill="#10B981" 
                      name="Transactions"
                      radius={[4, 4, 0, 0]} 
                  />

              </BarChart>
          </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DailyTransactionsChart;