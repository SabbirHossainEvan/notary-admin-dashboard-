import React, { useState, useMemo } from 'react';
import { Search, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Static Data for Jobs ---
const initialJobsData = [
  { id: '#1', client: 'John Doe', notary: 'Emily Davis', type: 'Deed', status: 'Completed', date: '2023-05-20', amount: 75.00 },
  { id: '#2', client: 'Sarah Smith', notary: 'Michael Brown', type: 'Power of Attorney', status: 'In Progress', date: '2023-05-22', amount: 95.00 },
  { id: '#3', client: 'Robert Johnson', notary: 'Emily Davis', type: 'Affidavit', status: 'Scheduled', date: '2023-05-25', amount: 60.00 },
  { id: '#4', client: 'Jane Williams', notary: 'Michael Brown', type: 'Mortgage', status: 'Completed', date: '2023-05-18', amount: 120.00 },
  { id: '#5', client: 'David Miller', notary: 'Emily Davis', type: 'Title Transfer', status: 'Cancelled', date: '2023-05-15', amount: 85.00 },
  { id: '#6', client: 'Alice Cooper', notary: 'Michael Brown', type: 'Deed', status: 'Completed', date: '2023-06-01', amount: 80.00 },
  { id: '#7', client: 'Bob Martin', notary: 'Sarah Wilson', type: 'Affidavit', status: 'Scheduled', date: '2023-06-05', amount: 70.00 },
  { id: '#8', client: 'Charlie Fox', notary: 'Emily Davis', type: 'Title Transfer', status: 'In Progress', date: '2023-06-10', amount: 105.00 },
];

// --- Filter Options ---
const jobTypes = ['All Types', 'Deed', 'Power of Attorney', 'Affidavit', 'Mortgage', 'Title Transfer'];
const jobStatuses = ['All Status', 'Completed', 'In Progress', 'Scheduled', 'Cancelled'];

const ITEMS_PER_PAGE = 5;

const JobsNotarizationsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedDate, setSelectedDate] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsData] = useState(initialJobsData); 

  // --- Utility Functions ---

  // Get Tailwind classes for status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  // Simulated View Action
  const handleView = (id) => {
      alert(`Viewing details for Job ID: ${id}`);
  };


  const handleDownload = (id) => {
      alert(`Downloading document for Job ID: ${id}`);
  };

  const filteredAndSearchedJobs = useMemo(() => {
    let filtered = jobsData;

    // 1. Filter by Type
    if (selectedType !== 'All Types') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // 2. Filter by Status
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(job => job.status === selectedStatus);
    }

  
    if (selectedDate) {
        filtered = filtered.filter(job => job.date === selectedDate);
    }
    
    // 4. Search by Text (ID, Client, Notary, Type, Amount)
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(job => 
        job.id.toLowerCase().includes(lowercasedSearch) ||
        job.client.toLowerCase().includes(lowercasedSearch) ||
        job.notary.toLowerCase().includes(lowercasedSearch) ||
        job.type.toLowerCase().includes(lowercasedSearch) ||
        String(job.amount).includes(lowercasedSearch)
      );
    }

    return filtered;
  }, [jobsData, selectedType, selectedStatus, selectedDate, searchTerm]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAndSearchedJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSearchedJobs.slice(startIndex, endIndex);
  }, [filteredAndSearchedJobs, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper to render pagination buttons
  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-0.5 rounded-md text-sm font-medium transition duration-150 ${
            i === currentPage 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  // --- JSX Rendering ---
  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Jobs & Notarizations</h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 whitespace-nowrap">
          Create New Job
        </button>
      </div>

      {/* --- Filters & Search Bar --- */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-grow min-w-[200px] sm:min-w-[250px] order-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Filter (Dropdown) */}
        <select
          value={selectedType}
          onChange={(e) => {setSelectedType(e.target.value); setCurrentPage(1);}}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-2"
        >
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        {/* Status Filter (Dropdown) */}
        <select
          value={selectedStatus}
          onChange={(e) => {setSelectedStatus(e.target.value); setCurrentPage(1);}} 
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-3"
        >
          {jobStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        {/* Date Filter (Input Type=Date) */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {setSelectedDate(e.target.value); setCurrentPage(1);}} 
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-4"
          placeholder="mm/dd/yyyy" 
        />
        
      </div>

      {/* --- Data Table --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {['ID', 'Client', 'Notary', 'Type', 'Status', 'Date', 'Amount', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedJobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.notary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type}</td>
                
                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">${job.amount.toFixed(2)}</td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleView(job.id)} className="text-blue-600 hover:text-blue-900 font-medium">
                      View
                    </button>
                    <button onClick={() => handleDownload(job.id)} className="text-green-600 hover:text-green-900 font-medium">
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results Message */}
        {filteredAndSearchedJobs.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No jobs found matching your criteria.
          </div>
        )}
      </div>

      {/* --- Pagination Footer --- */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSearchedJobs.length)}</span> of <span className="font-medium">{filteredAndSearchedJobs.length}</span> results
        </p>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {renderPaginationButtons()}

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

export default JobsNotarizationsTable;