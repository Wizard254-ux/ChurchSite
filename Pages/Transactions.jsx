import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  RefreshCw,
  Search,
  PlusCircle,
  Smartphone,
  DollarSign,
  X,
  Book,
  Filter,
  Download,
  MoreHorizontal,
  Users,
  Receipt,
} from 'lucide-react';
import Navbar from '../Components/Navbar';

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [selectedPaymentDate, setSelectedPaymentDate] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [customItem, setCustomItem] = useState('');

  // Sample data
  const accounts = ['Main Account', 'Savings Account', 'Investment Account', 'Emergency Fund'];
  const groups = ['Family', 'Friends', 'Work', 'Church', 'Charity'];
  const transactions = [
    { id: 1, name: 'Brian albert', group: 'Family', amount: 5000, phone: '+254 712 345 678', created: '2025-03-01' },
    { id: 2, name: 'Jane ndesa', group: 'Work', amount: 2500, phone: '+254 723 456 789', created: '2025-03-02' },
    { id: 3, name: 'David Kim', group: 'Church', amount: 1000, phone: '+254 734 567 890', created: '2025-03-03' },
    { id: 4, name: 'Sarah Johnson', group: 'Charity', amount: 7500, phone: '+254 745 678 901', created: '2025-03-04' },
    { id: 5, name: 'Michael Brown', group: 'Friends', amount: 3000, phone: '+254 756 789 012', created: '2025-03-05' },
  ];

  const users = [
    { id: 1, name: 'Brian albert', phone: '+254 712 345 678' },
    { id: 2, name: 'Jane ndesa', phone: '+254 723 456 789' },
    { id: 3, name: 'David Kim', phone: '+254 734 567 890' },
    { id: 4, name: 'Sarah Johnson', phone: '+254 745 678 901' },
    { id: 5, name: 'Michael Brown', phone: '+254 756 789 012' },
  ];

  const churchItems = ['Tithe', 'Offering', 'Building Fund', 'Mission Fund', 'Youth Ministry'];
  const accountTypes = ['Bank', 'M-Pesa', 'Cash'];

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setOpenDropdown(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setOpenDropdown(null);
  };

  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
    setOpenDropdown(null);
  };

  const handleDateSelect = (date) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: date, end: null });
    } else {
      setDateRange({ ...dateRange, end: date });
      setOpenDropdown(null);
    }
  };

  const handlePaymentDateSelect = (date) => {
    setSelectedPaymentDate(date);
    setOpenDropdown(null);
  };

  const resetFilters = () => {
    setSelectedAccount(null);
    setSelectedGroup(null);
    setDateRange({ start: null, end: null });
    setSearchTerm('');
    setSelectedAccountType(null);
  };

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  const handleAddChurchItem = () => {
    // Logic to add the new church item
    setShowAddItemModal(false);
    setNewItem('');
    setCustomItem('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Filter transactions based on selected criteria
  const filteredTransactions = transactions.filter((transaction) => {
    if (searchTerm && !transaction.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedGroup && transaction.group !== selectedGroup) return false;
    if (dateRange.start && dateRange.end) {
      const transactionDate = new Date(transaction.created);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      if (transactionDate < start || transactionDate > end) return false;
    }
    return true;
  });

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Calendar component
  const CalendarDropdown = ({ onSelectDate, selectedDate, isRange, rangeStart, rangeEnd }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
      setCurrentMonth(new Date(year, month - 1));
    };

    const nextMonth = () => {
      setCurrentMonth(new Date(year, month + 1));
    };

    const isDateInRange = (date) => {
      if (!isRange || !rangeStart) return false;
      const dateObj = new Date(year, month, date);
      if (!rangeEnd) return dateObj.toDateString() === rangeStart.toDateString();
      return dateObj >= rangeStart && dateObj <= rangeEnd;
    };

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isInRange = isDateInRange(day);

      days.push(
        <div
          key={day}
          onClick={() => onSelectDate(date)}
          className={`flex items-center justify-center h-8 w-8 rounded-full cursor-pointer ${
            isSelected ? 'bg-indigo-600 text-white' : ''
          } ${isInRange ? 'bg-indigo-100' : ''} hover:bg-indigo-100`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-xl w-64">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronDown size={16} />
          </button>
          <div className="font-medium">
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronUp size={16} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mt-2">{days}</div>
        {isRange && (
          <div className="mt-2 text-sm text-gray-600">
            {rangeStart ? `Start: ${rangeStart.toLocaleDateString()}` : 'Select start date'}
            <br />
            {rangeEnd ? `End: ${rangeEnd.toLocaleDateString()}` : rangeStart ? 'Select end date' : ''}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-400">
              <Navbar/>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
          <p className="text-gray-600 mt-1">Manage transactions and receipts</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              <MoreHorizontal size={18} className="mr-2" />
              Transactions
            </button>
            <button
              className={`flex items-center px-6 py-4 font-medium text-sm ${
                activeTab === 'receipt'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
              }`}
              onClick={() => setActiveTab('receipt')}
            >
              <Receipt size={18} className="mr-2" />
              Create Receipt
            </button>
          </div>

          <div className="p-6">
            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                {/* Search and filters bar */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <button
                    className={`flex items-center px-4 py-2.5 rounded-lg border ${
                      showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={toggleFilters}
                  >
                    <Filter size={18} className="mr-2" />
                    Filters
                  </button>

                  {/* <button className="flex items-center px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 ml-auto">
                    <Download size={18} className="mr-2" />
                    Export
                  </button> */}
                </div>

                {/* Filters section */}
                {showFilters && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Select Account Dropdown */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
                        <button
                          className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-white shadow-sm hover:border-indigo-300 transition"
                          onClick={() => toggleDropdown('account')}
                        >
                          <span className="text-sm text-gray-700">{selectedAccount || 'All Accounts'}</span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </button>
                        {openDropdown === 'account' && (
                          <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-xl max-h-60 overflow-y-auto">
                            {accounts.map((account) => (
                              <div
                                key={account}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleAccountSelect(account)}
                              >
                                <div
                                  className={`w-3 h-3 rounded-full mr-2 ${
                                    selectedAccount === account ? 'bg-green-500' : 'bg-indigo-500'
                                  }`}
                                ></div>
                                <span className="text-sm">{account}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Select Group Dropdown */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                        <button
                          className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-white shadow-sm hover:border-indigo-300 transition"
                          onClick={() => toggleDropdown('group')}
                        >
                          <span className="text-sm text-gray-700">{selectedGroup || 'All Groups'}</span>
                          <ChevronDown size={16} className="text-gray-500" />
                        </button>
                        {openDropdown === 'group' && (
                          <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-xl max-h-60 overflow-y-auto">
                            {groups.map((group) => (
                              <div
                                key={group}
                                className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleGroupSelect(group)}
                              >
                                <span className="text-sm">{group}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Date Range Dropdown */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <button
                          className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-white shadow-sm hover:border-indigo-300 transition"
                          onClick={() => toggleDropdown('dateRange')}
                        >
                          <span className="text-sm text-gray-700">
                            {dateRange.start && dateRange.end
                              ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                              : 'All Time'}
                          </span>
                          <Calendar size={16} className="text-gray-500" />
                        </button>
                        {openDropdown === 'dateRange' && (
                          <div className="absolute z-20 mt-1 right-0 bg-white border rounded-lg shadow-xl">
                            <CalendarDropdown
                              onSelectDate={handleDateSelect}
                              isRange={true}
                              rangeStart={dateRange.start}
                              rangeEnd={dateRange.end}
                            />
                          </div>
                        )}
                      </div>

                      {/* Reset Button */}
                      <div className="flex items-end">
                        <button
                          className="w-full flex items-center justify-center p-2.5 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition text-sm"
                          onClick={resetFilters}
                        >
                          <RefreshCw size={16} className="mr-2 text-gray-500" />
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active filters */}
                {(selectedAccount || selectedGroup || (dateRange.start && dateRange.end)) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedAccount && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">
                        Account: {selectedAccount}
                        <button onClick={() => setSelectedAccount(null)} className="ml-2">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {selectedGroup && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">
                        Group: {selectedGroup}
                        <button onClick={() => setSelectedGroup(null)} className="ml-2">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {dateRange.start && dateRange.end && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">
                        Date: {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
                        <button onClick={() => setDateRange({ start: null, end: null })} className="ml-2">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Transactions Table */}
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Group
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {transaction.group}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-emerald-600">KSh {transaction.amount.toLocaleString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{transaction.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{new Date(transaction.created).toLocaleDateString()}</div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center">
                            <div className="text-gray-500 mb-2">No transactions found</div>
                            <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Create Receipt Tab */}
            {activeTab === 'receipt' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left side - Search and select */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                      <h3 className="font-medium text-gray-700 mb-3">Find Member</h3>

                      {/* Search */}
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="pl-10 w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
                          placeholder="Search by name or phone"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      {/* Users List */}
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden max-h-96 overflow-y-auto">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <div key={user.id} className="p-3 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer transition">
                              <div className="flex items-center">
                                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                                  <Users size={18} className="text-indigo-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-xs text-gray-500">{user.phone}</div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-gray-500">No members found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Receipt form */}
                  <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-medium text-lg text-gray-900 mb-6">Create Receipt</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Account Type Dropdown */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                          <button
                            className="w-full flex items-center justify-between p-3 border rounded-lg bg-white hover:border-indigo-300 transition"
                            onClick={() => toggleDropdown('accountType')}
                          >
                            <div className="flex items-center">
                              {selectedAccountType === 'Bank' && <Book size={18} className="mr-2 text-blue-500" />}
                              {selectedAccountType === 'M-Pesa' && <Smartphone size={18} className="mr-2 text-green-500" />}
                              {selectedAccountType === 'Cash' && <DollarSign size={18} className="mr-2 text-yellow-500" />}
                              <span className="text-gray-700">{selectedAccountType || 'Select Payment Method'}</span>
                            </div>
                            <ChevronDown size={18} className="text-gray-500" />
                          </button>
                          {openDropdown === 'accountType' && (
                            <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-xl">
                              {accountTypes.map((type) => (
                                <div
                                  key={type}
                                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                                  onClick={() => handleAccountTypeSelect(type)}
                                >
                                  {type === 'Bank' && <Book size={18} className="mr-2 text-blue-500" />}
                                  {type === 'M-Pesa' && <Smartphone size={18} className="mr-2 text-green-500" />}
                                  {type === 'Cash' && <DollarSign size={18} className="mr-2 text-yellow-500" />}
                                  <span>{type}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Payment Date Dropdown */}
                        <div className="relative">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                          <button
                            className="w-full flex items-center justify-between p-3 border rounded-lg bg-white hover:border-indigo-300 transition"
                            onClick={() => toggleDropdown('paymentDate')}
                          >
                            <span className="text-gray-700">
                              {selectedPaymentDate ? selectedPaymentDate.toLocaleDateString() : 'Select Date'}
                            </span>
                            <Calendar size={18} className="text-gray-500" />
                          </button>
                          {openDropdown === 'paymentDate' && (
                            <div className="absolute z-20 mt-1 right-0 bg-white border rounded-lg shadow-xl">
                              <CalendarDropdown onSelectDate={handlePaymentDateSelect} selectedDate={selectedPaymentDate} />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Church Items Section */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-medium text-gray-700">Church Items</label>
                          <button
                            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                            onClick={handleAddItem}
                          >
                            <PlusCircle size={16} className="mr-1" />
                            Add Item
                          </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                          <div className="space-y-3">
                            {churchItems.map((item, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`item-${index}`}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`item-${index}`} className="ml-3 text-sm text-gray-700">
                                  {item}
                                </label>
                                <div className="ml-auto">
                                  <input
                                    type="text"
                                    placeholder="Amount"
                                    className="p-2 text-sm border border-gray-200 rounded w-24 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;