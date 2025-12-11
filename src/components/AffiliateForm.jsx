import React, { useState } from 'react';



const AffiliateForm = ({ closeModal }) => {
  const [newAffiliate, setNewAffiliate] = useState({
    affiliate: '',
    referrals: '0', 
    totalEarnings: '0',
    paid: '0',
    pending: '0',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAffiliate(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    window.dispatchEvent(new CustomEvent('addAffiliate', { detail: newAffiliate }));
    
    // Close the modal
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        name="affiliate" 
        placeholder="Affiliate Name" 
        value={newAffiliate.affiliate} 
        onChange={handleInputChange} 
        required 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
      />
      <input 
        type="text" 
        name="referrals" 
        placeholder="Referrals" 
        value={newAffiliate.referrals} 
        onChange={handleInputChange} 

        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
      />
      <input 
        type="number" 
        name="totalEarnings" 
        placeholder="Total Earnings" 
        value={newAffiliate.totalEarnings} 
        onChange={handleInputChange} 
        required 
        step="0.01"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
      />
      <input 
        type="number" 
        name="paid" 
        placeholder="Paid Amount" 
        value={newAffiliate.paid} 
        onChange={handleInputChange} 
        required 
        step="0.01"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
      />
      <input 
        type="number" 
        name="pending" 
        placeholder="Pending Amount" 
        value={newAffiliate.pending} 
        onChange={handleInputChange} 
        required 
        step="0.01"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
      />
      <select 
        name="status" 
        value={newAffiliate.status} 
        onChange={handleInputChange} 
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
        Add Affiliate
      </button>
    </form>
  );
};

export default AffiliateForm;