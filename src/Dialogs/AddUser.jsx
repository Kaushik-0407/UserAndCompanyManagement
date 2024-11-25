import React, { useState } from "react";
import CustomModal from "./customModal";
import { toast } from "react-toastify";

const AddUserModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.name && formData.email && formData.mobileNumber) {
      onSave(formData);
    } else {
      toast.error("All fields are required!");
    }
  };

  const modalHeader = () => {
    return (
      <div className="text-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-blue-600">
          Add New User
        </h2>
      </div>
    );
  };

  const modalBody = () => {
    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter name"
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
              value={formData.email}
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
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter mobile number"
              required
            />
          </div>
        </form>
      </div>
    );
  };

  const modalFooter = () => {
    return (
      <div className="flex flex-col md:flex-row justify-end items-center space-y-4 md:space-y-0 md:space-x-4 mt-6">
        <button
          onClick={onClose}
          className="w-full md:w-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto md:max-w-lg">
      <CustomModal
        modalFooter={modalFooter}
        modalBody={modalBody}
        modalHeader={modalHeader}
      />
    </div>
  );
};

export default AddUserModal;
