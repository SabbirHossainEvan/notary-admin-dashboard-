
import React from 'react';
import { FaRegBell } from "react-icons/fa";
const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const BellIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-6-6H4a6 6 0 00-6 6v3.158a2.032 2.032 0 01-.595 1.437L2 17h5m-2 0a2 2 0 104 0h-4z" /></svg>
);

const TopNavBar = ({ onMenuToggle }) => {
    return (
        <header className="flex items-center justify-between h-16 bg-white border-b border-b-gray-300 px-4 lg:px-8 ">
            
            <div className="flex items-center">

                <button
                    onClick={onMenuToggle}
                    className="p-2 mr-4 text-gray-600 lg:hidden hover:text-blue-600 transition-colors"
                    aria-label="Toggle navigation menu"
                >
                    <MenuIcon className="h-6 w-6" />
                </button>

                {/* Title Section */}
                <h2 className="text-xl font-semibold text-gray-800">
                    <span className="">Dashboard</span>
                </h2>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <button 
                    className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Notifications"
                >
                    <FaRegBell className='w-6 h-6' />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default TopNavBar;