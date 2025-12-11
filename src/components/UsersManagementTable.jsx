import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Trash2, Check, X, Star } from 'lucide-react';


const customerData = [
  { id: 101, name: 'John Doe', email: 'john@example.com', requests: 12, completed: 10, status: 'Active' },
  { id: 102, name: 'Jane Smith', email: 'jane@example.com', requests: 8, completed: 8, status: 'Active' },
  { id: 103, name: 'Bob Johnson', email: 'bob@example.com', requests: 5, completed: 3, status: 'Suspended' },
];


const notaryData = [
  { id: 201, name: 'Sarah Wilson', state: 'CA', license: 'CA12345', jobs: 45, rating: 4.8, fee: '$50', status: 'Pending' },
  { id: 202, name: 'Mike Brown', state: 'NY', license: 'NY67890', jobs: 32, rating: 4.6, fee: '$45', status: 'Approved' },
  { id: 203, name: 'Lisa Davis', state: 'TX', license: 'TX54321', jobs: 28, rating: 4.9, fee: '$55', status: 'Approved' },
];


const affiliateData = [
    { id: 301, name: 'Tech Solutions LLC', email: 'tech@example.com', referrals: 45, commission: '$2,250', status: 'Active' },
    { id: 302, name: 'Legal Services Inc', email: 'legal@example.com', referrals: 32, commission: '$1,600', status: 'Active' },
    { id: 303, name: 'Business Hub', email: 'hub@example.com', referrals: 28, commission: '$1,400', status: 'Pending' },
];


const tabConfig = [
  { key: 'customers', label: 'Customers', count: customerData.length, data: customerData },
  { key: 'notaries', label: 'Notaries', count: notaryData.length, data: notaryData },
  { key: 'affiliates', label: 'Affiliates', count: affiliateData.length, data: affiliateData },
];

const UsersManagementTable = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(customerData); 

  // --- Utility Functions ---
  const currentTab = tabConfig.find(tab => tab.key === activeTab);
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    alert(`Item with ID ${id} deleted (Simulated).`);
  };


  const handleNotaryAction = (id, action) => {
      alert(`Notary ID ${id} was ${action} (Simulated).`);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return currentTab.data;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    
    return currentTab.data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [searchTerm, currentTab]); 


  // 5. Dynamic Table Headers
  const getHeaders = (key) => {
    switch (key) {
      case 'customers':
        return ['Name', 'Email', 'Requests', 'Completed', 'Status', 'Actions'];
      case 'notaries':
        return ['Name', 'State', 'License', 'Jobs', 'Rating', 'Fee', 'Actions'];
      case 'affiliates':
        return ['Business Name', 'Email', 'Referrals', 'Commission', 'Status', 'Actions'];
      default:
        return [];
    }
  };


  const renderRow = (item, key) => {
    if (key === 'customers') {
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.requests}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completed}</td>
        </>
      );
    }
    if (key === 'notaries') {
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.state}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.license}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jobs}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
             <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" /> {item.rating}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{item.fee}</td>
        </>
      );
    }
    if (key === 'affiliates') {
        return (
            <>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.referrals}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{item.commission}</td>
            </>
        );
    }
    return null;
  };

  // --- JSX Rendering ---
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* Header Section (Title and Export Button) */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" /></svg> Export Data</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {tabConfig.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              pb-3 text-lg font-medium transition duration-150
              ${activeTab === tab.key 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label} <span className="text-sm font-normal text-gray-400 ml-1">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${currentTab.label.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-200">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {getHeaders(activeTab).map((header, index) => (
                <th 
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header === 'Actions' ? 'text-center' : ''}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr key={user.id}>
                {/* Dynamic Row Content */}
                {renderRow(user, activeTab)}

                <td className="px-6 py-4 whitespace-nowrap">
                  {(activeTab === 'customers' || activeTab === 'affiliates') && (
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  )}

                </td>

                {/* Actions Column (Different for Notaries) */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50" title="View Details">
                      <Eye className="w-5 h-5" />
                    </button>
                    
                    {activeTab === 'notaries' ? (
                        <>
                            {/* Approve */}
                            <button onClick={() => handleNotaryAction(user.id, 'Approved')} className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50" title="Approve Notary">
                                <Check className="w-5 h-5" />
                            </button>
                            {/* Reject */}
                            <button onClick={() => handleNotaryAction(user.id, 'Rejected')} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50" title="Reject Notary">
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (

                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50" title="Delete User">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No Results Message */}
        {filteredData.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No users found matching your search criteria.
          </div>
        )}
      </div>

    </div>
  );
};

export default UsersManagementTable;