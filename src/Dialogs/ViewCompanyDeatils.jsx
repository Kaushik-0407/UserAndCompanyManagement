import React from "react";
import CustomModal from "./customModal";

const ViewCompanyDetails = ({ onClose, data }) => {
  const modalHeader = () => (
    <div className="text-center border-b pb-4">
      <h2 className="text-2xl font-bold text-blue-600">Company Details</h2>
    </div>
  );

  const modalBody = () => (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-6">
      {/* Company Name and Bio */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 break-words">
          {data.companyName}
        </h2>
        <p className="text-sm text-gray-500 italic">
          Reliable business partner
        </p>
      </div>

      {/* Company Details */}
      <div className="space-y-4 text-gray-700">
        <div className="flex flex-wrap items-start">
          <strong className="w-full sm:w-auto sm:mr-2">Email:</strong>
          <span className="text-sm break-all">{data.email}</span>
        </div>
        <div className="flex flex-wrap items-start">
          <strong className="w-full sm:w-auto sm:mr-2">Contact No:</strong>
          <span className="text-sm break-all">{data.mobileNumber}</span>
        </div>
      </div>
    </div>
  );

  const modalFooter = () => (
    <div className="flex justify-end mt-6">
      <button
        onClick={onClose}
        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
      >
        Close
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

export default ViewCompanyDetails;
