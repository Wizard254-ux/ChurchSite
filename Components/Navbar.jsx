import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Activity, User, Users, DollarSign, UserPlus, RefreshCw, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  // Get initial sidebar state from localStorage or default based on screen size
  const getInitialSidebarState = () => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      return JSON.parse(savedState);
    }
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showChurchItemOverlay, setShowChurchItemOverlay] = useState(false);
  const [showMemberOverlay, setShowMemberOverlay] = useState(false);
  
  // State for form inputs
  const [churchItemTitle, setChurchItemTitle] = useState('');
  const [churchItemDescription, setChurchItemDescription] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');

  const location = useLocation();
  const path = location.pathname.split("/")[1]; // Extracts 'members'



  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      // Only auto-change sidebar state if user hasn't manually set it
      if (newWidth >= 768 && windowWidth < 768) {
        setIsSidebarOpen(true);
        localStorage.setItem('sidebarOpen', 'true');
      } else if (newWidth < 768 && windowWidth >= 768) {
        setIsSidebarOpen(false);
        localStorage.setItem('sidebarOpen', 'false');
      }
    };

    // Set initial state based on window width
    if (window.innerWidth >= 768 && !isSidebarOpen) {
      setIsSidebarOpen(true);
      localStorage.setItem('sidebarOpen', 'true');
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  // Save sidebar state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  const toggleExtra = () => {
    setIsExtraOpen(!isExtraOpen);
  };

  const handleCreateChurchItem = (e) => {
    e.preventDefault();
    console.log('Creating church item:', { title: churchItemTitle, description: churchItemDescription });
    // Add your API call or state management here
    
    // Reset form and close overlay
    setChurchItemTitle('');
    setChurchItemDescription('');
    setShowChurchItemOverlay(false);
  };

  const handleRegisterMember = (e) => {
    e.preventDefault();
    console.log('Registering member:', { name: memberName, phone: memberPhone });
    // Add your API call or state management here
    
    // Reset form and close overlay
    setMemberName('');
    setMemberPhone('');
    setShowMemberOverlay(false);
  };

  const NavItems = () => (
    <div className="flex flex-col space-y-2 w-full">
      <NavLink href="/overview" icon={<Activity size={20} />} text="Overview" />
      <NavLink href="/accounts" icon={<DollarSign size={20} />} text="Accounts" />
      <NavLink href="/transactions" icon={<DollarSign size={20} />} text="Transactions" />
      <NavLink href="/members" icon={<Users size={20} />} text="Members" />
      
      {/* Extra dropdown */}
      <div className="relative w-full border-t-[0.3px] border-white">
        <button
          onClick={toggleExtra}
          className="flex items-center justify-between w-full mt-2 hover:text-gray-900 px-4 py-2 text-white hover:bg-gray-300 rounded-lg"
        >
          <div className="flex items-center  ">
            <span className="mr-2">Quick actions</span>
            {isExtraOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        
        {/* Dropdown menu */}
        {isExtraOpen && (
          <div className="w-full mt-1">
            <div className="flex flex-col w-full">
              <button 
                className="w-full hover:bg-gray-100/60 cursor-pointer rounded-2xl border-gray-300 bg-transparent"
                onClick={() => navigate(0)}
              >
                <DropdownItem               
                  icon={<RefreshCw size={16} />} 
                  text="Refresh" 
                />
              </button>
              <button 
                className="w-full hover:bg-gray-100/60 cursor-pointer rounded-2xl border-gray-300 bg-transparent" 
                onClick={() => setShowChurchItemOverlay(true)}
              >
                <DropdownItem 
                  icon={<Plus size={16} />} 
                  text="Create New Church Item" 
                />
              </button>
              <button 
                className="w-full hover:bg-gray-100/60 cursor-pointer rounded-2xl border-gray-300 bg-transparent" 
                onClick={() => setShowMemberOverlay(true)}
              >
                <DropdownItem 
                  icon={<UserPlus size={16} />} 
                  text="Register Member" 
                />
              </button>
              <button 
                className="w-full hover:bg-gray-100/60 cursor-pointer rounded-2xl border-gray-300 bg-transparent" 
                onClick={() => navigate('/')}
              >
                <DropdownItem 
                  icon={<LogOut size={16} color="red" />} 
                  text="Logout" 
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const NavLink = ({ href, icon, text }) => (
    <span
      onClick={() => navigate(href)}
      className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100/60   text-gray-100 ${path==href.split('/')[1] && 'border-b-[0.3px] border-white'} rounded-lg w-full`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </span>
  );

  const DropdownItem = ({ icon, text }) => (
    <div className="flex items-center px-4 py-2 text-gray-100 rounded-lg w-full">
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </div>
  );

  // Create Church Item Overlay
  const ChurchItemOverlay = () => (
    <div style={{backgroundColor:'rgba(0,0,0,0.7)'}} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Create New Church Item</h2>
          <button onClick={() => setShowChurchItemOverlay(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleCreateChurchItem}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={churchItemTitle}
              onChange={(e) => setChurchItemTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">Short Description</label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={churchItemDescription}
              onChange={(e) => setChurchItemDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setShowChurchItemOverlay(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Register Member Overlay
  const MemberOverlay = () => (
    <div style={{backgroundColor:'rgba(0,0,0,0.7)'}} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">Register New Member</h2>
          <button onClick={() => setShowMemberOverlay(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleRegisterMember}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={memberPhone}
              onChange={(e) => setMemberPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setShowMemberOverlay(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Toggle button for mobile
  const SidebarToggle = () => (
    <div className='flex w-full p-1 md:hidden flex-row justify-between bg-blue-600 sticky top-0 z-30'>
      <div className="flex gap-3 items-center p-4 border-gray-300">
        <User color='white'/>
        <h2 className="font-bold text-lg text-gray-100">Church Admin</h2>
      </div>
      <button
        className="text-white p-2 rounded-lg shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <SidebarToggle />
      
      {/* Sidebar overlay for small screens */}
      {isSidebarOpen && windowWidth < 768 && (
        <div 
          style={{backgroundColor:'rgba(0,0,0,0.8)'}}
          className="fixed inset-0 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed z-40 md:z-0 md:relative top-0 left-0 bottom-0  bg-blue-700 shadow-lg transform transition-transform duration-300 ease-in-out  
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          ${windowWidth >= 768 ? 'w-64' : 'w-64'}`}
      >
        <div className="flex gap-3 items-center p-4 border-gray-300">
          <User color='white'/>
          <h2 className="font-bold text-lg text-gray-100">Church Admin</h2>
          {windowWidth < 768 && (
            <button 
              className="text-gray-100 hover:text-gray-700 ml-auto"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          )}
        </div>
        <div className="py-4 px-2">
          <NavItems />
        </div>
      </div>

      {/* Overlays */}
      {showChurchItemOverlay && <ChurchItemOverlay />}
      {showMemberOverlay && <MemberOverlay />}
    </>
  );
};

export default Sidebar;