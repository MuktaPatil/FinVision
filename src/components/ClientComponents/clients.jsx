import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show

  const deleteClient = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this client?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/clients/delete/${ID}`);
      alert('Client Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete client');
    }
  }

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
  }, [deleteClient]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredClients(
      clients.filter(
        (client) =>
          client.FirstName.toLowerCase().includes(lowerCaseQuery) ||
          client.LastName.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, clients]);
  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (client) => {
    setSelectedClient(client);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedClient(null);
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
            onClick={() => navigate('/add-client')}
          >
            <span>Add Client</span>
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
                  <th className="px-2 py-2 border">Date of Birth</th>
                  <th className="px-2 py-2 border">Gender</th>
                  <th className="px-2 py-2 border">City</th>
                  <th className="px-2 py-2 border">State</th>
                  <th className="px-2 py-2 border">Country</th>
                  <th className="px-2 py-2 border">Phone Number</th>
                  <th className="px-2 py-2 border">Email</th>
                  <th className="px-2 py-2 border">Income Level</th>
                  <th className="px-2 py-2 border">Client Status</th>
                  <th className="px-2 py-2 border">Date Added</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {filteredClients.slice(0, rowsToShow).map((client) => (
                  <tr key={client.ClientID}>
                    <td className="px-2 py-2 border">
                      <div className="flex space-x-2 justify-center">
                        <BsPencilFill
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => openPopup(client)}
                        />
                        <FaTrashAlt
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => deleteClient(client.ClientID)}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2 border">{client.ClientID}</td>
                    <td className="px-2 py-2 border">{client.FirstName}</td>
                    <td className="px-2 py-2 border">{client.LastName}</td>
                    <td className="px-2 py-2 border">{formatDate(client.DateOfBirth)}</td>
                    <td className="px-2 py-2 border">{client.Gender}</td>
                    <td className="px-2 py-2 border">{client.City}</td>
                    <td className="px-2 py-2 border">{client.State}</td>
                    <td className="px-2 py-2 border">{client.Country}</td>
                    <td className="px-2 py-2 border">{client.PhoneNumber}</td>
                    <td className="px-2 py-2 border">{client.Email}</td>
                    <td className="px-2 py-2 border">{client.IncomeLevel}</td>
                    <td className="px-2 py-2 border">{client.ClientStatus}</td>
                    <td className="px-2 py-2 border">{formatDate(client.DateAdded)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredClients.length > rowsToShow && (
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
      {isPopupOpen && <EditClientPopup client={selectedClient} onClose={closePopup} />}
    </>
  );
};

const EditClientPopup = ({ client, onClose }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: client,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this client?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/clients/update/${client.ClientID}`, values);
        alert('Client updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating client:', error);
        alert('Failed to update client.');
      }
    },
  });
  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Client</h2>
        <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 py-4 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-2">
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

        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update Client
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

export default ClientsTable;
