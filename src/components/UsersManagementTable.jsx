
import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  Check,
  X,
  Star,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  DollarSign,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// -------------------- Data (Same as before) --------------------
const customerData = [
  {
    id: 101,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    requests: 12,
    completed: 10,
    status: "Active",
    memberSince: "2023-01-15",
  },
  {
    id: 102,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-5678",
    requests: 8,
    completed: 8,
    status: "Active",
    memberSince: "2022-11-20",
  },
  {
    id: 103,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-9012",
    requests: 5,
    completed: 3,
    status: "Suspended",
    memberSince: "2024-03-01",
  },
];

const notaryData = [
  {
    id: 201,
    name: "Sarah Wilson",
    email: "sarah@notary.com",
    phone: "555-2345",
    state: "CA",
    license: "CA12345",
    jobs: 45,
    rating: 4.8,
    fee: "$50",
    status: "Approved",
    joined: "2021-05-10",
  },
  {
    id: 202,
    name: "Mike Brown",
    email: "mike@notary.com",
    phone: "555-6789",
    state: "NY",
    license: "NY67890",
    jobs: 32,
    rating: 4.6,
    fee: "$45",
    status: "Approved",
    joined: "2022-08-25",
  },
  {
    id: 203,
    name: "Lisa Davis",
    email: "lisa@notary.com",
    phone: "555-0123",
    state: "TX",
    license: "TX54321",
    jobs: 28,
    rating: 4.9,
    fee: "$55",
    status: "Pending",
    joined: "2024-01-05",
  },
];

const affiliateData = [
  {
    id: 301,
    name: "Tech Solutions LLC",
    email: "tech@example.com",
    phone: "555-3456",
    referrals: 45,
    commission: "$2,250",
    status: "Active",
    signedUp: "2023-07-01",
  },
  {
    id: 302,
    name: "Legal Services Inc",
    email: "legal@example.com",
    phone: "555-7890",
    referrals: 32,
    commission: "$1,600",
    status: "Active",
    signedUp: "2022-03-15",
  },
  {
    id: 303,
    name: "Business Hub",
    email: "hub@example.com",
    phone: "555-1230",
    referrals: 28,
    commission: "$1,400",
    status: "Pending",
    signedUp: "2024-04-10",
  },
];

const tabConfig = [
  {
    key: "customers",
    label: "Customers",
    count: customerData.length,
    data: customerData,
    icon: User,
  },
  {
    key: "notaries",
    label: "Notaries",
    count: notaryData.length,
    data: notaryData,
    icon: Briefcase,
  },
  {
    key: "affiliates",
    label: "Affiliates",
    count: affiliateData.length,
    data: affiliateData,
    icon: DollarSign,
  },
];

