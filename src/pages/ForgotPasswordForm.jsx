import React, { useState } from 'react';
// Removed incorrect 'Links' import
import { Link, useNavigate } from 'react-router-dom'; 

const ForgotPasswordForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);


        setTimeout(() => {
            setLoading(false);
            console.log('Password reset requested for:', email);

            // Navigate to the confirmation page and pass the email address in the state
            navigate('/email-confirmation', { 
                state: { 
                    email: email 
                } 
            });

        }, 1500); // 1.5 seconds simulated API delay
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">

            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl transition-all duration-300">
                {/* Cleaned up Link usage (removed redundant button and onClick) */}
                <Link to={"/"}
                    className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-6 transition duration-150"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Login
                </Link>


                {/* Header/Icon Section */}
                <div className="text-center mb-6">
                    {/* Blue Mail Icon */}
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold text-gray-800">
                        Forgot Password?
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Enter your email to receive a reset link
                    </p>
                </div>

                {/* Form and Message Area */}
                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="admin@livenotary.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400 disabled:bg-gray-50"
                        />
                    </div>

                    {/* Status Message (Dynamic) */}
                    {message && (
                        <p className={`text-center text-sm ${message.includes('sent') ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {message}
                        </p>
                    )}

                    {/* Button inside form. No need for Link/Links wrapper */}
                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#2563EB] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-blue-400"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ForgotPasswordForm;