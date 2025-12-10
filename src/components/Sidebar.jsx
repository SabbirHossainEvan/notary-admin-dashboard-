

import React from 'react';
import { Link, Links, useLocation } from 'react-router-dom';

import {
    FaThLarge,       
    FaUsers,         
    FaFileAlt,       
    FaUserFriends,   
    FaDollarSign,    
    FaUserCircle,   
    FaSignOutAlt,    
    FaTimes          
} from 'react-icons/fa';


const navItems = [
    { name: 'Dashboard', icon: FaThLarge, link: '/dashboard' },
    { name: 'Users', icon: FaUsers, link: '/dashboard/users' },
    { name: 'Jobs', icon: FaFileAlt, link: '/dashboard/jobs' },
    { name: 'Affiliates', icon: FaUserFriends, link: '/dashboard/affiliates' },
    { name: 'Payments', icon: FaDollarSign, link: '/dashboard/payments' },
    { name: 'Profile', icon: FaUserCircle, link: '/dashboard/profile' },
];

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (linkPath) => {
        if (linkPath === '/dashboard') {
            return currentPath === '/dashboard' || currentPath === '/dashboard/';
        }
        return currentPath.startsWith(linkPath);
    };

    const overlayClass = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible';
    const sidebarClass = isOpen ? 'translate-x-0' : '-translate-x-full';

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-300 lg:hidden ${overlayClass}`}
                onClick={onClose}
            ></div>

            {/* 2. Sidebar Content */}
            <div className={`
                fixed top-0 left-0 h-full w-64 border-r border-r-gray-300 bg-white shadow-2xl z-50 
                transform transition-transform duration-300 ease-in-out
                
                /* Desktop/Large Screen Styling */
                lg:translate-x-0 lg:static lg:shadow-none lg:w-64 lg:flex-shrink-0 
                
                ${sidebarClass}
            `}>

                {/* Logo and Close Button Section */}
                <div className="p-4 border-b border-b-gray-300 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-blue-600">Live Notary</h1>
                        <p className="text-xs text-gray-500 mb-2">Admin Dashboard</p>
                    </div>

                    {/* Close Button (Visible only on Mobile) */}
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-700 transition-colors lg:hidden"
                        aria-label="Close sidebar menu"
                    >

                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.link}
                            onClick={onClose}
                            className={`
                                flex items-center p-3 rounded-lg text-gray-700 font-medium transition-colors duration-150
                                ${isActive(item.link)
                                    ? 'bg-blue-100 text-blue-600 font-semibold' 
                                    : 'hover:bg-gray-50 hover:text-blue-500' 
                                }
                            `}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* User/Logout Section */}
                <div className="p-4 absolute bottom-0 w-full border-t border-t-gray-300">
                    <p className="text-sm font-semibold text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-500 truncate">admin@livenotary.com</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded bg-blue-50 text-blue-600">
                        Admin
                    </span>

                    <Link to={"/"}>
                        <button className="flex items-center text-red-500 hover:text-red-700 mt-4 text-sm font-medium transition-colors">
                            <FaSignOutAlt className="h-5 w-5 mr-2" />
                            Logout
                        </button>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Sidebar;