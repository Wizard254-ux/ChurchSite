import React, { useState } from 'react';
import { Search, Edit, Trash2, X, Save } from 'lucide-react';
import Navbar from '../Components/Navbar';

const AccountsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([
    { id: 1, title: 'Business Account', description: 'Main business operations account', active: true },
    { id: 2, title: 'Savings Account', description: 'Emergency funds and savings', active: false },
    { id: 3, title: 'Marketing Budget', description: 'Dedicated for marketing campaigns', active: true },
    { id: 4, title: 'Development Fund', description: 'Product development and research', active: true },
    { id: 5, title: 'Tax Reserve', description: 'Reserved for quarterly tax payments', active: false },
    { id: 6, title: 'Employee Benefits', description: 'Healthcare and benefits payments', active: true },
  ]);
  
  const [editingAccount, setEditingAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: ''
  });
  const [showEditModal, setShowEditModal] = useState(false);

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account => {
    const searchLower = searchTerm.toLowerCase();
    return (
      account.title.toLowerCase().includes(searchLower) ||
      account.description.toLowerCase().includes(searchLower)
    );
  });

  // Handle toggle status
  const handleToggleStatus = (id) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, active: !account.active } : account
    ));
  };

  // Handle delete account
  const handleDeleteAccount = (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      setAccounts(accounts.filter(account => account.id !== id));
    }
  };

  // Handle edit click
  const handleEditClick = (account) => {
    setEditingAccount(account);
    setEditFormData({
      title: account.title,
      description: account.description
    });
    setShowEditModal(true);
  };

  // Handle form change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setAccounts(accounts.map(account => 
      account.id === editingAccount.id 
        ? { ...account, title: editFormData.title, description: editFormData.description }
        : account
    ));
    setShowEditModal(false);
  };

  return (
    <div className=" bg-gray-200 min-h-screen md:flex md:flex-row">
        <Navbar/>
      <div className='px-2 pb-2 flex-1 h-screen overflow-y-auto'>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4 mt-2">
          <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>
          <p className="text-gray-700">Manage your accounts and their settings</p>
        </div>

        {/* Search */}
        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{account.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{account.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label className="inline-flex items-center cursor-pointer">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              className="sr-only" 
                              checked={account.active}
                              onChange={() => handleToggleStatus(account.id)}
                            />
                            <div className={`block w-10 h-6 rounded-full ${account.active ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${account.active ? 'transform translate-x-4' : ''}`}></div>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {account.active ? 'Active' : 'Inactive'}
                          </span>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(account)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 focus:outline-none"
                        >
                          <Edit className="h-5 w-5 inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          <Trash2 className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No accounts found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredAccounts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-500">Showing {filteredAccounts.length} of {accounts.length} accounts</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit Account</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right rounded-b-lg">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md inline-flex items-center"
              >
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AccountsPage;