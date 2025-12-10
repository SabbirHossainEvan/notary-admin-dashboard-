import React from 'react';
import { Link } from 'react-router-dom'; 

/**
 * A component to confirm that a password reset link has been sent.
 *
 * @param {object} props - The component props.
 * @param {string} props.email - The email address the link was sent to.
 * @param {number} [props.validityMinutes=10] - The number of minutes the link is valid for.
 * @param {function} [props.onBackToLogin] - Handler for the "Back to Login" button click.
 */
const CheckEmailConfirmation = ({ 
  email, 
  validityMinutes = 10, 
  onBackToLogin 
}) => {
  return (
    // Outer container for centering and light background
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      
      {/* Card container - responsive sizing and shadow */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center 
                      transform transition duration-300 hover:shadow-3xl">
        
        {/* Email Icon Circle */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            {/* Simple SVG envelope icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="22 7 12 13 2 7" />
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
          Check Your Email
        </h2>
        
        {/* Message */}
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          We have sent a password reset link to <br/>
          <span className="font-bold text-blue-600 break-all">{email}</span>. 
          The link is valid for <span className="font-semibold">{validityMinutes} minutes</span>.
        </p>
        
        {/* Back to Login Button */}
        <Link to={"/"}>
                    <button
          onClick={onBackToLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                     font-medium py-3 rounded-lg transition duration-150 
                     focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
                     shadow-md hover:shadow-lg"
        >
          Back to Login
        </button>
        </Link>

      </div>
    </div>
  );
};

export default CheckEmailConfirmation;