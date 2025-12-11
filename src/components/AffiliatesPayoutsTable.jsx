import React, { useState, useMemo } from 'react';
import { Search, Eye, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Static Data for Affiliates ---
const initialAffiliatesData = [
    { id: 1, affiliate: 'Legal Services Inc', referrals: 45, totalEarnings: 2250.00, paid: 1800.00, pending: 450.00, status: 'Active' },
    { id: 2, affiliate: 'Real Estate Group', referrals: 32, totalEarnings: 1600.00, paid: 1600.00, pending: 0.00, status: 'Active' },
    { id: 3, affiliate: 'Financial Advisors Ltd', referrals: 28, totalEarnings: 1400.00, paid: 1050.00, pending: 350.00, status: 'Active' },
    { id: 4, affiliate: 'Law Firm Partners', referrals: 21, totalEarnings: 1050.00, paid: 1050.00, pending: 0.00, status: 'Inactive' },
    { id: 5, affiliate: 'Mortgage Brokers Assoc', referrals: 18, totalEarnings: 900.00, paid: 675.00, pending: 225.00, status: 'Active' },
];

const statusOptions = ['All Status', 'Active', 'Inactive'];
const ITEMS_PER_PAGE = 5;

const AffiliatesPayoutsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [sortBy, setSortBy] = useState('Total Earnings');
    const [currentPage, setCurrentPage] = useState(1);
    const [affiliatesData] = useState(initialAffiliatesData);

    // --- Utility Functions ---

    // Get Tailwind classes for status badge
    const getStatusClass = (status) => {
        return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    };

    // Simulated View Action
    const handleView = (id) => {
        alert(`Viewing payout details for Affiliate ID: ${id}`);
    };

    // Simulated Pay Action
    const handlePay = (id) => {
        alert(`Simulating payment for Affiliate ID: ${id}. Amount: $${affiliatesData.find(a => a.id === id)?.pending.toFixed(2)}`);
    };

    // Format currency
    const formatCurrency = (amount) => `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;


    // --- Dynamic Filtering & Sorting Logic ---
    const filteredAndSortedAffiliates = useMemo(() => {
        let filtered = affiliatesData;

        // 1. Filter by Status
        if (selectedStatus !== 'All Status') {
            filtered = filtered.filter(affiliate => affiliate.status === selectedStatus);
        }

        // 2. Search by Text (Affiliate Name)
        if (searchTerm) {
            const lowercasedSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(affiliate =>
                affiliate.affiliate.toLowerCase().includes(lowercasedSearch)
            );
        }

        // 3. Sort (Simple sort by total earnings)
        filtered.sort((a, b) => b.totalEarnings - a.totalEarnings);

        return filtered;
    }, [affiliatesData, selectedStatus, searchTerm, sortBy]);

    // --- Pagination Logic ---
    const totalPages = Math.ceil(filteredAndSortedAffiliates.length / ITEMS_PER_PAGE);
    const paginatedAffiliates = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredAndSortedAffiliates.slice(startIndex, endIndex);
    }, [filteredAndSortedAffiliates, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // --- JSX Rendering ---
    return (
        <div className="bg-white rounded-xl mt-10 shadow-md p-6 lg:p-8 w-full">

            {/* --- Search, Filter, and Sort Bar --- */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

                {/* Search Input */}
                <div className="relative flex-grow max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search affiliates..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex gap-2'>
                    {/* Status Filter (Dropdown) */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    {/* Sort By (Dropdown) */}
                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Total Earnings">Sort By</option>
                        <option value="Total Earnings">Total Earnings</option>
                        <option value="Referrals">Referrals</option>
                        <option value="Pending">Pending Amount</option>
                    </select>
                </div>



            </div>

            {/* --- Data Table --- */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            {['Affiliate', 'Referrals', 'Total Earnings', 'Paid', 'Pending', 'Status', 'Actions'].map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedAffiliates.map((affiliate) => (
                            <tr key={affiliate.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{affiliate.affiliate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{affiliate.referrals}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{formatCurrency(affiliate.totalEarnings)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(affiliate.paid)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">{formatCurrency(affiliate.pending)}</td>

                                {/* Status Badge */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(affiliate.status)}`}>
                                        {affiliate.status}
                                    </span>
                                </td>

                                {/* Actions (View and Pay) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-3">
                                        <button onClick={() => handleView(affiliate.id)} className="text-blue-600 hover:text-blue-900 font-medium flex items-center">
                                            <Eye className="w-4 h-4 mr-1" /> View
                                        </button>
                                        {affiliate.pending > 0 && (
                                            <button onClick={() => handlePay(affiliate.id)} className="text-green-600 hover:text-green-900 font-medium flex items-center">
                                                <DollarSign className="w-4 h-4 mr-1" /> Pay
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No Results Message */}
                {filteredAndSortedAffiliates.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No affiliates found matching your criteria.
                    </div>
                )}
            </div>

            {/* --- Pagination Footer --- */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedAffiliates.length)}</span> of <span className="font-medium">{filteredAndSortedAffiliates.length}</span> results
                </p>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Simple Pagination Buttons */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 mx-0.5 rounded-md text-sm font-medium transition duration-150 ${(index + 1) === currentPage
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

export default AffiliatesPayoutsTable;