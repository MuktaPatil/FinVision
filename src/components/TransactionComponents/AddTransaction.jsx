import React from "react";
import { useFormik } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const AddTransaction = () => {
  const [clients, setClients] = useState([])
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loanProducts, setLoanProducts] = useState([])
  const [FixedMonthlyPayment, setFixedMonthlyPayment] = useState('')
  uses
  const [fpmLoanID, setFpmLoanID] = useState('')

  const formik = useFormik({
    initialValues: {
      LoanID: "",
      ClientID:"",
      TransactionDate: "",
      TransactionType: "",
      Amount: "",
    },
    onSubmit: (values) => {
        const formattedValues = {
            ...values,
            ClientID: parseInt(values.ClientID, 10) || null,
            LoanID: parseInt(values.LoanID, 10) || null          };
      console.log(values);
      AddNew(formattedValues)
    },
  });

  const AddNew = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/transactions/post', values);
      console.log(response.data); // Log the server response
      alert('Transaction Added Successfully');
      navigate('/transactions')
    } catch (error) {
      alert('Transaction Added Successfully');
      navigate('/transactions')
    }
  };

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
  }, [formik.values.ClientID]);

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
  }, [loans, formik.values.ClientID]);

  useEffect(() => {
    if (formik.values.ClientID) {
      const filtered = loans.filter(loan => loan.ClientID == formik.values.ClientID);
      setFilteredLoans(filtered);
      console.log('Filtered Loans', filteredLoans)
    } else {
      setFilteredLoans([]);
    }
  }, [formik.values.ClientID, loans]);


  useEffect(() => {
    if (filteredLoans.length === 1) {
        setFixedMonthlyPayment(filteredLoans[0].FixedMonthlyPayment);
    } else {
        const matchedLoans = filteredLoans.filter(loan => loan.LoanID === formik.values.LoanID);
        if (matchedLoans.length > 0) {
            setFixedMonthlyPayment(matchedLoans[0].FixedMonthlyPayment);
        } else {
            setFixedMonthlyPayment(null); // Handle no matching loan case
        }
    }
}, [formik.values.LoanID, filteredLoans, setFixedMonthlyPayment]);

  

  const navigate = useNavigate()

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center font-mono">
      <div className="container max-w-screen-lg mx-auto">
      <IoMdArrowRoundBack 
      className="icon hover:scale-150 transition-transform duration-200 h-5 w-5 cursor-pointer"
      onClick={() => navigate('/transactions')} />
        <div>
          <h2 className="font-semibold text-xl p-2 text-gray-600">Record a new transaction</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Transaction Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
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

                <div className="md:col-span-2">
                <label htmlFor="LoanID">Loan</label>
                <select
                    name="LoanID"
                    id="LoanID"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formik.values.LoanID}
                    onChange={formik.handleChange}
                    disabled={!formik.values.ClientID} // Disable if no ClientID is selected
                >
                    <option value="">Select a loan</option>
                    {loanProducts
                    .filter((product) => 
                        filteredLoans.some((loan) => loan.LoanProductID === product.LoanProductID)
                    ) 
                    .map((product) => {
                        // Find the corresponding loan based on LoanProductID
                        const loan = filteredLoans.find((loan) => loan.LoanProductID === product.LoanProductID);
                        return (
                        <option key={product.LoanProductID} value={loan?.LoanID}>
                            {product.ProductName} {/* Display ProductName */}
                        </option>
                        );
                    })}
                </select>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="FixedMonthlyPayment">Fixed Monthly Payment</label>
                    <input
                      type="text"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={FixedMonthlyPayment}
                      readOnly={true}
                    />
                  </div>

                <div className="md:col-span-2">
                    <label htmlFor="TransactionType">Transaction Type</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                        name="TransactionType"
                        id="TransactionType"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.TransactionType}
                        onChange={formik.handleChange}
                        >
                        <option value="" disabled>
                            Select Transaction Type
                        </option>
                        <option value="Repayment">Repayment</option>
                        <option value="Disbursment">Disbursment</option>
                        <option value="Overdue Payment">Overdue Payment</option>
                        <option value="Processing Fee">Processing Fee</option>
                        </select>
                    </div>
                    </div>
                  <div className="md:col-span-2">
                    <label htmlFor="Amount">Amount</label>
                    <input
                      type="number"
                      name="Amount"
                      id="Amount"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.Amount}
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

                  

                  <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default AddTransaction;
