

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Trash2, Check, X, Star } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// -------------------- Data --------------------
const customerData = [
  { id: 101, name: 'John Doe', email: 'john@example.com', requests: 12, completed: 10, status: 'Active' },
  { id: 102, name: 'Jane Smith', email: 'jane@example.com', requests: 8, completed: 8, status: 'Active' },
  { id: 103, name: 'Bob Johnson', email: 'bob@example.com', requests: 5, completed: 3, status: 'Suspended' },
];

const notaryData = [
  { id: 201, name: 'Sarah Wilson', state: 'CA', license: 'CA12345', jobs: 45, rating: 4.8, fee: '$50',  },
  { id: 202, name: 'Mike Brown', state: 'NY', license: 'NY67890', jobs: 32, rating: 4.6, fee: '$45',  },
  { id: 203, name: 'Lisa Davis', state: 'TX', license: 'TX54321', jobs: 28, rating: 4.9, fee: '$55',  },
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

// -------------------- Component --------------------
const UsersManagementTable = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(customerData);

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
      Object.values(item).some(val => String(val).toLowerCase().includes(lowercasedSearch))
    );
  }, [searchTerm, currentTab]);

  const getHeaders = (key) => {
    switch (key) {
      case 'customers':
        return ['Name', 'Email', 'Requests', 'Completed', 'Status'];
      case 'notaries':
        return ['Name', 'State', 'License', 'Jobs', 'Rating', 'Fee', ];
      case 'affiliates':
        return ['Business Name', 'Email', 'Referrals', 'Commission', 'Status'];
      default:
        return [];
    }
  };

  // -------------------- PDF Export --------------------
const exportPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(`Users Management - ${currentTab.label}`, 14, 20);

  // Table headers
  const headers = [getHeaders(activeTab)];

  // Table rows
  const rows = filteredData.map(item => {
    if (activeTab === 'customers') return [item.name, item.email, item.requests, item.completed, item.status];
    if (activeTab === 'notaries') return [item.name, item.state, item.license, item.jobs, item.rating, item.fee, item.status];
    if (activeTab === 'affiliates') return [item.name, item.email, item.referrals, item.commission, item.status];
    return [];
  });

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: 255 },
    styles: { fontSize: 10 }
  });

  doc.save(`${currentTab.label}.pdf`);
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

  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <button
          onClick={exportPDF}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Export PDF
        </button>
      </div>

      {/* Tabs */}
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

      {/* Search & Filter */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {getHeaders(activeTab).map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr key={user.id}>
                {renderRow(user, activeTab)}

                {/* Status Column for Customers/Affiliates */}
                {(activeTab === 'customers' || activeTab === 'affiliates') && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                )}

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50" title="View Details">
                      <Eye className="w-5 h-5" />
                    </button>

                    {activeTab === 'notaries' ? (
                      <>
                        <button onClick={() => handleNotaryAction(user.id, 'Approved')} className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50" title="Approve Notary">
                          <Check className="w-5 h-5" />
                        </button>
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
