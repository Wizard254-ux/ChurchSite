import React from "react";
import { Wallet, CreditCard, Users, Box, ArrowUp } from "lucide-react";

const OverviewSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-2">
      {/* Transaction Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Wallet className="text-blue-500" size={20} /> Transaction Overview
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance</span>
            <span className="font-semibold text-gray-800">ksh5,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Transactions</span>
            <span className="font-semibold text-gray-800">120</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Today's Total Balance</span>
            <span className="font-semibold text-green-600 flex items-center gap-1">
              <ArrowUp size={16} /> ksh1,200
            </span>
          </div>
        </div>
      </div>

      {/* Church Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Users className="text-purple-500" size={20} /> Church Overview
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Members</span>
            <span className="font-semibold text-gray-800">450</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Church Items</span>
            <span className="font-semibold text-gray-800">25</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Today's Members Added</span>
            <span className="font-semibold text-green-600 flex items-center gap-1">
              <ArrowUp size={16} /> 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;