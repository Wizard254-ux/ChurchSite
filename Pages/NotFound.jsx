import React from 'react';
import { AlertCircle, ArrowLeft, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound= () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-indigo-500"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.1,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content Card */}
      <div className="relative max-w-lg w-full mx-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-center flex-col text-center mb-8">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
              <AlertCircle size={50} className="text-red-500" />
            </div>
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 max-w-md">
              Oops! The page you are looking for seems to have wandered off into the digital wilderness.
            </p>
          </div>
          
          {/* Actions */}
          <div className="space-y-4">
            <button onClick={()=>navigate('/')} className="w-full flex items-center cursor-pointer justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition duration-300 shadow-md">
              <Home size={20} />
              <span>Back to Homepage</span>
            </button>
            
            <div className="flex gap-4">
              <button onClick={()=>navigate(-1)} className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition duration-300 shadow-sm">
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </button>
              
             
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 text-center text-gray-500 text-sm">
          Need assistance? <a href="#" className="text-indigo-600 hover:text-indigo-800 underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;