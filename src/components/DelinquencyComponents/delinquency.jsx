import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const DelinquencyTable = () => {
  const [repayments, setRepayments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRepayment, setSelectedDelinquency] = useState(null);
  const [filteredDelineuqncy, setFilteredDelinquency] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show

  const deleteDelinquency = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this delinquency?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/delinquency/delete/${ID}`);
      alert('Delinquency Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete delinquency');
    }
  }

  useEffect(() => {
    const fetchDelinquency = async () => {
      try {
        const response = await axios.get('http://localhost:5500/delinquency/get');
        setRepayments(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching repayments:', error);
      }
    };
    fetchDelinquency();
  }, []);

  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredDelinquency(repayments);
      return;
    }
  
    const lowerCaseQuery = searchQuery.toLowerCase();
  
    setFilteredDelinquency(
      repayments.filter((delinquency) => {
        const loanIdMatch = delinquency.LoanID.toString().includes(lowerCaseQuery);
        const dateMatch = delinquency.PaymentDate.toString().toLowerCase().includes(lowerCaseQuery);
        return loanIdMatch || dateMatch;
      })
    );
  }, [searchQuery, repayments]);

  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (delinquency) => {
    setSelectedDelinquency(delinquency);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedDelinquency(null);
    setIsPopupOpen(false);
  };

  const navigate = useNavigate();

  const handleLoadMore = () => {
    setRowsToShow(rowsToShow + 30); // Increase rows shown by 30
  };

  return (
    <>
      <div className="flex flex-col container mx-auto py-6 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full mb-4 px-4">
          <button
            className="flex items-center space-x-2 whitespace-nowrap bg-gray-700 text-white px-4 py-1 text-sm rounded hover:scale-105 transition-transform duration-200"
            onClick={() => navigate('/add-delinquency')}
          >
            <span>Add Delinquency</span>
            <FaPlusSquare />
          </button>
          <div className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Search by First or Last Name"
              className="w-full px-10 py-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="absolute left-3 text-gray-500 fas fa-search"><FaSearch /></i>
          </div>
        </div>
        <div className="w-full mb-8 rounded-lg shadow-lg overflow-scroll">
          <div className="">
            <table className="min-w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                 {/* <th className="px-2 py-2 border">Actions</th> */}
                  <th className="px-2 py-2 border">ID</th>
                  <th className="px-2 py-2 border">Loan ID</th>
                  <th className="px-2 py-2 border">Delinquency Start Date</th>
                  <th className="px-2 py-2 border">Days Overdue</th>
                  <th className="px-2 py-2 border">Current Status</th>
                  <th className="px-2 py-2 border">Amount Overdue</th>
                  <th className="px-2 py-2 border">Missed Payment</th>
              </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {repayments.map((delinquency) => (
                  <tr key={delinquency.DelinquencyID}>
                    {/* <td className="px-2 py-2 border">
                      <div className="flex space-x-2 justify-center">
                        <BsPencilFill
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => openPopup(delinquency)}
                        />
                        <FaTrashAlt
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => deleteDelinquency(delinquency.RepaymentID)}
                        />
                      </div>
                    </td> */}
                    <td className="px-2 py-2 border">{delinquency.DelinquencyID}</td>
                    <td className="px-2 py-2 border">{delinquency.LoanID}</td>
                    <td className="px-2 py-2 border">{formatDate(delinquency.DelinquencyStartDate)}</td>
                    <td className="px-2 py-2 border">{delinquency.DaysOverdue}</td>
                    <td className="px-2 py-2 border">{delinquency.CurrentStatus}</td>
                    <td className="px-2 py-2 border">{delinquency.AmountOverdue}</td>
                    <td className="px-2 py-2 border">{delinquency.MissedPayment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredDelineuqncy.length > rowsToShow && (
          <div className="text-center my-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
      {isPopupOpen && <EditRepaymentPopup delinquency={selectedRepayment} onClose={closePopup} />}
    </>
  );
};

const EditRepaymentPopup = ({ delinquency, onClose }) => {
  const navigate = useNavigate()
  const [loans, setLoans] = useState([])
  const formik = useFormik({
    initialValues: delinquency,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this delinquency?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/delinquency/update/${delinquency.DelinquencyIDID}`, values);
        alert('Delinq  uency updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating delinquency:', error);
        alert('Failed to update delinquency.');
      }
    },
  });

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5500/loans/get');
        setLoans(response.data);
        console.log('Loans', loans)
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };
    fetchLoans();
  }, []);
  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Delinq uency</h2>
        <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 py-4 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="LoanID">Loan ID</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <select
                      name="LoanID"
                      id="LoanID"
                      className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      value={formik.values.LoanID}
                      onChange={formik.handleChange}
                    >
                      <option value="" disabled>
                        Select Loan ID
                      </option>
                      {loans.map((loan) => (
                        <option key={loan.LoanID} value={loan.LoanID}>
                          {loan.LoanID}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                  <div className="md:col-span-2">
                    <label htmlFor="RepaymentType">Delinquency Type</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        name="RepaymentType"
                        id="RepaymentType"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.RepaymentType}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          Select Delinquency Type
                        </option>
                        <option value="Land deeds">Land deeds</option>
                        <option value="Houses or building ownership documents">Houses or building ownership documents</option>
                        <option value="Livestock">Livestock</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Crops or agricultural produce">Crops or agricultural produce</option>
                        <option value="Jewelry or gold ornaments">Jewelry or gold ornaments</option>
                        <option value="Stock inventory">Stock inventory</option>
                        <option value="Small machinery or equipment">Small machinery or equipment</option>
                        <option value="Tools of the trade">Tools of the trade</option>
                        <option value="Irrigation pumps or farming infrastructure">Irrigation pumps or farming infrastructure</option>
                        <option value="Fixed deposits">Fixed deposits</option>
                        <option value="Savings certificates">Savings certificates</option>
                        <option value="Insurance policies">Insurance policies</option>
                        <option value="Government-issued bonds or securities">Government-issued bonds or securities</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Kitchen appliances">Kitchen appliances</option>
                        <option value="Group savings contributions">Group savings contributions</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="RepaymentValue">Delinq uency Value</label>
                    <input
                      type="number"
                      name="RepaymentValue"
                      id="RepaymentValue"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.RepaymentValue}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="RepaymentDescription">Delinq   uency Description</label>
                    <input
                      type="text"
                      name="RepaymentDescription"
                      id="RepaymentDescription"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.RepaymentDescription}
                      onChange={formik.handleChange}
                    />
                  </div>

                  
                  <div className="md:col-span-2">
                    <label htmlFor="RepaymentStatus">Delinquency Status</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        name="RepaymentStatus"
                        id="RepaymentStatus"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.RepaymentStatus}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          Select Delinquency Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pledged">Pledged</option>
                        <option value="Released">Released</option>
                        <option value="Seized">Seized</option>
                      </select>
                    </div>
                  </div>

        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update Delinquency
        </button>
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default DelinquencyTable;