// -------------------- Confirmation Modal Component --------------------

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemLabel,
  itemName,
  actionType,
}) => {
  if (!isOpen) return null;

  const isReject = actionType === "REJECT";

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-transparent bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-sm my-8 overflow-hidden transition-all transform bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-headline"
      >
        <div className="p-6 text-center">
          <AlertTriangle
            className={`w-12 h-12 mx-auto ${
              isReject ? "text-red-500" : "text-red-600"
            }`}
          />
          <h3
            id="confirm-modal-headline"
            className="mt-4 text-lg font-bold text-gray-900"
          >
            {isReject ? "Confirm Rejection" : "Confirm Deletion"}
          </h3>
          <div className="mt-2 text-sm text-gray-500">
            Are you sure you want to {isReject ? "reject" : "delete"} this{" "}
            {itemLabel}?
            <p className="font-semibold text-gray-800 mt-1">({itemName})</p>
            This action cannot be undone.
          </div>
        </div>

        <div className="flex justify-around p-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="w-full mr-2 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`w-full ml-2 py-2.5 text-sm font-medium text-white ${
              isReject
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-700 hover:bg-red-800"
            } border border-transparent rounded-lg transition-colors shadow-md`}
          >
            {isReject ? "Reject Notary" : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- User Details Modal Component (Same as before) --------------------
const UserDetailsModal = ({ isOpen, onClose, user, userType }) => {
  if (!isOpen || !user) return null;

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

  // Auxiliary function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-transparent bg-opacity-60 backdrop-blur-sm">
      {/* Background Overlay */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      {/* Modal Content Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative w-full max-w-lg my-8 overflow-hidden transition-all transform bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 p-5">
            <h3 id="modal-headline" className="text-xl font-bold text-white">
              Details: {user.name} ({userType})
            </h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Common Details */}
              {user.email && renderDetail(Mail, "Email", user.email)}
              {user.phone && renderDetail(Phone, "Phone", user.phone)}

              {/* Customer Specific */}
              {userType === "Customer" && (
                <>
                  {renderDetail(
                    Calendar,
                    "Member Since",
                    formatDate(user.memberSince)
                  )}
                  {renderDetail(FileText, "Requests", user.requests)}
                  {renderDetail(Check, "Completed", user.completed)}
                  {renderDetail(User, "Status", user.status)}
                </>
              )}

              {/* Notary Specific */}
              {userType === "Notary" && (
                <>
                  {renderDetail(MapPin, "State", user.state)}
                  {renderDetail(FileText, "License", user.license)}
                  {renderDetail(Briefcase, "Jobs Completed", user.jobs)}
                  {renderDetail(DollarSign, "Fee", user.fee)}
                  {renderDetail(Star, "Rating", `${user.rating} / 5.0`)}
                  {renderDetail(User, "Status", user.status)}
                  {renderDetail(
                    Calendar,
                    "Joined Date",
                    formatDate(user.joined)
                  )}
                </>
              )}

              {/* Affiliate Specific */}
              {userType === "Affiliate" && (
                <>
                  {renderDetail(
                    Calendar,
                    "Signed Up",
                    formatDate(user.signedUp)
                  )}
                  {renderDetail(FileText, "Total Referrals", user.referrals)}
                  {renderDetail(
                    DollarSign,
                    "Total Commission",
                    user.commission
                  )}
                  {renderDetail(User, "Status", user.status)}
                </>
              )}
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
    </div>
  );
};

// -------------------- Main Component --------------------
const UsersManagementTable = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");

  // States for View Details Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // States for Delete Confirmation Modal (Customers/Affiliates)
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // NEW: States for Reject Confirmation Modal (Notaries)
  const [isRejectConfirmModalOpen, setIsRejectConfirmModalOpen] =
    useState(false);
  const [notaryToReject, setNotaryToReject] = useState(null);

  const currentTab = tabConfig.find((tab) => tab.key === activeTab);

  // --- Delete Handlers (Customers/Affiliates) ---

  // 1. Trigger Delete Confirmation Modal
  const handleDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteConfirmModalOpen(true);
  };

  // 2. Perform actual delete action
  const confirmDelete = () => {
    if (!itemToDelete) return;

    const typeLabel = activeTab === "customers" ? "Customer" : "Affiliate";

    alert(
      `${typeLabel} ID ${itemToDelete.id} (${
        itemToDelete.name || itemToDelete.email
      }) deleted successfully! (Simulated)`
    );

    // Close modal and reset state
    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setItemToDelete(null);
  };
  // -----------------------

  // --- Notary Reject Handlers ---

  // 1. Trigger Reject Confirmation Modal
  const handleRejectNotary = (notary) => {
    setNotaryToReject(notary);
    setIsRejectConfirmModalOpen(true);
  };

  // 2. Perform actual Reject action
  const confirmRejectNotary = () => {
    if (!notaryToReject) return;

    // Simulate Notary Rejection (API Call here in a real app)
    alert(
      `Notary ID ${notaryToReject.id} (${notaryToReject.name}) rejected successfully! (Simulated)`
    );

    // Close modal and reset state
    setIsRejectConfirmModalOpen(false);
    setNotaryToReject(null);
  };

  const cancelReject = () => {
    setIsRejectConfirmModalOpen(false);
    setNotaryToReject(null);
  };
  // -----------------------

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Suspended":
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };


  const handleNotaryAction = (id, action) => {
    alert(`Notary ID ${id} was ${action} (Simulated).`);
  };

  // --- MODAL HANDLERS (View Details) ---
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  // ----------------------

  const filteredData = useMemo(() => {
    if (!searchTerm) return currentTab.data;
    const lowercasedSearch = searchTerm.toLowerCase();
    return currentTab.data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [searchTerm, currentTab]);

  const getHeaders = (key) => {
    switch (key) {
      case "customers":
        return ["Name", "Email", "Requests", "Completed", "Status"];
      case "notaries":
        return ["Name", "State", "License", "Jobs", "Rating", "Fee", "Status"];
      case "affiliates":
        return ["Business Name", "Email", "Referrals", "Commission", "Status"];
      default:
        return [];
    }
  };

  // -------------------- PDF Export --------------------
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Users Management - ${currentTab.label}`, 14, 20);

    const headers = [getHeaders(activeTab)];
    const rows = filteredData.map((item) => {
      if (activeTab === "customers")
        return [
          item.name,
          item.email,
          item.requests,
          item.completed,
          item.status,
        ];
      if (activeTab === "notaries")
        return [
          item.name,
          item.state,
          item.license,
          item.jobs,
          item.rating,
          item.fee,
          item.status,
        ];
      if (activeTab === "affiliates")
        return [
          item.name,
          item.email,
          item.referrals,
          item.commission,
          item.status,
        ];
      return [];
    });

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      styles: { fontSize: 10 },
    });

    doc.save(`${currentTab.label}.pdf`);
  };

  const renderRow = (item, key) => {
    if (key === "customers") {
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.requests}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.completed}
          </td>
        </>
      );
    }
    if (key === "notaries") {
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.state}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.license}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.jobs}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />{" "}
            {item.rating}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
            {item.fee}
          </td>
        </>
      );
    }
    if (key === "affiliates") {
      return (
        <>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.email}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.referrals}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
            {item.commission}
          </td>
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
            onClick={() => {
              setActiveTab(tab.key);
              setSearchTerm(""); // Clear search on tab change
            }}
            className={`
                            pb-3 text-lg font-medium transition duration-150 flex items-center
                            ${
                              activeTab === tab.key
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                            }
                        `}
          >
            {React.createElement(tab.icon, { className: "w-5 h-5 mr-1" })}
            {tab.label}{" "}
            <span className="text-sm font-normal text-gray-400 ml-1">
              {tab.count}
            </span>
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr key={user.id}>
                {renderRow(user, activeTab)}

                {/* Status Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {activeTab === "notaries" ? (
                      <>
                        {/* Notary Actions (Approve/Reject) */}
                        <button
                          onClick={() =>
                            handleNotaryAction(user.id, "Approved")
                          }
                          className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                          title="Approve Notary"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        {/* NEW: Reject button now triggers confirmation modal */}
                        <button
                          onClick={() => handleRejectNotary(user)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Reject Notary"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      /* Customer/Affiliate Action (Delete) */
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        title={`Delete ${currentTab.label.slice(0, -1)}`}
                      >
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

      {/* 1. User Details Modal */}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
        userType={
          activeTab === "customers"
            ? "Customer"
            : activeTab === "notaries"
            ? "Notary"
            : "Affiliate"
        }
      />

      {/* 2. Confirmation Modal for Deletion (Customers/Affiliates) */}
      <ConfirmationModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemLabel={activeTab === "customers" ? "Customer" : "Affiliate"}
        itemName={itemToDelete ? itemToDelete.name || itemToDelete.email : ""}
        actionType="DELETE"
      />

      {/* 3. NEW: Confirmation Modal for Rejection (Notaries) */}
      <ConfirmationModal
        isOpen={isRejectConfirmModalOpen}
        onClose={cancelReject}
        onConfirm={confirmRejectNotary}
        itemLabel={"Notary"}
        itemName={notaryToReject ? notaryToReject.name : ""}
        actionType="REJECT"
      />
    </div>
  );
};

export default UsersManagementTable;
