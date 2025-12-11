import React from 'react';

// --- Quick Action Button Data ---
const actions = [
  {
    label: 'Approve Notaries',
    bgColor: 'bg-[#2563EB] hover:bg-blue-700',
    action: () => console.log('Action: Approve Notaries'),
  },
  {
    label: 'View Payouts',
    bgColor: 'bg-[#16A34A] hover:bg-green-600',
    action: () => console.log('Action: View Payouts'),
  },
  {
    label: 'Send Announcement',
    bgColor: 'bg-[#9333EA] hover:bg-purple-700',
    action: () => console.log('Action: Send Announcement'),
  },
  {
    label: 'Generate Report',
    bgColor: 'bg-[#4F46E5] hover:bg-indigo-700',
    action: () => console.log('Action: Generate Report'),
  },
];

const QuickActions = () => {
  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-10 lg:p-8 w-full">
      
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      
      {/* Responsive Grid for Buttons */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`
              w-full 
              text-white 
              font-semibold 
              py-3 
              px-4 
              rounded-lg 
              shadow-md 
              transition 
              duration-200 
              ease-in-out 
              ${action.bgColor}
            `}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;