import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../Components/Navbar";
import OverviewSection from "../Components/OverviewSection";
// Dummy data for transactions
const dummyTransactions = [
  {
    id: 1,
    name: "Alpha brian",
    phoneNumber: "0113762337",
    group: "Group A",
    amount: "ksh100",
    created: "2023-10-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "0113762337",
    group: "Group B",
    amount: "ksh200",
    created: "2023-10-02",
  },
  {
    id: 3,
    name: "Alice Johnson",
    phoneNumber: "0113762337",
    group: "Group C",
    amount: "ksh150",
    created: "2023-10-03",
  },
  {
    id: 4,
    name: "Bob Brown",
    phoneNumber: "0113762337",
    group: "Group A",
    amount: "ksh300",
    created: "2023-10-04",
  },
];

const Overview = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter transactions based on search query
  const filteredTransactions = dummyTransactions.filter((transaction) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      transaction.name.toLowerCase().includes(searchLower) ||
      transaction.phoneNumber.includes(searchLower) ||
      transaction.group.toLowerCase().includes(searchLower) ||
      transaction.amount.toLowerCase().includes(searchLower)
    );
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className=" bg-gray-200 min-h-screen md:flex md:flex-row">
        <Navbar/>
<div className="px-5 pb-2 flex-1 h-screen overflow-y-auto">
        <OverviewSection/>
      {/* Search Bar */}
      <div className="m-4 ">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-[20rem] p-2 pl-10 border z-0 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <Search className="absolute left-3 top-3 text-gray-400" size={20} /> */}
     <span className="pl-4 font-medium">Recent Transactions</span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto mb-2 rounded-2xl ">
        <table className="w-full min-w-[30rem] overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortConfig.key === "name" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("phoneNumber")}
              >
                <div className="flex items-center">
                  Phone Number
                  {sortConfig.key === "phoneNumber" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("group")}
              >
                <div className="flex items-center">
                  Group
                  {sortConfig.key === "group" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Amount
                  {sortConfig.key === "amount" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="p-3 text-sm text-gray-700">{transaction.name}</td>
                <td className="p-3 text-sm text-gray-700">
                  {transaction.phoneNumber}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {transaction.group}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {transaction.amount}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {transaction.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Overview;