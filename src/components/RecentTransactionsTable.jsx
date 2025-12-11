import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Static Data for Transactions ---
const initialTransactionsData = [
  { id: 'INV-001', customer: 'John Doe', amount: 75.00, method: 'Credit Card', status: 'Completed', date: '2023-05-20' },
  { id: 'INV-002', customer: 'Sarah Smith', amount: 95.00, method: 'PayPal', status: 'Completed', date: '2023-05-22' },
  { id: 'INV-003', customer: 'Robert Johnson', amount: 60.00, method: 'Bank Transfer', status: 'Pending', date: '2023-05-25' },
  { id: 'INV-004', customer: 'Jane Williams', amount: 120.00, method: 'Credit Card', status: 'Completed', date: '2023-05-18' },
  { id: 'INV-005', customer: 'David Miller', amount: 85.00, method: 'PayPal', status: 'Failed', date: '2023-05-15' },
  { id: 'INV-006', customer: 'Alice Cooper', amount: 110.00, method: 'Stripe', status: 'Completed', date: '2023-05-28' },
  { id: 'INV-007', customer: 'Bob Martin', amount: 50.00, method: 'Credit Card', status: 'Pending', date: '2023-05-29' },
  { id: 'INV-008', customer: 'Charlie Fox', amount: 70.00, method: 'PayPal', status: 'Failed', date: '2023-05-30' },
];

// --- Filter Options ---
const statusOptions = ['All Status', 'Completed', 'Pending', 'Failed'];
const methodOptions = ['All Methods', 'Credit Card', 'PayPal', 'Bank Transfer', 'Stripe'];
const ITEMS_PER_PAGE = 5;

const RecentTransactionsTable = () => {
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedMethod, setSelectedMethod] = useState('All Methods');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsData] = useState(initialTransactionsData);

  // --- Utility Functions ---

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Simulated View Action
  const handleView = (id) => {
      alert(`Viewing details for Invoice: ${id}`);
  };

  // Simulated Receipt Action
  const handleReceipt = (id) => {
      alert(`Generating receipt for Invoice: ${id}`);
  };

  // --- Dynamic Filtering Logic ---
  const filteredTransactions = useMemo(() => {
    let filtered = transactionsData;

    // 1. Filter by Status
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(tx => tx.status === selectedStatus);
    }

    // 2. Filter by Method
    if (selectedMethod !== 'All Methods') {
      filtered = filtered.filter(tx => tx.method === selectedMethod);
    }
    
    return filtered;
  }, [transactionsData, selectedStatus, selectedMethod]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, endIndex);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10 lg:p-8 w-full">
      
      {/* --- Header Section (Title and Filters) --- */}
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Recent Transactions</h2>
        
        {/* Filters */}
        <div className="flex space-x-3">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {setSelectedStatus(e.target.value); setCurrentPage(1);}}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          
          {/* Method Filter */}
          <select
            value={selectedMethod}
            onChange={(e) => {setSelectedMethod(e.target.value); setCurrentPage(1);}}
            className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {methodOptions.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {['Invoice', 'Customer', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${tx.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.method}</td>
                
                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>

                {/* Actions (View and Receipt) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-4">
                    <button onClick={() => handleView(tx.id)} className="text-blue-600 hover:text-blue-900 font-medium">
                      View
                    </button>
                    <button onClick={() => handleReceipt(tx.id)} className="text-[#16A34A] hover:text-blue-900 font-medium">
                      Receipt
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results Message */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No transactions found matching your criteria.
          </div>
        )}
      </div>

      {/* --- Pagination Footer --- */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
        </p>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Render pagination buttons */}
          {[...Array(totalPages)].map((_, index) => (
             <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-0.5 rounded-md text-sm font-medium transition duration-150 ${
                    (index + 1) === currentPage 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
             >
                {index + 1}
             </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecentTransactionsTable;