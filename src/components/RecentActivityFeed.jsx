import React from 'react';
import { Dot } from 'lucide-react'; 


const activityData = [
  {
    user: 'John Smith',
    event: 'signed up as a customer',
    time: '5 mins ago',
    dotColor: 'text-blue-500',
    dotBg: 'bg-blue-500' 
  },
  {
    user: 'Sarah Johnson',
    event: 'accepted a notarization job',
    time: '12 mins ago',
    dotColor: 'text-blue-500',
    dotBg: 'bg-blue-500'
  },
  {
    user: 'Michael Brown',
    event: 'requested a payout of $250',
    time: '1 hour ago',
    dotColor: 'text-blue-500',
    dotBg: 'bg-blue-500'
  },
  {
    user: 'Emily Davis',
    event: 'was approved as a notary',
    time: '2 hours ago',
    dotColor: 'text-blue-500',
    dotBg: 'bg-blue-500'
  },
  {
    user: 'Robert Wilson',
    event: 'joined as an affiliate',
    time: '3 hours ago',
    dotColor: 'text-blue-500',
    dotBg: 'bg-blue-500'
  },
];

const ActivityItem = ({ activity }) => (
  <div className="flex items-start py-4 border-b border-gray-100 last:border-b-0">
    
    {/* Icon/Dot */}
    <div className={`mr-4 pt-1 ${activity.dotColor}`}>
      <Dot size={20} className="w-5 h-5 fill-current" />
    </div>
    
    {/* Content */}
    <div className="flex flex-col flex-grow">
      {/* Activity Description */}
      <p className="text-gray-800 text-base">
        <span className="font-semibold">{activity.user}</span> {activity.event}
      </p>
      
      {/* Time */}
      <p className="text-gray-500 text-sm mt-0.5">
        {activity.time}
      </p>
    </div>
  </div>
);


const RecentActivityFeed = () => {
  return (

    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      
      {/* Activity List */}
      <div className="divide-y divide-gray-100">
        {activityData.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
      
    </div>
  );
};

export default RecentActivityFeed;