import React, { useState } from 'react';
import { Search, Users, ChevronDown, Filter, Phone, UserCircle } from 'lucide-react';
import Navbar from '../Components/Navbar';

const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('name');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  // Sample data for the table
  const members = [
    { id: 1, fullName: 'Brian Albert', phoneNumber: '0718091222', role: 'Admin', transaction: 'ksh1,250.00' },
    { id: 2, fullName: 'Jane Ndesa', phoneNumber: '0718091222', role: 'Member', transaction: 'ksh750.50' },
    { id: 3, fullName: 'Robert Johnson', phoneNumber: '0718091222', role: 'Member', transaction: 'ksh3,200.75' },
    { id: 4, fullName: 'Sarah Williams', phoneNumber: '0718091222', role: 'Support', transaction: 'ksh980.25' },
    { id: 5, fullName: 'Michael Brown', phoneNumber: '0718091222', role: 'Admin', transaction: 'ksh2,100.00' },
    { id: 6, fullName: 'Emily Davis', phoneNumber: '07180912222', role: 'Member', transaction: 'ksh1,500.30' },
  ];

  // Filter the members based on search term and filter option
  const filteredMembers = members.filter(member => {
    const searchValue = searchTerm.toLowerCase();
    
    if (filterOption === 'name') {
      return member.fullName.toLowerCase().includes(searchValue);
    } else if (filterOption === 'phone') {
      return member.phoneNumber.toLowerCase().includes(searchValue);
    } else if (filterOption === 'role') {
      return member.role.toLowerCase().includes(searchValue);
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-400 ">
      <Navbar/>
      <div className="max-w-6xl mx-auto pb-2 px-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 mt-2">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-700">Manage all member information and transactions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-600">{members.length} Total Members</span>
          </div>
        </div>

        {/* Search and filter */}
        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 z-10">
              <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">Filter by: </span>
                <span className="font-medium">{filterOption === 'name' ? 'Name' : filterOption === 'phone' ? 'Phone Number' : 'Role'}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {showFilterOptions && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setFilterOption('name');
                        setShowFilterOptions(false);
                      }}
                    >
                      Name
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setFilterOption('phone');
                        setShowFilterOptions(false);
                      }}
                    >
                      Phone Number
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setFilterOption('role');
                        setShowFilterOptions(false);
                      }}
                    >
                      Role
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCircle className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {member.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : member.role === 'Support' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.transaction}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No members found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500">Showing {filteredMembers.length} of {members.length} members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersPage;