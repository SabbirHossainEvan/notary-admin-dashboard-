import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Calendar,
  DollarSign,
  User,
  Briefcase,
} from "lucide-react";

// --- Static Data for Jobs ---
const initialJobsData = [
  {
    id: "#1",
    client: "John Doe",
    notary: "Emily Davis",
    type: "Deed",
    status: "Completed",
    date: "2023-05-20",
    amount: 75.0,
    description: "Finalizing sale deed for property transfer in downtown area.",
    location: "123 Main St, Cityville",
  },
  {
    id: "#2",
    client: "Sarah Smith",
    notary: "Michael Brown",
    type: "Power of Attorney",
    status: "In Progress",
    date: "2023-05-22",
    amount: 95.0,
    description: "Drafting and notarizing general Power of Attorney document.",
    location: "456 Oak Ave, Townsville",
  },
  {
    id: "#3",
    client: "Robert Johnson",
    notary: "Emily Davis",
    type: "Affidavit",
    status: "Scheduled",
    date: "2023-05-25",
    amount: 60.0,
    description: "Affidavit of residency for immigration purposes.",
    location: "789 Pine Ln, Villageton",
  },
  {
    id: "#4",
    client: "Jane Williams",
    notary: "Michael Brown",
    type: "Mortgage",
    status: "Completed",
    date: "2023-05-18",
    amount: 120.0,
    description: "Loan signing and mortgage document notarization.",
    location: "101 Maple Rd, Cityville",
  },
  {
    id: "#5",
    client: "David Miller",
    notary: "Emily Davis",
    type: "Title Transfer",
    status: "Cancelled",
    date: "2023-05-15",
    amount: 85.0,
    description: "Cancellation requested by client before signing.",
    location: "202 Elm St, Townsville",
  },
  {
    id: "#6",
    client: "Alice Cooper",
    notary: "Michael Brown",
    type: "Deed",
    status: "Completed",
    date: "2023-06-01",
    amount: 80.0,
    description: "Quick claim deed preparation and signing.",
    location: "303 Birch Ave, Villageton",
  },
  {
    id: "#7",
    client: "Bob Martin",
    notary: "Sarah Wilson",
    type: "Affidavit",
    status: "Scheduled",
    date: "2023-06-05",
    amount: 70.0,
    description: "Witnessing and notarizing medical affidavit.",
    location: "404 Cedar Dr, Cityville",
  },
  {
    id: "#8",
    client: "Charlie Fox",
    notary: "Emily Davis",
    type: "Title Transfer",
    status: "In Progress",
    date: "2023-06-10",
    amount: 105.0,
    description: "Vehicle title transfer documentation processing.",
    location: "505 Willow Rd, Townsville",
  },
];

