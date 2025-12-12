import React from 'react';
import { Users, UserPlus, Zap, DollarSign, Clock, TrendingUp, CheckCircle, Briefcase } from 'lucide-react';

const kpis = [
  {
    title: "Total Users",
    value: "2,847",
    change: "↑12%",
    timeframe: "from last month",
    icon: Users,
    iconBgColor: "bg-blue-100",
    iconTextColor: "text-blue-500",
    changeColor: "text-green-500",
  },
  {
    title: "Active Notaries",
    value: "156",
    change: "↑8%",
    timeframe: "from last month",
    icon: UserPlus,
    iconBgColor: "bg-green-100",
    iconTextColor: "text-green-500",
    changeColor: "text-green-500",
  },
  {
    title: "Total Affiliates",
    value: "89",
    change: "↑5%",
    timeframe: "from last month",
    icon: Briefcase,
    iconBgColor: "bg-purple-100",
    iconTextColor: "text-purple-500",
    changeColor: "text-green-500",
  },
  {
    title: "Completed Jobs",
    value: "1,234",
    change: "↑15%",
    timeframe: "from last month",
    icon: CheckCircle,
    iconBgColor: "bg-indigo-100",
    iconTextColor: "text-indigo-500",
    changeColor: "text-green-500",
  },
  {
    title: "Platform Revenue",
    value: "$67,890",
    change: "↑18%",
    timeframe: "from last month",
    icon: DollarSign,
    iconBgColor: "bg-green-100",
    iconTextColor: "text-green-500",
    changeColor: "text-green-500",
  },
  {
    title: "Pending Payouts",
    value: "$4,250",
    change: null, 
    timeframe: null,
    icon: Clock,
    iconBgColor: "bg-orange-100",
    iconTextColor: "text-orange-500",
  },
  {
    title: "Monthly Growth",
    value: "+23%",
    change: "vs last month",
    timeframe: null,
    icon: TrendingUp,
    iconBgColor: "bg-cyan-100",
    iconTextColor: "text-cyan-500",
    changeColor: "text-green-500",
    valueColor: "text-gray-900" 
  },
  {
    title: "Active Sessions",
    value: "47",
    change: null,
    timeframe: null,
    icon: Zap,
    iconBgColor: "bg-pink-100",
    iconTextColor: "text-pink-500",
  },
];

const KpiCard = ({ kpi }) => {
  const Icon = kpi.icon; 

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-sm font-medium">{kpi.title}</p>
        <div className={`p-3 rounded-xl ${kpi.iconBgColor} ${kpi.iconTextColor}`}>
          <Icon size={24} />
        </div>
      </div>
      

      <div className="mt-4">
        <p className={`text-3xl font-bold ${kpi.valueColor || 'text-gray-900'}`}>{kpi.value}</p>
      </div>

      {kpi.change && (
        <div className="mt-2 text-sm font-medium">
          <span className={kpi.changeColor || 'text-gray-500'}>{kpi.change}</span>
          {kpi.timeframe && (
            <span className="ml-1 text-gray-400 text-xs">
              {kpi.timeframe}
            </span>
          )}
        </div>
      )}

      {/* {kpi.title === 'Monthly Growth' && kpi.change && (
        <p className="text-sm text-gray-400 mt-2">{kpi.change}</p>
      )} */}

    </div>
  );
};

const DashboardKpiSection = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <KpiCard key={index} kpi={kpi} />
        ))}
      </div>
    </div>
  );
};

export default DashboardKpiSection;