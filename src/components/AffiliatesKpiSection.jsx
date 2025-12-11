import React from 'react';
const affiliateStats = [
  {
    title: 'Total Affiliates',
    value: '156',
    change: '+3%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Total Referrals',
    value: '2,450',
    change: '+12%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Total Commissions',
    value: '$45,250',
    change: '+8%',
    timeframe: 'from last month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Pending Payouts',
    value: '$12,350',
    change: 'Scheduled for next week',
    changeColor: 'text-yellow-600',
  },
];

const KpiCard = ({ stat }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition duration-200">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
    
    {/* Main Value */}
    <p className="text-3xl font-bold py-8 text-gray-800 my-1">{stat.value}</p>
    
    {/* Change/Timeframe */}
    <p className={`text-sm ${stat.changeColor}`}>
      {stat.change}
      <span className="text-gray-400 ml-1">{stat.timeframe}</span>
    </p>
  </div>
);

const AffiliatesKpiSection = () => {
  return (
    <div className="mt-10 w-full">
      
      {/* Responsive Grid for KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {affiliateStats.map((stat, index) => (
          <KpiCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default AffiliatesKpiSection;