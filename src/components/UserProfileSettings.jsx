import React, { useState } from 'react';

const ProfileIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="64" 
        height="64" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-white bg-blue-500 rounded-full p-2"
    >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const UserProfileSettings = ({ initialProfile = {} }) => {

    const [fullName, setFullName] = useState(initialProfile.fullName || 'Admin User');
    const [email, setEmail] = useState(initialProfile.email || 'admin@laundryservice.com');
    

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    
    // Handler for updating Full Name and Email
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log('Updating Profile:', { fullName, email });
        // Add your API call to update profile data here
    };


    const handleChangePassword = (e) => {
        e.preventDefault(); 

        
        console.log('Changing Password:', { currentPassword, newPassword, confirmNewPassword });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
                            {/* System Settings Header */}
                <div className="mb-8 m-10">
                    <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
                    <p className="text-gray-500 text-sm">Configure your application settings</p>
                </div>
                

            <div className="bg-white p-6 rounded-lg border border-gray-200 m-10">
                
                {/* Profile Form Layout */}
                <form 
                    onSubmit={handleUpdateProfile} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6"
                >
                    
                    {/* === Admin Profile Section === */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 hidden md:block">Admin Profile</h3>
                        
                        {/* Profile Picture */}
                        <div className="flex items-center space-x-4 mb-6">
                            <ProfileIcon />
                            <button 
                                type="button"
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                onClick={() => alert('Change Profile Picture functionality goes here')}
                            >
                                Change Profile Picture
                            </button>
                        </div>
                        
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Admin User"
                            />
                        </div>
                        
                        {/* Email Address Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="admin@laundryservice.com"
                            />
                        </div>
                    </div>

                    
                    {/* === Change Password Section === */}
                    <div className="space-y-6">
                         <h3 className="text-lg font-bold text-gray-800 mt-15 mb-4">Change Password</h3>
                        
                        {/* Current Password Input */}
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium pb-3 text-gray-700">
                                Current Password
                            </label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter current password"
                            />
                        </div>

                        {/* New Password Input */}
                        <div>
                            <label htmlFor="newPassword" className="pb-3 block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Enter new password"
                            />
                        </div>

                        {/* Confirm New Password Input */}
                        <div>
                            <label htmlFor="confirmNewPassword" className="pb-3 block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmNewPassword"
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                placeholder="Confirm new password"
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 md:pt-16">

                            <button
                                type="submit" 
                                onClick={(e) => {
                                    handleUpdateProfile(e);
                                    if (currentPassword || newPassword || confirmNewPassword) {
                                        handleChangePassword(e);
                                    }
                                }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfileSettings;