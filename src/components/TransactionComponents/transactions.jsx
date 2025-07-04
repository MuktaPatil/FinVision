import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([])

  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show

  const deleteTransaction = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/transactions/delete/${ID}`);
      alert('Transaction Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete transaction');
    }
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5500/transactions/get');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [deleteTransaction]);

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

    const monthlyCalculations = async() =>{
      const isConfirmed = window.confirm('Are you sure you want to run monthly calculations?');
    
      if (!isConfirmed) {
        return;
      }
      try {
        const response = await axios.post('http://localhost:5500/monthly-calculations/run-procedures')
        alert('Monthly Calculations have been done')
      } catch (error) {
        console.error('Error', error);
        
      }
    }
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredTransactions(
      transactions.filter(
        (transaction) =>
          transaction.TransactionType.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, transactions]);
  
  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (transaction) => {
    setSelectedTransaction(transaction);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedTransaction(null);
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
            onClick={() => navigate('/add-transaction')}
          >
            <span>Add Transaction</span>
            <FaPlusSquare />
          </button>

          <button
            className="flex items-center space-x-2 whitespace-nowrap bg-gray-700 text-white px-4 py-1 text-sm rounded hover:scale-105 transition-transform duration-200"
            onClick={monthlyCalculations}
          >
            <span>Monthly Calculations</span>
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
                  <th className="px-2 py-2 border">Loan ID</th>
                  <th className="px-2 py-2 border">Client ID</th>
                  <th className="px-2 py-2 border">Transaction Date</th>
                  <th className="px-2 py-2 border">Transaction Type</th>
                  <th className="px-2 py-2 border">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
  {filteredTransactions
    .sort((a, b) => new Date(b.TransactionDate) - new Date(a.TransactionDate)) // Sort by date in descending order
    .slice(0, rowsToShow) // Limit rows to show
    .map((transaction) => {
      const client = clients.find((client) => client.ClientID === transaction.ClientID);
      const clientName = client ? `${client.FirstName} ${client.LastName}` : "Unknown";
      return (
        <tr key={transaction.TransactionID}>
          <td className="px-2 py-2 border">
            <div className="flex space-x-2 justify-center">
              <BsPencilFill
                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => openPopup(transaction)}
              />
              <FaTrashAlt
                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                onClick={() => deleteTransaction(transaction.TransactionID)}
              />
            </div>
          </td>
          <td className="px-2 py-2 border">{transaction.TransactionID}</td>
          <td className="px-2 py-2 border">{transaction.LoanID}</td>
          <td className="px-2 py-2 border">{clientName}</td>
          <td className="px-2 py-2 border">{formatDate(transaction.TransactionDate)}</td>
          <td className="px-2 py-2 border">{transaction.TransactionType}</td>
          <td className="px-2 py-2 border">{transaction.Amount}</td>
        </tr>
      );
    })}
</tbody>

            </table>
          </div>
        </div>
        {filteredTransactions.length > rowsToShow && (
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
      {isPopupOpen && <EditTransactionPopup transaction={selectedTransaction} onClose={closePopup} />}
    </>
  );
};

const EditTransactionPopup = ({ transaction, onClose }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: transaction,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this transaction?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/transactions/update/${transaction.TransactionID}`, values);
        alert('Transaction updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating transaction:', error);
        alert('Failed to update transaction.');
      }
    },
  });
  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
        <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 py-4 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="LoanID">Loan</label>
                    <input
                      type="text"
                      name="LoanID"
                      id="LoanID"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.LoanID}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="ClientID">Client</label>
                    <input
                      type="text"
                      name="ClientID"
                      id="ClientID"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.ClientID}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="TransactionDate">Transaction Date</label>
                    <input
                      type="date"
                      name="TransactionDate"
                      id="TransactionDate"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.TransactionDate}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="Amount">Amount</label>
                    <input
                      type="text"
                      name="Amount"
                      id="Amount"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.Amount}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="PrincipalPaid">Principal Paid</label>
                    <input
                      type="text"
                      name="PrincipalPaid"
                      id="PrincipalPaid"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.PrincipalPaid}
                      onChange={formik.handleChange}
                    />
                  </div>

                  
                  <div className="md:col-span-2">
                    <label htmlFor="InterestPaid">Interest Paid</label>
                    <input
                      type="text"
                      name="InterestPaid"
                      id="InterestPaid"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.InterestPaid}
                      onChange={formik.handleChange}
                    />
                  </div>

        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update Transaction
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

export default TransactionsTable;
