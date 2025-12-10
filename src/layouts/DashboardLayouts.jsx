

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavBar from '../components/TopNavBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <section>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </section>


            {/* 2. Main Content Area */}
            <div className="flex flex-col flex-grow">

                {/* Top Navigation Bar */}
                <TopNavBar
                    onMenuToggle={handleMenuToggle}
                />

                <main className="flex-grow p-4 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;