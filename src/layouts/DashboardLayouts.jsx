

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
        <div className="flex min-h-screen bg-blue-50">

            <section className='md:sticky md:top-0 md:h-fit'>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </section>


            <div className="flex flex-col flex-grow">

                <section className='sticky top-0 h-fit'>
                    <TopNavBar
                        onMenuToggle={handleMenuToggle}
                    />
                </section>


                <main className="flex-grow p-4 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;