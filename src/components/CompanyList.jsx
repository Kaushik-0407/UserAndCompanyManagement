import React, { useState, useContext } from "react";
import { AppContext } from "../contextApi/AppContext";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { FaEdit, FaTrash } from "react-icons/fa"; // Font Awesome Icons
import { toast } from "react-toastify";
import ViewCompanyDetails from "../Dialogs/ViewCompanyDeatils";
import EditCompanyDetails from "../Dialogs/EditCompanyDeatils";

const CompaniesList = () => {
  const { state, dispatch } = useContext(AppContext); // Access the context for company and employee data
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Number of companies to show per page
  const [viewModalOpen, setViewModalOpen] = useState({ isOpen: false, data: null });
  const [editModalOpen, setEditModalOpen] = useState({ isOpen: false, data: null });

  // Calculate the total number of pages
  const totalPages = Math.ceil(state.companyList.length / itemsPerPage);

  // Get the companies for the current page
  const currentCompanies = state.companyList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewAssociatedUsers = (id) => {
    const associatedUsers = state.employeeList.filter(
      (item) => id === item.companyId
    );
    navigate("/singleUserList", { state: { employeeList: associatedUsers } });
  };

  const handleCloseViewModal = () => {
    setViewModalOpen({ isOpen: false, data: null });
  };

  const handleOpenViewModal = (CompanyData) => {
    setViewModalOpen({ isOpen: true, data: CompanyData });
  };

  const handleCloseEditModal = () => {
    setEditModalOpen({ isOpen: false, data: null });
  };

  const handleOpenEditModal = (CompanyData) => {
    setEditModalOpen({ isOpen: true, data: CompanyData });
  };

  const handleEditCompany = (updatedCompany) => {
    dispatch({
      type: "UPDATE_COMPANY",
      payload: { updatedCompany },
    });
    toast.success("Company updated successfully!");
    handleCloseEditModal();
  };

  const handleDeleteCompany = (companyId) => {
    let confirm = window.confirm("Are you sure you want to delete this Company?");
    if (confirm) {
      dispatch({
        type: "DELETE_COMPANY",
        payload: { companyId },
      });
      toast.success("Company Deleted");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="mb-6 bg-blue-100 p-4 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-900 tracking-wide">
          Companies List
        </h1>
      </section>

      {/* Companies Table */}
      <section className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 text-center text-lg font-semibold text-blue-900">
                Company Name
              </th>
              <th className="py-3 px-4 text-center text-lg font-semibold text-blue-900">
                Details
              </th>
              <th className="py-3 px-4 text-center text-lg font-semibold text-blue-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company) => (
              <tr
                key={company.id}
                className="border-b hover:bg-blue-50 transition duration-200"
              >
                <td
                  className="py-3 px-4 text-center text-blue-700 font-medium cursor-pointer hover:underline"
                  onClick={() => handleViewAssociatedUsers(company.id)}
                  title="View associated users"
                >
                  {company.companyName}
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    onClick={() => handleOpenViewModal(company)}
                  >
                    View Company Details
                  </span>
                </td>
                <td className="py-3 px-6 text-center flex justify-center space-x-4">
                  {/* Edit Icon */}
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleOpenEditModal(company)}
                    title="Edit Company"
                  >
                    <FaEdit size={20} />
                  </button>

                  {/* Delete Icon */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCompany(company.id)}
                    title="Delete Company"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* View Company Modal */}
      {viewModalOpen.isOpen && (
        <ViewCompanyDetails onClose={handleCloseViewModal} data={viewModalOpen.data} />
      )}

      {/* Edit Company Modal */}
      {editModalOpen.isOpen && (
        <EditCompanyDetails
          onClose={handleCloseEditModal}
          data={editModalOpen.data}
          onSave={handleEditCompany}
        />
      )}
    </div>
  );
};

export default CompaniesList;
