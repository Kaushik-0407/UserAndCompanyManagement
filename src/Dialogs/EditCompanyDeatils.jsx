import React, { useState } from "react";
import CustomModal from "./customModal";

const EditCompanyDetails = ({ onClose, data, onSave }) => {
  const [updatedCompany, setUpdatedCompany] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedCompany);
  };

  const modalHeader = () => (
    <div className="text-center border-b pb-4 mb-4">
      <h2 className="text-2xl font-bold text-blue-600">Edit Company</h2>
    </div>
  );

  const modalBody = () => (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="companyName"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={updatedCompany.companyName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter company name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedCompany.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="mobileNumber"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Contact Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={updatedCompany.mobileNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter contact number"
          required
        />
      </div>
    </form>
  );

  const modalFooter = () => (
    <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
      <button
        type="button"
        onClick={onClose}
        className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      >
        Save
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto md:max-w-lg">
      <CustomModal
        modalHeader={modalHeader}
        modalBody={modalBody}
        modalFooter={modalFooter}
      />
    </div>
  );
};

export default EditCompanyDetails;