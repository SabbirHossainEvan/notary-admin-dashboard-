


import React, { useState, useEffect, useMemo } from 'react';
import { 
    Search, 
    Eye, 
    DollarSign, 
    ChevronLeft, 
    ChevronRight, 
    X,
    Users,
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
} from 'lucide-react';

const initialAffiliatesData = [
 { id: 1, affiliate: 'Legal Services Inc', referrals: 45, totalEarnings: 2250.00, paid: 1800.00, pending: 450.00, status: 'Active', commissionRate: '10%', lastPayment: '2023-10-01', contactEmail: 'legal@example.com' },
 { id: 2, affiliate: 'Real Estate Group', referrals: 32, totalEarnings: 1600.00, paid: 1600.00, pending: 0.00, status: 'Active', commissionRate: '15%', lastPayment: '2023-11-15', contactEmail: 'realestate@example.com' },
 { id: 3, affiliate: 'Financial Advisors Ltd', referrals: 28, totalEarnings: 1400.00, paid: 1050.00, pending: 350.00, status: 'Active', commissionRate: '10%', lastPayment: '2023-09-20', contactEmail: 'finance@example.com' },
 { id: 4, affiliate: 'Law Firm Partners', referrals: 21, totalEarnings: 1050.00, paid: 1050.00, pending: 0.00, status: 'Inactive', commissionRate: '12%', lastPayment: '2023-08-01', contactEmail: 'lawfirm@example.com' },
 { id: 5, affiliate: 'Mortgage Brokers Assoc', referrals: 18, totalEarnings: 900.00, paid: 675.00, pending: 225.00, status: 'Active', commissionRate: '10%', lastPayment: '2023-11-05', contactEmail: 'mortgage@example.com' },
];

const statusOptions = ['All Status', 'Active', 'Inactive'];
const ITEMS_PER_PAGE = 5;

