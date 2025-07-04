import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const AddLoanOfficer = () => {
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      OfficeLocation: "",
      PerformanceRating: "",
      TotalLoansManaged: "",
    },
    onSubmit: (values) => {
      console.log(values);
      AddNewLoanOfficer(formik.values);
    },
  });

  const AddNewLoanOfficer = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/loan-officers/post', values);
      console.log(response.data); // Log the server response
      alert('Loan Officer Added Successfully');
      navigate('/loan-officers');
    } catch (error) {
      console.error('Error adding loan officer:', error); // Improved error logging
      alert('Failed to add loan officer. Please try again.');
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
                  <p className="font-medium text-lg">Loan Officer Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

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

                    <div className="md:col-span-5">
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

export default AddLoanOfficer;
