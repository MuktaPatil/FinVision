import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const AddClient = () => {
  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      DateOfBirth: "",
      Gender: "",
      Address: "",
      City: "",
      State: "",
      Country: "",
      PhoneNumber: "",
      Email: "",
      IncomeLevel: "",
      ClientStatus: "",
      DateAdded: "",
    },
    onSubmit: (values) => {
      console.log(values);
      AddNew(formik.values)
    },
  });

  const AddNew = async (values) => {
    try {
      const response = await axios.post('http://localhost:5500/clients/post', values);
      console.log(response.data); // Log the server response
      alert('Client Added Successfully');
      navigate('/clients')
    } catch (error) {
      console.error('Error adding client:', error); // Improved error logging
      alert('Failed to add client. Please try again.');
    }
  };

  const navigate = useNavigate()

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center font-mono">
      <div className="container max-w-screen-lg mx-auto">
      <IoMdArrowRoundBack 
      className="icon hover:scale-150 transition-transform duration-200 h-5 w-5 cursor-pointer"
      onClick={() => navigate('/clients')} />
        <div>
          <h2 className="font-semibold text-xl p-2 text-gray-600">Add a new client</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
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
                    <label htmlFor="DateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      name="DateOfBirth"
                      id="DateOfBirth"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.DateOfBirth}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="Gender">Gender</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                        name="Gender"
                        id="Gender"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.Gender}
                        onChange={formik.handleChange}
                        >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select>
                    </div>
                    </div>

                  <div className="md:col-span-2">
                    <label htmlFor="Address">Address / Street</label>
                    <input
                      type="text"
                      name="Address"
                      id="Address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.Address}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="City">City</label>
                    <input
                      type="text"
                      name="City"
                      id="City"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.City}
                      onChange={formik.handleChange}
                    />
                  </div>

                  
                  <div className="md:col-span-2">
                    <label htmlFor="State">State</label>
                    <input
                      type="text"
                      name="State"
                      id="State"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.State}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="Country">Country</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="text"
                        name="Country"
                        id="Country"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.Country}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="PhoneNumber">Phone No.</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="text"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.PhoneNumber}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="Email">Email</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="text"
                        name="Email"
                        id="Email"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.Email}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="IncomeLevel">Income Level</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                        name="IncomeLevel"
                        id="IncomeLevel"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.IncomeLevel}
                        onChange={formik.handleChange}
                        >
                        <option value="" disabled>
                            Select Income Level
                        </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        </select>
                    </div>
                    </div>


                  <div className="md:col-span-2">
                    <label htmlFor="ClientStatus">Client Status</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                        name="ClientStatus"
                        id="ClientStatus"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={formik.values.ClientStatus}
                        onChange={formik.handleChange}
                        >
                        <option value="" disabled>
                            Select Status
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blacklisted">Blacklisted</option>
                        </select>
                    </div>
                    </div>

                    
                    <div className="md:col-span-2">
                    <label htmlFor="DateAdded">Date Added</label>
                    <input
                      type="date"
                      name="DateAdded"
                      id="DateAdded"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formik.values.DateAdded}
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

export default AddClient;
