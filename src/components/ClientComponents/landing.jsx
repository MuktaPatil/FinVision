import React, { useState } from 'react';
import { FaBars, FaSearch, FaHouseUser, FaBookmark, FaChevronDown, FaBoxOpen, FaRegUser } from 'react-icons/fa';
import { FaMoneyBillWave } from "react-icons/fa";
import { FaLock } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaUserTie } from "react-icons/fa";
import { FaArrowsRotate, FaBuilding } from "react-icons/fa6";
import { BsBank2 } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";
import { FcStatistics } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex z-10">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 fixed top-0 bottom-0 ${
          isSidebarOpen ? 'w-[190px]' : 'w-[80px]'
        }`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`font-bold text-xl transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            FinVision
          </h1>
          <button
            className="text-white text-xl bg-gray-700 rounded-md p-2"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="mt-4">
          {[
            { icon: <FaMoneyBillWave />, label: 'Loans', path: '/loans' },
            { icon: <FaRegUser />, label: 'Clients', path: '/clients' },
            { icon: <FaLock />, label: 'Collateral', path: '/collaterals' },
            { icon: <FaExclamationCircle />, label: 'Delinquency', path: '/delinquency' },
            { icon: <FaUserTie />, label: 'Loan Officers', path: '/loan-officers' },
            { icon: <FaBuilding />, label: 'Loan Products', path: '/loan-products' },
            { icon: <FaArrowsRotate />, label: 'Repayments', path: '/repayments' },
            { icon: <IoIosWarning />, label: 'Missed Payments', path: '/missed-payments' },
            { icon: <BsBank2 />, label: 'Transactions', path: '/transactions' },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 flex items-center gap-4 cursor-pointer hover:bg-blue-600"
              onClick={() => navigate(item.path)}
            >
              <div className="text-lg">{item.icon}</div>
              {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;