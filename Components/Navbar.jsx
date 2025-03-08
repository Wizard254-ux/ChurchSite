import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Activity, Users, DollarSign, UserPlus, RefreshCw, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExtraOpen, setIsExtraOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showChurchItemOverlay, setShowChurchItemOverlay] = useState(false);
  const [showMemberOverlay, setShowMemberOverlay] = useState(false);
  
  // State for form inputs
  const [churchItemTitle, setChurchItemTitle] = useState('');
  const [churchItemDescription, setChurchItemDescription] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <>
      <NavLink href="/overview" icon={<Activity size={20} />} text="Overview" />
      <NavLink href="/accounts" icon={<DollarSign size={20} />} text="Accounts" />
      <NavLink href="/transactions" icon={<DollarSign size={20} />} text="Transactions" />
      <NavLink href="/members" icon={<Users size={20} />} text="Members" />
      
      {/* Extra dropdown */}
      <div className="relative">
        <button
          onClick={toggleExtra}
          className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 rounded-lg"
        >
          <div className="flex items-center">
            <span className="mr-2">Quick actions</span>
            {isExtraOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>
        
        {/* Dropdown menu */}
        {isExtraOpen && (
          <div className="lg:absolute lg:right-0 lg:mt-2 lg:w-48 lg:bg-white lg:rounded-lg lg:shadow-lg lg:border border-gray-200 lg:z-10">
            <div className={`flex flex-col pl-4 lg:pl-0 ${windowWidth >= 1024 ? 'py-1' : 'py-0'}`}>
              <button className='border-b-[0.3px]  border-gray-600' onClick={() => navigate(0)}>
                <DropdownItem               
                  icon={<RefreshCw size={16} />} 
                  text="Refresh" 
                />
              </button>
              <button className='border-b-[0.3px] border-gray-600' onClick={() => setShowChurchItemOverlay(true)}>
                <DropdownItem 
                  icon={<Plus size={16} />} 
                  text="Create New Church Item" 
                />
              </button>
              <button className='border-b-[1px] border-gray-600' onClick={() => setShowMemberOverlay(true)}>
                <DropdownItem 
                  icon={<UserPlus size={16} />} 
                  text="Register Member" 
                />
              </button>
              <button className='border-b-[1px] border-gray-600' onClick={() => navigate('/')}>
                <DropdownItem 
                  icon={<LogOut size={16} color='red'/>} 
                  text="Logout" 
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const NavLink = ({ href, icon, text }) => (
    <a
      href={href}
      className="flex items-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 rounded-lg"
    >
      <span className="mr-2">{icon}</span>
      <span>{text}</span>
    </a>
  );

  const DropdownItem = ({ href, icon, text }) => (
    <a
      href={href}
      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      <span className="mr-2">{icon}</span>
      <span>{text}</span>
    </a>
  );

  // Create Church Item Overlay
  const ChurchItemOverlay = () => (
    <div style={{backgroundColor:'rgba(0,0,0,0.7)'}} className="fixed inset-0flex items-center justify-center z-50">
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

  return (
    <div className='sticky top-0 z-50 '>
      {/* Main navbar for large screens */}
      <nav className="bg-gray-200 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-800">Church Admin</h1>
        </div>

        {/* Menu items for large screens */}
        <div className="hidden lg:flex items-center space-x-2">
          <NavItems />
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar overlay for small screens */}
      {isSidebarOpen && (
        <div 
          style={{backgroundColor:'rgba(0,0,0,0.8)'}}
          className="fixed inset-0 z-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for small screens */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-blue-800">Menu</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <div className="py-4 flex flex-col gap-2">
          <NavItems />
        </div>
      </div>

      {/* Overlays */}
      {showChurchItemOverlay && <ChurchItemOverlay />}
      {showMemberOverlay && <MemberOverlay />}
    </div>
  );
};

export default Navbar;