import React, { useState, useEffect } from 'react';
import { FaPlusSquare } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const LoanProductsTable = () => {
  const [loanProducts, setLoanProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLoanProduct, setSelectedLoanProduct] = useState(null);
  const [filteredLoanProducts, setFilteredLoanProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsToShow, setRowsToShow] = useState(30); // Track the number of rows to show

  const deleteLoanProduct = async(ID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Loan Product?');
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5500/loan-products/delete/${ID}`);
      alert('Loan Product Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete Loan Product');
    }
  }

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
  }, [deleteLoanProduct]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredLoanProducts(
      loanProducts.filter(
        (LoanProduct) =>
          LoanProduct.ProductName.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, loanProducts]);
  const formatDate = (dateString) => {
    const [year, month, dayWithTime] = dateString.split('-'); // Split the input "YYYY-MM-DDTHH:mm:ss"
    const [day] = dayWithTime.split('T'); // Extract the day part before the "T"
    return `${month}-${day}-${year}`; // Return the formatted date as "MM-DD-YYYY"
  };

  const openPopup = (LoanProduct) => {
    setSelectedLoanProduct(LoanProduct);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedLoanProduct(null);
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
            onClick={() => navigate('/add-loan-product')}
          >
            <span>Add LoanProduct</span>
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
                  <th className="px-2 py-2 border">Product Name</th>
                  <th className="px-2 py-2 border">Description</th>
                  <th className="px-2 py-2 border">Max Loan Amount</th>
                  <th className="px-2 py-2 border">Interest Rate</th>
                  <th className="px-2 py-2 border">Loan Term</th>
                  <th className="px-2 py-2 border">Processing Fee</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {filteredLoanProducts.slice(0, rowsToShow).map((LoanProduct) => (
                  <tr key={LoanProduct.LoanProductID}>
                    <td className="px-2 py-2 border">
                      <div className="flex space-x-2 justify-center">
                        <BsPencilFill
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => openPopup(LoanProduct)}
                        />
                        <FaTrashAlt
                          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                          onClick={() => deleteLoanProduct(LoanProduct.LoanProductID)}
                        />
                      </div>
                    </td>
                    <td className="px-2 py-2 border">{LoanProduct.LoanProductID}</td>
                    <td className="px-2 py-2 border">{LoanProduct.ProductName}</td>
                    <td className="px-2 py-2 border">{LoanProduct.Description}</td>
                    <td className="px-2 py-2 border">{LoanProduct.MaxLoanAmount}</td>
                    <td className="px-2 py-2 border">{LoanProduct.InterestRate}</td>
                    <td className="px-2 py-2 border">{LoanProduct.LoanTerm}</td>
                    <td className="px-2 py-2 border">{LoanProduct.ProcessingFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredLoanProducts.length > rowsToShow && (
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
      {isPopupOpen && <EditLoanProductPopup LoanProduct={selectedLoanProduct} onClose={closePopup} />}
    </>
  );
};

const EditLoanProductPopup = ({ LoanProduct, onClose }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: LoanProduct,
    onSubmit: async (values) => {
      const isConfirmed = window.confirm('Are you sure you want to update this LoanProduct?');
  
      if (!isConfirmed) {
        return;
      }
  
      try {
        await axios.put(`http://localhost:5500/loan-products/update/${LoanProduct.LoanProductID}`, values);
        alert('LoanProduct updated successfully!');
        onClose();
      } catch (error) {
        console.error('Error updating LoanProduct:', error);
        alert('Failed to update LoanProduct.');
      }
    },
  });
  

  return (
    <div className="fixed inset-0 font-mono flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-1/2"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Edit LoanProduct</h2>
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
        </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white justify-end px-4 py-2 rounded">
          Update LoanProduct
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

export default LoanProductsTable;