// --- Job Details Modal Component ---
const JobDetailsModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  const renderDetail = (Icon, label, value) => (
    <div className="flex items-start space-x-3 text-gray-700">
      <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />{" "}
      <div>
        {" "}
        <span className="text-sm font-medium text-gray-500">{label}:</span>{" "}
        <p className="text-base font-semibold text-gray-800 break-words">
          {value}{" "}
        </p>
        {" "}
      </div>
      {" "}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-transparent bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {" "}
      <div
        className="relative w-full max-w-lg my-8 overflow-hidden transition-all transform bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-headline"
      >
        {/* Header */}{" "}
        <div className="flex justify-between items-center bg-blue-600 p-5">
          {" "}
          <h3 id="job-modal-headline" className="text-xl font-bold text-white">
            Job Details: {job.id}{" "}
          </h3>{" "}
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />{" "}
          </button>{" "}
        </div>
        {/* Body */}{" "}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderDetail(User, "Client Name", job.client)}
            {renderDetail(Briefcase, "Notary Assigned", job.notary)}
            {renderDetail(FileText, "Document Type", job.type)}{" "}
            {renderDetail(
              DollarSign,
              "Fee/Amount",
              `$${job.amount.toFixed(2)}`
            )}
            {renderDetail(Calendar, "Scheduled Date", job.date)}
            {renderDetail(Eye, "Status", job.status)}{" "}
          </div>{" "}
          <div className="mt-6 border-t pt-4">
            {" "}
            <p className="text-sm font-medium text-gray-500 mb-1">
              Description:{" "}
            </p>{" "}
            <p className="text-base text-gray-800">{job.description}</p>{" "}
          </div>{" "}
          <div className="mt-4">
            {" "}
            <p className="text-sm font-medium text-gray-500 mb-1">Location: </p>
            <p className="text-base text-gray-800">{job.location}</p>{" "}
          </div>{" "}
        </div>
        <div className="flex justify-end p-4 border-t border-gray-100">
          {" "}
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Close{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

// --- Filter Options ---
const jobTypes = [
  "All Types",
  "Deed",
  "Power of Attorney",
  "Affidavit",
  "Mortgage",
  "Title Transfer",
];
const jobStatuses = [
  "All Status",
  "Completed",
  "In Progress",
  "Scheduled",
  "Cancelled",
];
const ITEMS_PER_PAGE = 5;

const JobsNotarizationsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsData, setJobsData] = useState(initialJobsData); 

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [newJob, setNewJob] = useState({
    client: "",
    notary: "",
    type: "Deed",
    status: "Completed",
    date: "",
    amount: "",
  }); // --- Utility Functions ---

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDownload = (id) =>
    alert(`Downloading document for Job ID: ${id}`); 

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false); 

  const handleView = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewJob = (e) => {
    e.preventDefault();
    const jobToAdd = {
      id: `#${jobsData.length + 1}`,
      client: newJob.client,
      notary: newJob.notary,
      type: newJob.type,
      status: newJob.status,
      date: newJob.date,
      amount: parseFloat(newJob.amount),
      description: "New job created manually.", 
      location: "N/A", 
    };
    setJobsData((prev) => [jobToAdd, ...prev]);
    setNewJob({
      client: "",
      notary: "",
      type: "Deed",
      status: "Completed",
      date: "",
      amount: "",
    });
    setCurrentPage(1);
    closeCreateModal();
    alert("New job added successfully!");
  }; // --- Filtering & Search ---

  const filteredAndSearchedJobs = useMemo(() => {
    let filtered = jobsData;
    if (selectedType !== "All Types")
      filtered = filtered.filter((job) => job.type === selectedType);
    if (selectedStatus !== "All Status")
      filtered = filtered.filter((job) => job.status === selectedStatus);
    if (selectedDate)
      filtered = filtered.filter((job) => job.date === selectedDate);
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.id.toLowerCase().includes(lower) ||
          job.client.toLowerCase().includes(lower) ||
          job.notary.toLowerCase().includes(lower) ||
          job.type.toLowerCase().includes(lower) ||
          String(job.amount).includes(lower)
      );
    }
    return filtered;
  }, [jobsData, selectedType, selectedStatus, selectedDate, searchTerm]); 

  const totalPages = Math.ceil(filteredAndSearchedJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSearchedJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSearchedJobs, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-0.5 rounded-md text-sm font-medium transition duration-150 ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}{" "}
        </button>
      );
    }
    return pages;
  }; // --- JSX ---

  return (
    <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 w-full">
      {/* Header */}{" "}
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h2 className="text-2xl font-bold text-gray-800">
          Jobs & Notarizations{" "}
        </h2>{" "}
        <button
          onClick={openCreateModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 whitespace-nowrap"
        >
          Create New Job {" "}
        </button>
        {" "}
      </div>
       {/* Filters & Search */} {" "}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {" "}
        <div className="relative flex-grow min-w-[200px] sm:min-w-[250px] order-1">
          {" "}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {" "}
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {" "}
        </div>
        {" "}
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-2"
        >
          {" "}
          {jobTypes.map((type) => (
            <option key={type} value={type}>
               {type}{" "}
            </option>
          ))}
          {" "}
        </select>
       {" "}
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-3"
        >
         {" "}
          {jobStatuses.map((status) => (
            <option key={status} value={status}>
               {status}{" "}
            </option>
          ))}
          {" "}
        </select>
        {" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1);
          }}
          className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 order-4"
        />
        {" "}
      </div>
       {/* Table */}{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full divide-y divide-gray-200">
          {" "}
          <thead>
            {" "}
            <tr className="bg-gray-50">
              {" "}
              {[
                "ID",
                "Client",
                "Notary",
                "Type",
                "Status",
                "Date",
                "Amount",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                 {header}{" "}
                </th>
              ))}
              {" "}
            </tr>
        {" "}
          </thead>
      {" "}
          <tbody className="bg-white divide-y divide-gray-200">
            {" "}
            {paginatedJobs.map((job) => (
              <tr key={job.id}>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {job.id}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.client}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.notary}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {job.type}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap">{" "}
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                      job.status
                    )}`}
                  >
                     {job.status} {" "}
                  </span>
                  {" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.date}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                 ${job.amount.toFixed(2)}{" "}
                </td>
                {" "}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                  {" "}
                  
                  {" "}
                  <button
                    onClick={() => handleView(job)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                     View {" "}
                  </button>
                   {" "}
                  <button
                    onClick={() => handleDownload(job.id)}
                    className="text-green-600 hover:text-green-900 font-medium"
                  >
                     Download  {" "}
                  </button>
                  {" "}
                </td>
                 {" "}
              </tr>
            ))}
            {" "}
          </tbody>
      {" "}
        </table>
    {" "}
        {filteredAndSearchedJobs.length === 0 && (
          <div className="text-center py-10 text-gray-500">
              No jobs found matching your criteria. {" "}
          </div>
        )}
        {" "}
      </div>
       {/* Pagination */}{" "}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        {" "}
        <p className="text-sm text-gray-700">
          Showing {" "}
          <span className="font-medium">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
          </span>{" "}
          to {" "}
          <span className="font-medium">
            {" "}
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredAndSearchedJobs.length
            )}
            {" "}
          </span>{" "}
          of {" "}
          <span className="font-medium">{filteredAndSearchedJobs.length}</span>{" "}
               results    {" "}
        </p>
           {" "}
        <div className="flex items-center space-x-1">
              {" "}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
                  <ChevronLeft className="w-5 h-5" />    {" "}
          </button>
               {renderPaginationButtons()}    {" "}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
                  <ChevronRight className="w-5 h-5" />    {" "}
          </button>
             {" "}
        </div>
          {" "}
      </div>
       {/* 1. Create New Job Modal */}{" "}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-60 backdrop-blur-sm">
          {" "}
          <div
            className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <button
              onClick={closeCreateModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
            >
               <X className="w-6 h-6" />{" "}
            </button>
            {" "}
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            {" "}
            <form onSubmit={handleSubmitNewJob} className="space-y-4">
              {" "}
              <input
                type="text"
                name="client"
                placeholder="Client Name"
                value={newJob.client}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {" "}
              <input
                type="text"
                name="notary"
                placeholder="Notary Name"
                value={newJob.notary}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {" "}
              <select
                name="type"
                value={newJob.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                       {" "}
                {jobTypes
                  .filter((t) => t !== "All Types")
                  .map((t) => (
                    <option key={t} value={t}>
                       {t}         {" "}
                    </option>
                  ))}
                      {" "}
              </select>
                    {" "}
              <select
                name="status"
                value={newJob.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                       {" "}
                {jobStatuses
                  .filter((s) => s !== "All Status")
                  .map((s) => (
                    <option key={s} value={s}>
                       {s}{" "}
                    </option>
                  ))}
                {" "}
              </select>
                    {" "}
              <input
                type="date"
                name="date"
                value={newJob.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
                    {" "}
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newJob.amount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              {" "}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                 Add Job {" "}
              </button>
              {" "}
            </form>
            {" "}
          </div>
          {" "}
        </div>
      )}
      {/* 2. Job Details Modal */}{" "}
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        job={selectedJob}
      />
      {" "}
    </div>
  );
};

export default JobsNotarizationsTable;
