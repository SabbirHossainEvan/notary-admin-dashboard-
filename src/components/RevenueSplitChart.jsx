import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// --- Dynamic Chart Data ---
const data = [
  { name: 'Platform', value: 45, color: '#3B82F6' }, // Blue
  { name: 'Notaries', value: 35, color: '#10B981' }, // Green
  { name: 'Affiliates', value: 20, color: '#F59E0B' }, // Orange
];


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
  const xEnd = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const yEnd = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);

  const textAnchor = xEnd > cx ? 'start' : 'end';

  const percentageString = `${(percent * 100).toFixed(0)}%`; 
  
  return (
    <>
      {/* Text Label */}
      <text 
        x={xEnd} 
        y={yEnd} 
        fill={data[index].color} 
        textAnchor={textAnchor} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${data[index].name}: ${percentageString}`}
      </text>
    </>
  );
};


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-lg rounded-md text-sm">
        <p className="font-semibold" style={{ color: item.payload.color }}>
          {`${item.name}: ${item.value}%`}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueSplitChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Chart Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Split</h2>
      
      {/* Responsive Container wrapper */}
      <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                  
                  <Pie
                      data={data}
                      cx="50%" 
                      cy="50%" 
                      innerRadius={0} 
                      outerRadius={100} 
                      paddingAngle={5} 
                      dataKey="value"
                      labelLine={false} 
                      label={renderCustomizedLabel} 
                  >
                      {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  
                  {/* Tooltip on hover */}
                  <Tooltip content={<CustomTooltip />} />
                  
              </PieChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueSplitChart;