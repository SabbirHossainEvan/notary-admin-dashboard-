import React from 'react';

// --- KPI Data Structure ---
const revenueStats = [
  {
    title: 'Total Revenue',
    value: '$24,500',
    change: '+18%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Transactions',
    value: '1,245',
    change: '+5%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Average Order',
    value: '$85.75',
    change: '+2%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Refunds',
    value: '$350',
    change: '1.4% of total revenue',
    timeframe: '', 
    changeColor: 'text-red-600', 
  },
];

// --- Single KPI Card Component ---
const KpiCard = ({ stat }) => (
  <div className="bg-white rounded-xl mt-5 shadow-sm p-5 border border-gray-100 hover:shadow-md transition duration-200">
    <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
    
    {/* Main Value */}
    <p className="text-3xl font-bold text-gray-800 my-1">{stat.value}</p>
    
    {/* Change/Timeframe */}
    <p className={`text-sm ${stat.changeColor}`}>
      {stat.change}
      {stat.timeframe && <span className="text-gray-400 ml-1">{stat.timeframe}</span>}
    </p>
  </div>
);

const PaymentsRevenueKpi = () => {
  return (
    <div className=" w-full">
      
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Payments & Revenue</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {revenueStats.map((stat, index) => (
          <KpiCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default PaymentsRevenueKpi;