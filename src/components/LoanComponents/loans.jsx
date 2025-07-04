import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const LoansTable = () => {
  const [loans, setLoans] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show
  const [clients, setClients] = useState([])
  const [loanProducts, setLoanProducts] = useState([]);
  const [loanOfficers, setLoanOfficers] = useState([]);



  const deleteLoan = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this loan?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/loans/delete/${ID}`);
      alert('Loan Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete loan');
    }
  }

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5500/loans/get');
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };
    fetchLoans();
  }, [deleteLoan]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5500/clients/get');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchLoanProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5500/loan-products/get');
        setLoanProducts(response.data);
      } catch (error) {
        console.error('Error fetching Loan Officers:', error);
      }
    };
    fetchLoanProducts();
  }, []);

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
  }, []);


  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
  
    // Filter loans based on query
    const filtered = loans.filter((loan) => {
const client = clients.find((client) => client.ClientID === loan.ClientID);
const clientName = client ? `${client.FirstName} ${client.LastName}` : "Unknown";

const loanProduct = loanProducts.find((product) => product.LoanProductID === loan.LoanProductID);
const loanProductName = loanProduct?.ProductName || "Unknown";

const loanOfficer = loanOfficers.find((officer) => officer.LoanOfficerID === loan.LoanOfficerID);
const loanOfficerName = loanOfficer ? `${loanOfficer.FirstName} ${loanOfficer.LastName}` : "Unknown";

  
      return (
        clientName.toLowerCase().includes(lowerCaseQuery) ||
        loanProductName.toLowerCase().includes(lowerCaseQuery) ||
        loanOfficerName.toLowerCase().includes(lowerCaseQuery)
      );
    });
  
    setFilteredLoans(filtered);
  }, [searchQuery, loans, clients, loanProducts, loanOfficers]);
  

  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (loan) => {
    setSelectedLoan(loan);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedLoan(null);
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
            onClick={() => navigate('/add-loan')}
          >
            <span>Add Loan</span>
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
                  <th className="px-2 py-2 border">Client</th>
                  <th className="px-2 py-2 border">Loan Product</th>
                  <th className="px-2 py-2 border">Loan Amount</th>
                  <th className="px-2 py-2 border">Interest Rate</th>
                  <th className="px-2 py-2 border">Start Date</th>
                  <th className="px-2 py-2 border">End Date</th>
                  <th className="px-2 py-2 border">Term (months)</th>
                  <th className="px-2 py-2 border">Loan Status</th>
                  <th className="px-2 py-2 border">Loan Officer</th>
                  <th className="px-2 py-2 border">Remaining Tenure</th>
                  <th className="px-2 py-2 border">Remaining Balance</th>
                  <th className="px-2 py-2 border">Amount Paid</th>
                  <th className="px-2 py-2 border">Missed Payments</th>
                  <th className="px-2 py-2 border">Fixed Monthly Payment</th>
                  <th className="px-2 py-2 border">Interest</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
  {filteredLoans.slice(0, rowsToShow).map((loan) => {
const client = clients.find((client) => client.ClientID === loan.ClientID);
const clientName = client ? `${client.FirstName} ${client.LastName}` : "Unknown";

const loanProduct = loanProducts.find((product) => product.LoanProductID === loan.LoanProductID);
const loanProductName = loanProduct?.ProductName || "Unknown";

const loanOfficer = loanOfficers.find((officer) => officer.LoanOfficerID === loan.LoanOfficerID);
const loanOfficerName = loanOfficer ? `${loanOfficer.FirstName} ${loanOfficer.LastName}` : "Unknown";

    return ( // Add the return keyword here
      <tr key={loan.LoanID}>
        <td className="px-2 py-2 border">
          <div className="flex space-x-2 justify-center">
            <BsPencilFill
              className="hover:scale-110 transition-transform duration-200 cursor-pointer"
              onClick={() => openPopup(loan)}
            />
            <FaTrashAlt
              className="hover:scale-110 transition-transform duration-200 cursor-pointer"
              onClick={() => deleteLoan(loan.LoanID)}
            />
          </div>
        </td>
        <td className="px-2 py-2 border">{loan.LoanID}</td>
        <td className="px-2 py-2 border">{clientName}</td>
        <td className="px-2 py-2 border">{loanProductName}</td>
        <td className="px-2 py-2 border">{loan.LoanAmount}</td>
        <td className="px-2 py-2 border">{loan.InterestRate}</td>
        <td className="px-2 py-2 border">{formatDate(loan.StartDate)}</td>
        <td className="px-2 py-2 border">{formatDate(loan.EndDate)}</td>
        <td className="px-2 py-2 border">{loan.LoanTerm}</td>
        <td className="px-2 py-2 border">{loan.LoanStatus}</td>
        <td className="px-2 py-2 border">{loanOfficerName}</td>
        <td className="px-2 py-2 border">{loan.RemainingTenure}</td>
        <td className="px-2 py-2 border">{loan.RemainingBalance}</td>
        <td className="px-2 py-2 border">{loan.AmountPaid}</td>
        <td className="px-2 py-2 border">{loan.MissedPayments}</td>
        <td className="px-2 py-2 border">{loan.FixedMonthlyPayment}</td>
        <td className="px-2 py-2 border">{loan.NextInterest}</td>
      </tr>
    );
  })}
</tbody>

            </table>
          </div>
        </div>
        {filteredLoans.length > rowsToShow && (
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
      {isPopupOpen && <EditLoanPopup loan={selectedLoan} onClose={closePopup} />}
    </>
  );
};

const EditLoanPopup = ({ loan, onClose }) => {
    const [clients, setClients] = useState([])
    const [loanProducts, setLoanProducts] = useState([]);
    const [loanOfficers, setLoanOfficers] = useState([]);
  
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: loan,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this loan?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/loans/update/${loan.LoanID}`, values);
        alert('Loan updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating loan:', error);
        alert('Failed to update loan.');
      }
    },
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5500/clients/get');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchLoanProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5500/loan-products/get');
        setLoanProducts(response.data);
      } catch (error) {
        console.error('Error fetching Loan Officers:', error);
      }
    };
    fetchLoanProducts();
  }, []);

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
  }, []);

  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Loan</h2>
        <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 py-4 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                <label htmlFor="ClientID">Client</label>
                <select
                    name="ClientID"
                    id="ClientID"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formik.values.ClientID} // Bind value to Formik
                    onChange={formik.handleChange} // Update Formik state on change
                >
                    <option value="">
                    Select a client
                    </option>
                    {clients.map((client) => (
                    <option key={client.ClientID} value={client.ClientID}>
                        {client.FirstName} {client.LastName}
                    </option>
                    ))}
                </select>
                </div>

                  
                <div className="md:col-span-5">
                <label htmlFor="LoanProductID">Loan Product</label>
                <select
                    name="LoanProductID"
                    id="LoanProductID"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formik.values.LoanProductID} // Bind value to Formik
                    onChange={formik.handleChange} // Update Formik state on change
                >
                    <option value="">
                    Select a loan product
                    </option>
                    {loanProducts.map((loanProducts) => (
                    <option key={loanProducts.LoanProductID} value={loanProducts.LoanProductID}>
                        {loanProducts.ProductName}
                    </option>
                    ))}
                </select>
                </div>

                  <div className="md:col-span-2">
                    <label htmlFor="LoanAmount">Loan Amount</label>
                    <input
                      type="number"
                      name="LoanAmount"
                      id="LoanAmount"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.LoanAmount}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="InterestRate">Interest Rate</label>
                    <input
                      type="number"
                      name="InterestRate"
                      id="InterestRate"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.InterestRate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="StartDate">Start Date</label>
                    <input
                      type="date"
                      name="StartDate"
                      id="StartDate"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.StartDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="EndDate">End Date</label>
                    <input
                      type="date"
                      name="EndDate"
                      id="EndDate"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.EndDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="LoanTerm">Loan Term (Months)</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="LoanTerm"
                        id="LoanTerm"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.LoanTerm}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="LoanStatus">Loan Status</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                        name="LoanStatus"
                        id="LoanStatus"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.LoanStatus}
                        onChange={formik.handleChange}
                        >
                        <option value="" disabled>
                            Select Loan Stauts
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                    </div>

                    <div className="md:col-span-2">
                    <label htmlFor="RemainingTenure">Remaining Tenure</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="RemainingTenure"
                        id="RemainingTenure"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.RemainingTenure}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="RemainingBalance">Remaining Balance</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="RemainingBalance"
                        id="RemainingBalance"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.RemainingBalance}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="AmountPaid">Amount Paid</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="AmountPaid"
                        id="AmountPaid"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.AmountPaid}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="MissedPayments">Missed Payments</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="MissedPayments"
                        id="MissedPayments"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.MissedPayments}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="FixedMonthlyPayment">Fixed Monthly Payment</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="FixedMonthlyPayment"
                        id="FixedMonthlyPayment"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.FixedMonthlyPayment}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="NextInterest"></label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="number"
                        name="NextInterest"
                        id="NextInterest"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.NextInterest}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update Loan
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

export default LoansTable;