// --- Affiliate Details Modal Component (NEW) ---
const AffiliateDetailsModal = ({ isOpen, onClose, affiliate }) => {
    if (!isOpen || !affiliate) return null;

    const formatCurrency = (amount) => `$${Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    const renderDetail = (Icon, label, value) => (
        <div className="flex items-start space-x-3 text-gray-700">
            <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
                <span className="text-sm font-medium text-gray-500">{label}:</span>
                <p className="text-base font-semibold text-gray-800 break-words">
                    {value}
                </p>
            </div>
        </div>
    );

    return (
        <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-transparent  bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4" 
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg my-8 overflow-hidden transition-all transform bg-white rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="affiliate-modal-headline"
            >
                {/* Header */}
                <div className="flex justify-between items-center bg-blue-600 p-5">
                    <h3 id="affiliate-modal-headline" className="text-xl font-bold text-white">
                        Affiliate Details: {affiliate.affiliate}
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1" aria-label="Close modal">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderDetail(Briefcase, "Affiliate ID", affiliate.id)}
                        {renderDetail(Users, "Referrals Count", affiliate.referrals)}
                        {renderDetail(DollarSign, "Total Earnings", formatCurrency(affiliate.totalEarnings))}
                        {renderDetail(CheckCircle, "Amount Paid", formatCurrency(affiliate.paid))}
                        {renderDetail(Clock, "Pending Payout", formatCurrency(affiliate.pending))}
                        {renderDetail(Users, "Commission Rate", affiliate.commissionRate)}
                        {renderDetail(Calendar, "Last Payment Date", affiliate.lastPayment || 'N/A')}
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <p className="text-sm font-medium text-gray-500 mb-1">Contact:</p>
                        <p className="text-base text-gray-800 font-medium">{affiliate.contactEmail}</p>
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
// --- End Affiliate Details Modal Component ---


const AffiliatesPayoutsTable = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedStatus, setSelectedStatus] = useState('All Status');
 const [sortBy, setSortBy] = useState('Total Earnings');
 const [currentPage, setCurrentPage] = useState(1);
 const [nextAffiliateId, setNextAffiliateId] = useState(initialAffiliatesData.length + 1); 
 const [affiliatesData, setAffiliatesData] = useState(initialAffiliatesData);

    // NEW STATES for Modal
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedAffiliate, setSelectedAffiliate] = useState(null);


 const handlePageChange = (page) => {
   if (page >= 1 && page <= totalPages) {
     setCurrentPage(page);
   }
 };


 useEffect(() => {
  const handler = (e) => {

   const newAffiliate = { 
    ...e.detail, 
    id: nextAffiliateId, 

    referrals: Number(e.detail.referrals),
    totalEarnings: Number(e.detail.totalEarnings),
    paid: Number(e.detail.paid),
    pending: Number(e.detail.pending),
        // Added default values for new fields
        commissionRate: e.detail.commissionRate || 'N/A',
        lastPayment: e.detail.lastPayment || 'N/A',
        contactEmail: e.detail.contactEmail || 'N/A',
   };

   setAffiliatesData(prev => [...prev, newAffiliate]);
   setNextAffiliateId(prev => prev + 1);
   setCurrentPage(1); 
  };
  window.addEventListener('addAffiliate', handler);
  return () => window.removeEventListener('addAffiliate', handler);
 }, [nextAffiliateId]);

 const getStatusClass = (status) => status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

 // UPDATED handleView to open modal
 const handleView = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsDetailsModalOpen(true);
};
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAffiliate(null);
  }

 const handlePay = (id) => alert(`Simulating payment for Affiliate ID: ${id}. Amount: $${affiliatesData.find(a => a.id === id)?.pending.toFixed(2)}`);
 const formatCurrency = (amount) => `$${Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

 const filteredAndSortedAffiliates = useMemo(() => {
  let filtered = affiliatesData;
  if (selectedStatus !== 'All Status') filtered = filtered.filter(a => a.status === selectedStatus);
  if (searchTerm) filtered = filtered.filter(a => a.affiliate.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'Total Earnings') return b.totalEarnings - a.totalEarnings;
    if (sortBy === 'Referrals') return b.referrals - a.referrals;
    if (sortBy === 'Pending') return b.pending - a.pending;
    return 0;
  });

  return filtered;
 }, [affiliatesData, selectedStatus, searchTerm, sortBy]);

 const totalPages = Math.ceil(filteredAndSortedAffiliates.length / ITEMS_PER_PAGE);
 const paginatedAffiliates = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return filteredAndSortedAffiliates.slice(start, start + ITEMS_PER_PAGE);
 }, [filteredAndSortedAffiliates, currentPage]);

 return (
  <div className="bg-white rounded-xl mt-10 shadow-md p-6 lg:p-8 w-full">
   {/* Filters and search */}
   <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
    <div className="relative flex-grow max-w-sm">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
     <input type="text" placeholder="Search affiliates..." value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value); setCurrentPage(1)}} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    <div className='flex gap-2'>
     <select value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value); setCurrentPage(1)}} className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
     </select>
     <select value={sortBy} onChange={(e)=>{setSortBy(e.target.value); setCurrentPage(1)}} className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="Total Earnings">Sort By</option>
      <option value="Total Earnings">Total Earnings</option>
      <option value="Referrals">Referrals</option>
      <option value="Pending">Pending Amount</option>
     </select>
    </div>
   </div>

   {/* Table */}
   <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
     <thead>
      <tr className="bg-gray-50">
       {['Affiliate', 'Referrals', 'Total Earnings', 'Paid', 'Pending', 'Status', 'Actions'].map(header => (
        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
       ))}
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {paginatedAffiliates.map(a => (
       <tr key={a.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.affiliate}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.referrals}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{formatCurrency(a.totalEarnings)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(a.paid)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">{formatCurrency(a.pending)}</td>
        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(a.status)}`}>{a.status}</span></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
         {/* UPDATED: Pass the entire affiliate object to handleView */}
         <button onClick={()=>handleView(a)} className="text-blue-600 hover:text-blue-900 font-medium flex items-center"><Eye className="w-4 h-4 mr-1"/> View</button>
         {a.pending>0 && <button onClick={()=>handlePay(a.id)} className="text-green-600 hover:text-green-900 font-medium flex items-center"><DollarSign className="w-4 h-4 mr-1"/> Pay</button>}
        </td>
       </tr>
      ))}
     </tbody>
    </table>
    {filteredAndSortedAffiliates.length===0 && <div className="text-center py-10 text-gray-500">No affiliates found matching your criteria.</div>}
   </div>

   {/* Pagination */}
   <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
    <p className="text-sm text-gray-700">
     Showing <span className="font-medium">{(currentPage-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{Math.min(currentPage*ITEMS_PER_PAGE, filteredAndSortedAffiliates.length)}</span> of <span className="font-medium">{filteredAndSortedAffiliates.length}</span> results
    </p>
    <div className="flex items-center space-x-1">
     <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1} className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-5 h-5"/></button>
     {[...Array(totalPages)].map((_, i)=>(
      <button key={i+1} onClick={()=>handlePageChange(i+1)} className={`px-3 py-1 mx-0.5 rounded-md text-sm font-medium transition duration-150 ${(i+1)===currentPage?'bg-blue-600 text-white':'bg-white text-gray-700 hover:bg-gray-100'}`}>{i+1}</button>
     ))}
     <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===totalPages || totalPages===0} className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-5 h-5"/></button>
    </div>
   </div>

      {/* Affiliate Details Modal */}
      <AffiliateDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        affiliate={selectedAffiliate}
      />
  </div>
 );
};

export default AffiliatesPayoutsTable;