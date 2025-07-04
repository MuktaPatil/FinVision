import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const AddLoanProduct = () => {
  const formik = useFormik({
    initialValues: {
      ProductName: "",
      Description: "",
      MaxLoanAmount: "",
      InterestRate: "",
      LoanTerm: "",
      ProcessingFee: "",
    },
    onSubmit: (values) => {
      console.log(values);
      AddNewLoanProduct(formik.values);
    },
  });

  const AddNewLoanProduct = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/loan-products/post', values);
      console.log(response.data); // Log the server response
      alert('Loan product Added Successfully');
      navigate('/loan-products');
    } catch (error) {
      console.error('Error adding loan product:', error); // Improved error logging
      alert('Failed to add loan product. Please try again.');
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center font-mono">
        <div className="container max-w-screen-lg mx-auto">
          <IoMdArrowRoundBack 
            className="icon hover:scale-150 transition-transform duration-200 h-5 w-5 cursor-pointer"
            onClick={() => navigate('/loan-officers')} 
          />
          <div>
            <h2 className="font-semibold text-xl p-2 text-gray-600">Add a new Loan Officer</h2>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Loan Product Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="ProductName">Product Name</label>
                      <input
                        type="text"
                        name="ProductName"
                        id="ProductName"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.ProductName}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="Description">Description</label>
                      <input
                        type="text"
                        name="Description"
                        id="Description"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="MaxLoanAmount">Max Loan Amount</label>
                      <input
                        type="text"
                        name="MaxLoanAmount"
                        id="MaxLoanAmount"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.MaxLoanAmount}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="InterestRate">Interest Rate</label>
                      <input
                        type="text"
                        name="InterestRate"
                        id="InterestRate"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.InterestRate}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="LoanTerm">Loan Term</label>
                      <input
                        type="text"
                        name="LoanTerm"
                        id="LoanTerm"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.LoanTerm}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="ProcessingFee">Processing Fee</label>
                      <input
                        type="number"
                        name="ProcessingFee"
                        id="ProcessingFee"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={formik.values.ProcessingFee}
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

export default AddLoanProduct;
