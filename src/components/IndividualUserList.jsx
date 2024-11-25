import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import { FaEdit, FaTrash } from "react-icons/fa"; // Font Awesome Icons
import { toast } from "react-toastify";
import ViewUserDetails from "../Dialogs/ViewUserDeatils";
import EditUserDetails from "../Dialogs/EditUserDetails";

const IndividualUserList = () => {
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalOpen, setModalOpen] = useState({ isOpen: false, data: null });

  const totalPages = Math.ceil(state.employeeList.length / itemsPerPage);
  const currentEmployees = state.employeeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCloseModal = () => {
    setModalOpen((prev) => ({ ...prev, isOpen: false, data: null }));
  };

  const handleOpenModal = (userData) => {
    setModalOpen((prev) => ({ ...prev, isOpen: true, data: userData }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-900 tracking-wide">User List</h1>
      </section>

      {/* User Table */}
      <section className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        {state.employeeList.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No users available.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-blue-900 uppercase">
              <tr className="border-b">
                <th className="py-3 px-6 text-sm font-bold text-center">User Name</th>
                <th className="py-3 px-6 text-sm font-bold text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="py-3 px-6 text-center text-gray-800 font-medium">
                    {employee.name}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className="text-blue-600 font-semibold cursor-pointer hover:underline"
                      onClick={() => handleOpenModal(employee)}
                    >
                      View Details
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* View Modal */}
      {modalOpen.isOpen && (
        <ViewUserDetails onClose={handleCloseModal} data={modalOpen.data} />
      )}
    </div>
  );
};

export default IndividualUserList;
