



import React, { useState, useMemo } from 'react';
import { 
    ChevronLeft, 
    ChevronRight, 
    X,
    ClipboardList,
    User,
    DollarSign,
    CreditCard,
    CheckCircle,
    Calendar,
} from 'lucide-react';

// --- Static Data for Transactions ---
const initialTransactionsData = [
 { id: 'INV-001', customer: 'John Doe', amount: 75.00, method: 'Credit Card', status: 'Completed', date: '2023-05-20', description: 'Monthly subscription fee', tax: 5.00, fee: 2.50 },
 { id: 'INV-002', customer: 'Sarah Smith', amount: 95.00, method: 'PayPal', status: 'Completed', date: '2023-05-22', description: 'Service renewal', tax: 0.00, fee: 3.00 },
 { id: 'INV-003', customer: 'Robert Johnson', amount: 60.00, method: 'Bank Transfer', status: 'Pending', date: '2023-05-25', description: 'Product purchase', tax: 4.00, fee: 0.00 },
 { id: 'INV-004', customer: 'Jane Williams', amount: 120.00, method: 'Credit Card', status: 'Completed', date: '2023-05-18', description: 'Consulting services', tax: 8.00, fee: 3.50 },
 { id: 'INV-005', customer: 'David Miller', amount: 85.00, method: 'PayPal', status: 'Failed', date: '2023-05-15', description: 'License fee', tax: 5.50, fee: 2.50 },
 { id: 'INV-006', customer: 'Alice Cooper', amount: 110.00, method: 'Stripe', status: 'Completed', date: '2023-05-28', description: 'Annual plan upgrade', tax: 7.00, fee: 3.20 },
 { id: 'INV-007', customer: 'Bob Martin', amount: 50.00, method: 'Credit Card', status: 'Pending', date: '2023-05-29', description: 'Small item purchase', tax: 3.50, fee: 1.50 },
 { id: 'INV-008', customer: 'Charlie Fox', amount: 70.00, method: 'PayPal', status: 'Failed', date: '2023-05-30', description: 'Setup fee', tax: 4.50, fee: 2.00 },
];

// --- Filter Options ---
const statusOptions = ['All Status', 'Completed', 'Pending', 'Failed'];
const methodOptions = ['All Methods', 'Credit Card', 'PayPal', 'Bank Transfer', 'Stripe'];
const ITEMS_PER_PAGE = 5;

// --- Transaction Details Modal Component (NEW) ---
const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

    const renderDetail = (Icon, label, value, valueClass="") => (
        <div className="flex items-start space-x-3 text-gray-700">
            <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
                <span className="text-sm font-medium text-gray-500">{label}:</span>
                <p className={`text-base font-semibold text-gray-800 ${valueClass}`}>{value}</p>
            </div>
        </div>
    );
    
    // Calculate Subtotal for detailed view
    const subtotal = transaction.amount - transaction.tax - transaction.fee;

    return (
        <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-transparent bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4" 
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-md my-8 overflow-hidden transition-all transform bg-white rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="transaction-modal-headline"
            >
                {/* Header */}
                <div className="flex justify-between items-center bg-blue-600 p-5">
                    <h3 id="transaction-modal-headline" className="text-xl font-bold text-white">
                        Transaction Details
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Close modal">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-5">
                        {renderDetail(ClipboardList, "Invoice ID", transaction.id)}
                        {renderDetail(User, "Customer Name", transaction.customer)}
                        {renderDetail(Calendar, "Transaction Date", transaction.date)}
                        {renderDetail(CreditCard, "Payment Method", transaction.method)}
                        
                        <div className='p-4  rounded-lg bg-gray-50'>
                            <h4 className='font-bold text-gray-700 mb-2'>Financial Breakdown</h4>
                            <div className='space-y-1 text-sm'>
                                <div className='flex justify-between'><span>Subtotal:</span><span className='font-medium'>{formatCurrency(subtotal)}</span></div>
                                <div className='flex justify-between'><span>Tax:</span><span className='font-medium'>{formatCurrency(transaction.tax)}</span></div>
                                <div className='flex justify-between'><span>Fee:</span><span className='font-medium'>{formatCurrency(transaction.fee)}</span></div>
                                <div className='flex justify-between pt-2 border-t font-bold text-base'>
                                    <span>Total Amount:</span>
                                    <span className='text-blue-600'>{formatCurrency(transaction.amount)}</span>
                                </div>
                            </div>
                        </div>

                        {renderDetail(CheckCircle, "Status", transaction.status, 'text-green-600')}

                        <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-500 mb-1">Description:</p>
                            <p className="text-base text-gray-800 italic">{transaction.description}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
// --- End Transaction Details Modal Component ---


const RecentTransactionsTable = () => {
 const [selectedStatus, setSelectedStatus] = useState('All Status');
 const [selectedMethod, setSelectedMethod] = useState('All Methods');
 const [currentPage, setCurrentPage] = useState(1);
 const [transactionsData] = useState(initialTransactionsData);

    // NEW STATES for Modal
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);


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
 
 // UPDATED handleView Action to open Modal
 const handleView = (transaction) => {
   setSelectedTransaction(transaction);
      setIsDetailsModalOpen(true);
 };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedTransaction(null);
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
          {/* UPDATED: Pass the entire transaction object to handleView */}
          <button onClick={() => handleView(tx)} className="text-blue-600 hover:text-blue-900 font-medium">
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

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        transaction={selectedTransaction}
      />

  </div>
 );
};

export default RecentTransactionsTable;