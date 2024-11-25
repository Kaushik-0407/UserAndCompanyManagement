import React, { useState } from "react";

const CustomModal = ({ modalFooter, modalBody, modalHeader }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-1/3">
        {modalHeader()}
        <form>{modalBody()}</form>
        <div className="flex justify-end space-x-4 mt-2">{modalFooter()}</div>
      </div>
    </div>
  );
};

export default CustomModal;
