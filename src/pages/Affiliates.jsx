

import React, { useState } from 'react';
import AffiliatesKpiSection from '../components/AffiliatesKpiSection';
import AffiliatesPayoutsTable from '../components/AffiliatesPayoutsTable';
import AffiliateForm from '../components/AffiliateForm';

export default function Affiliates() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl mt-10 font-bold text-gray-800">Affiliates & Commissions</h2>
        <button 
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 whitespace-nowrap"
        >
          Add New Affiliate
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-lg">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Affiliate</h2>

            <AffiliateForm closeModal={closeModal} />
          </div>
        </div>
      )}

      <AffiliatesKpiSection /> 
      <AffiliatesPayoutsTable />
    </div>
  );
}
