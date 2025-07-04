import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const LoanOfficersTable = () => {
  const [loanOfficers, setLoanOfficers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLoanOfficer, setSelectedLoanOfficer] = useState(null);
  const [filteredLoanOfficers, setFilteredLoanOfficers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show

  const deleteLoanOfficer = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this LoanOfficer?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/loan-officers/delete/${ID}`);
      alert('Loan Officer Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete Loan Officer');
    }
  }

  useEffect(() => {
    const fetchLoanOfficers = async () => {
      try {
        const response = await axios.get('http://localhost:5500/loan-officers/get');
        setLoanOfficers(response.data);
      } catch (error) {
        console.error('Error fetching Loan Officers:', error);
      }
    };
    fetchLoanOfficers();
  }, [deleteLoanOfficer]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredLoanOfficers(
      loanOfficers.filter(
        (LoanOfficer) =>
          LoanOfficer.FirstName.toLowerCase().includes(lowerCaseQuery) ||
          LoanOfficer.LastName.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, loanOfficers]);
  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (LoanOfficer) => {
    setSelectedLoanOfficer(LoanOfficer);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedLoanOfficer(null);
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
            onClick={() => navigate('/add-loan-officer')}
          >
            <span>Add LoanOfficer</span>
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
                  <th className="px-2 py-2 border">Actions</th>
                  <th className="px-2 py-2 border">ID</th>
                  <th className="px-2 py-2 border">First Name</th>
                  <th className="px-2 py-2 border">Last Name</th>
                  <th className="px-2 py-2 border">Phone Number</th>
                  <th className="px-2 py-2 border">Email</th>
                  <th className="px-2 py-2 border">Office Location</th>
                  {/* <th className="px-2 py-2 border">Performance Rating</th> */}
                  {/* <th className="px-2 py-2 border">Total Loans Managed</th> */}
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {filteredLoanOfficers.slice(0, rowsToShow).map((LoanOfficer) => (
                  <tr key={LoanOfficer.LoanOfficerID}>
                    <td className="px-2 py-2 border">
                      <div className="flex space-x-2 justify-center">
                        <BsPencilFill
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => openPopup(LoanOfficer)}
                        />
                        <FaTrashAlt
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => deleteLoanOfficer(LoanOfficer.LoanOfficerID)}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2 border">{LoanOfficer.LoanOfficerID}</td>
                    <td className="px-2 py-2 border">{LoanOfficer.FirstName}</td>
                    <td className="px-2 py-2 border">{LoanOfficer.LastName}</td>
                    <td className="px-2 py-2 border">{LoanOfficer.PhoneNumber}</td>
                    <td className="px-2 py-2 border">{LoanOfficer.Email}</td>
                    <td className="px-2 py-2 border">{LoanOfficer.OfficeLocation}</td>
                    {/* <td className="px-2 py-2 border">{LoanOfficer.PerformanceRating}</td> */}
                    {/* <td className="px-2 py-2 border">{LoanOfficer.TotalLoansManaged}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredLoanOfficers.length > rowsToShow && (
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
      {isPopupOpen && <EditLoanOfficerPopup LoanOfficer={selectedLoanOfficer} onClose={closePopup} />}
    </>
  );
};

const EditLoanOfficerPopup = ({ LoanOfficer, onClose }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: LoanOfficer,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this LoanOfficer?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/loan-officers/update/${LoanOfficer.LoanOfficerID}`, values);
        alert('LoanOfficer updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating LoanOfficer:', error);
        alert('Failed to update LoanOfficer.');
      }
    },
  });
  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit LoanOfficer</h2>
        <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="FirstName">First Name</label>
                      <input
                        type="text"
                        name="FirstName"
                        id="FirstName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.FirstName}
                        onChange={formik.handleChange}
                      />
                    </div>

                  
                  <div className="md:col-span-2">
                    <label htmlFor="LastName">Last Name</label>
                    <input
                      type="text"
                      name="LastName"
                      id="LastName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.LastName}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                      <label htmlFor="PhoneNumber">Phone No.</label>
                      <input
                        type="text"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.PhoneNumber}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="text"
                        name="Email"
                        id="Email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.Email}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="OfficeLocation">Office Location</label>
                      <input
                        type="text"
                        name="OfficeLocation"
                        id="OfficeLocation"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.OfficeLocation}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="PerformanceRating">Performance Rating</label>
                      <input
                        type="number"
                        name="PerformanceRating"
                        id="PerformanceRating"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.PerformanceRating}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="TotalLoansManaged">Total Loans Managed</label>
                      <input
                        type="number"
                        name="TotalLoansManaged"
                        id="TotalLoansManaged"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.TotalLoansManaged}
                        onChange={formik.handleChange}
                      />
                    </div>

        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update LoanOfficer
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

export default LoanOfficersTable;
