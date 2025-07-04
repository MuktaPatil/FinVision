import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useState, useEffect } from "react";

const AddCollateral = () => {
  const [loans, setLoans] = useState([])
  const formik = useFormik({
    initialValues: {
      LoanID: "",
      CollateralType:"",
      CollateralValue:"",
      CollateralDescription:"",
      CollateralStatus:""
    },
    onSubmit: (values) => {
      console.log(values);
      AddNew(formik.values)
    },
  });

  const AddNew = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/collaterals/post', values);
      console.log(response.data); // Log the server response
      alert('Collateral Added Successfully');
      navigate('/collaterals')
    } catch (error) {
      console.error('Error adding collateral:', error); // Improved error logging
      alert('Failed to add collateral. Please try again.');
    }
  };

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

  const navigate = useNavigate()

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center font-mono">
      <div className="container max-w-screen-lg mx-auto">
      <IoMdArrowRoundBack 
      className="icon hover:scale-150 transition-transform duration-200 h-5 w-5 cursor-pointer"
      onClick={() => navigate('/collaterals')} />
        <div>
          <h2 className="font-semibold text-xl p-2 text-gray-600">Add a new collateral</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Collateral Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
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
                    <label htmlFor="CollateralType">Collateral Type</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        name="CollateralType"
                        id="CollateralType"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.CollateralType}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          Select Collateral Type
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
                    <label htmlFor="CollateralValue">Collateral Value</label>
                    <input
                      type="number"
                      name="CollateralValue"
                      id="CollateralValue"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.CollateralValue}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="CollateralDescription">Collateral Description</label>
                    <input
                      type="text"
                      name="CollateralDescription"
                      id="CollateralDescription"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.CollateralDescription}
                      onChange={formik.handleChange}
                    />
                  </div>

                  
                  <div className="md:col-span-2">
                    <label htmlFor="CollateralStatus">Collateral Status</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <select
                        name="CollateralStatus"
                        id="CollateralStatus"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.CollateralStatus}
                        onChange={formik.handleChange}
                      >
                        <option value="" disabled>
                          Select Collateral Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pledged">Pledged</option>
                        <option value="Released">Released</option>
                        <option value="Seized">Seized</option>
                      </select>
                    </div>
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

export default AddCollateral;
