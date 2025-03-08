import React, { useState } from 'react';
import { Phone, Lock, ChevronRight, Church } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  
  // You'll replace this with your actual church image URL
  const churchImageUrl = "https://media.istockphoto.com/id/628328400/photo/ephesus-seventh-day-adventist-church-harlem-new-york-city-united-states.jpg?s=612x612&w=0&k=20&c=3HlXA0agCfilzzWhv_SSO2ekI089OiKzENsyC_KPJrs="; // Placeholder - replace with your church image
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/overview')
    // Handle login logic here
    console.log('Login attempt with:', { phoneNumber, password });
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative flex items-center justify-center" 
         style={{ backgroundImage: `url('${churchImageUrl}')` }}>
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/50 to-black/80"></div>
      
      <div className="w-full max-w-md px-4 py-2 relative z-10">
        {/* Church logo and name at the top */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-1 bg-white/10 backdrop-blur-sm rounded-full mb-1">
            <Church className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">SDA Church</h1>
          <p className="text-white/80 mt-1">Administrator Portal</p>
        </div>
        
        {/* Glass card for login */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/30">
          {/* Login form header */}
          <div className="px-6 py-2 border-b border-white/30">
            <h2 className="text-xl font-semibold text-white">Sign in</h2>
            <p className="text-white/70 text-sm mt-1">Access your church administration panel</p>
          </div>
          
          {/* Login form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-white text-sm font-medium mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/50"
                    placeholder="(0713) 459-789"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-white text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/50"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full cursor-pointer bg-white text-gray-900 hover:bg-white/90 font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                Sign In <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              
              <div className="mt-2 text-center">
                <a href="#" className="text-white/80 hover:text-white text-sm transition duration-300">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bible verse at the bottom */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm italic">
            "For where two or three gather in my name, there I am with them."
          </p>
          <p className="text-white/60 text-xs mt-1">Matthew 18:20</p>
        </div>
        
        {/* Footer */}
        <div className="mt-4 text-center text-white/60 text-xs">
          © {new Date().getFullYear()} SDA Church. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;