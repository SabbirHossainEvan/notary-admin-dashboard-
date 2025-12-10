import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            console.log('Login successful for:', email);

            navigate('/dashboard');

        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">

            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transition-all duration-300">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-600">
                        Live Notary Online
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Admin Dashboard
                    </p>
                </div>

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
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out placeholder-gray-400 disabled:bg-gray-50"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:bg-gray-50"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                disabled={loading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember_me" className="ml-2 text-gray-700 select-none">
                                Remember me
                            </label>
                        </div>


                        <Link to={"/forgot-password"}>
                            <a className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                                Forgot Password?
                            </a>
                        </Link>
                    </div>

                    <Link to={"/dashboard"}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-blue-400"
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </Link>

                </form>

                <p className="mt-6 text-center text-xs text-gray-500 px-4">
                    Use any email/password to login. Add "super" in email for Super Admin access.
                </p>

            </div>
        </div>
    );
};

export default LoginForm;