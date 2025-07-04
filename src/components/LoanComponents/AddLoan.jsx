import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useState, useEffect } from "react";

const AddLoan = () => {
    const [clients, setClients] = useState([])
    const [loanProducts, setLoanProducts] = useState([]);
    const [loanOfficers, setLoanOfficers] = useState([]);
  const formik = useFormik({
    initialValues: {
      ClientID: "",
      LoanProductID: "",
      LoanAmount: "",
      InterestRate: "",
      StartDate: "",
      EndDate: "",
      LoanTerm: "",
      LoanStatus: "",
      LoanOfficerID: "",
    },
    onSubmit: (values) => {
        const formattedValues = {
            ...values,
            ClientID: parseInt(values.ClientID, 10) || null,
            LoanProductID: parseInt(values.LoanProductID, 10) || null,
            LoanAmount: parseFloat(values.LoanAmount) || null,
            InterestRate: parseFloat(values.InterestRate) || null,
            LoanTerm: parseInt(values.LoanTerm, 10) || null,
            LoanOfficerID: values.LoanOfficerID ? parseInt(values.LoanOfficerID, 10) : null,
          };
      
          console.log(formattedValues);
          AddNew(formattedValues);
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

    useEffect(() => {
      const calculateLoanTerm = () => {
        const { StartDate, EndDate } = formik.values;
        if (StartDate && EndDate) {
          const start = new Date(StartDate);
          const end = new Date(EndDate);
          const diffInMonths = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30.44)); // Approximate months
          formik.setFieldValue("LoanTerm", diffInMonths > 0 ? diffInMonths : 0);
        }
      };
      calculateLoanTerm();
    }, [formik.values.StartDate, formik.values.EndDate]);

    const calculateRemainingBalance = () => {
      const { LoanAmount, InterestRate, LoanTerm } = formik.values;

      if (LoanAmount && InterestRate && LoanTerm) {
          const monthlyInterestRate = InterestRate / 100 / 12; // Monthly interest rate
          const totalPayments = LoanTerm; // Loan Term in months

          // Calculate monthly payment using the amortization formula
          const monthlyPayment = (LoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) /
              (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

          // Assuming no payments have been made yet, Remaining Balance is the LoanAmount
          formik.setFieldValue("RemainingBalance", LoanAmount);
      }
  };

  // Trigger balance calculation whenever LoanAmount, InterestRate, or LoanTerm changes
  useEffect(() => {
      calculateRemainingBalance();
  }, [formik.values.LoanAmount, formik.values.InterestRate, formik.values.LoanTerm])

  const AddNew = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/loans/post', values);
      console.log(response.data); // Log the server response
      alert('Loan Added Successfully');
      navigate('/loans')
    } catch (error) {
      console.error('Error adding loan:', error); // Improved error logging
      alert('Failed to add loan. Please try again.');
    }
  };

  const navigate = useNavigate()

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center font-mono">
      <div className="container max-w-screen-lg mx-auto">
      <IoMdArrowRoundBack 
      className="icon hover:scale-150 transition-transform duration-200 h-5 w-5 cursor-pointer"
      onClick={() => navigate('/loans')} />
        <div>
          <h2 className="font-semibold text-xl p-2 text-gray-600">Add a new loan</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Loan Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                {/* Display warning dynamically for the selected client */}
                {clients.some(
                  (client) =>
                    client.ClientID == formik.values.ClientID &&
                    client.ClientStatus == 'Blacklisted'
                ) && (
                  <div className="md:col-span-5 text-red-600 font-bold">
                    This client is blacklisted because of past delinquencies.
                  </div>
                )}

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
            readOnly // Make it read-only as it will be auto-calculated
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


                    <div className="md:col-span-5">
                <label htmlFor="LoanOfficerID">Loan Officer</label>
                <select
                    name="LoanOfficerID"
                    id="LoanOfficerID"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formik.values.LoanOfficerID} // Bind value to Formik
                    onChange={formik.handleChange} // Update Formik state on change
                >
                    <option value="">
                    Select a loan officer
                    </option>
                    {loanOfficers.map((loanOfficers) => (
                    <option key={loanOfficers.LoanOfficerID} value={loanOfficers.LoanOfficerID}>
                        {loanOfficers.FirstName} {loanOfficers.LastName}                    </option>
                    ))}
                </select>
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

export default AddLoan;
