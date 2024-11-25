import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../contextApi/AppContext";
import { getCompanyList, getEmployeeList } from "../service/apiService";
import { useNavigate } from "react-router-dom";
import ViewCompanyDetails from "../Dialogs/ViewCompanyDeatils";
import ViewUserDeatils from "../Dialogs/ViewUserDeatils";
import AddUserModal from "../Dialogs/AddUser";
import { toast } from "react-toastify";
import AddCompanyModal from "../Dialogs/AddCompany";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addCompanyModalOpen, setAddCompanyModalOpen] = useState(false);

  const handleAddUserModalOpen = () => setAddUserModalOpen(true);
  const handleAddUserModalClose = () => setAddUserModalOpen(false);

  const [viewCompanymodalOpen, setViewCompanymodalOpen] = useState({
    isOpen: false,
    data: null,
  });
  const [viewUsermodalOpen, setViewUsermodalOpen] = useState({
    isOpen: false,
    data: null,
  });

  const navigate = useNavigate();

  const fetchEmployeeList = async () => {
    const response = await getEmployeeList();
    if (response) {
      dispatch({ type: "SET_EMPLOYEE_LIST", payload: response });
    }
  };

  const fetchCompanyList = async () => {
    const response = await getCompanyList();
    if (response) {
      dispatch({ type: "SET_COMPANY_LIST", payload: response });
    }
  };

  useEffect(() => {
    // Only fetch data if it's not already in the state
    if (state.companyList.length === 0) {
      fetchCompanyList();
    }

    if (state.employeeList.length === 0) {
      fetchEmployeeList();
    }
  }, [state.companyList.length, state.employeeList.length]);

  const handleSaveUser = (data) => {
    const lastId = state.employeeList.length
      ? parseInt(state.employeeList[state.employeeList.length - 1].id)
      : 0;
    const newUser = {
      id: (lastId + 1).toString(),
      name: data.name,
      email: data.email,
      mobileNumber: data.mobileNumber,
      avatar: null,
      currency: null,
      isActive: null,
      totalUnpaidBooking: null,
      availableLimit: null,
      companyId: null,
    };
    dispatch({ type: "ADD_EMPLOYEE", payload: newUser });
    toast.success("User Registered Successfully");
    handleAddUserModalClose();
  };

  const handleSaveCompany = (data) => {
    const lastId = state.companyList.length
      ? parseInt(state.companyList[state.companyList.length - 1].id)
      : 0;
    const newCompany = {
      id: (lastId + 1).toString(),
      companyName: data.companyName,
      email: data.email,
      mobileNumber: data.contactNo,
      logo: null,
      address : null,
      availableCreditLimit: null,
      totalUnpaidBooking: null,
      gst_num:null
    };
    dispatch({ type: "ADD_COMPANY", payload: newCompany });
    toast.success("Company Registered Successfully");
    setAddCompanyModalOpen(false);
  };

  const handleViewAllUsers = () => {
    navigate("/userList", { state: { employeeList: state.employeeList } });
  };

  const handleCloseViewUserModal = () => {
    setViewUsermodalOpen((prev) => ({ ...prev, isOpen: false, data: null }));
  };

  const handleOpenViewUserModal = (data) => {
    setViewUsermodalOpen((prev) => ({ ...prev, isOpen: true, data: data }));
  };

  const handleCloseViewCompanyModal = () => {
    setViewCompanymodalOpen((prev) => ({
      ...prev,
      isOpen: false,
      data: null,
    }));
  };

  const handleOpenViewCompanyModal = (data) => {
    setViewCompanymodalOpen((prev) => ({
      ...prev,
      isOpen: true,
      data: data,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6 bg-blue-100 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-wide">
          Company & Employee Management Dashboard
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          Manage companies and employees seamlessly with ease.
        </p>
      </header>

      {/* Summary Section */}
      <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Companies</h2>
          <p className="text-3xl font-bold text-blue-500">
            {state.companyList.length}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold text-green-500">
            {state.employeeList.length}
          </p>
        </div>
      </section>

      {/* Data Display Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company List */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Companies</h2>
          <ul className="space-y-2">
            {state.companyList.slice(0, 5).map((company) => (
              <li
                key={company.id}
                className="p-2 border-b border-gray-200 flex justify-between"
              >
                <span className="font-medium">{company.companyName}</span>
                <span
                  className="view-details"
                  onClick={() => handleOpenViewCompanyModal(company)}
                >
                  View Details
                </span>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={() => navigate("/allCompanies")}
          >
            View All Companies
          </button>
        </div>

        {/* Employee List */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {state.employeeList.slice(0, 5).map((employee) => (
              <li
                key={employee.id}
                className="p-2 border-b border-gray-200 flex justify-between"
              >
                <span className="font-medium">{employee.name}</span>
                <span
                  className="view-details"
                  onClick={() => handleOpenViewUserModal(employee)}
                >
                  View Details
                </span>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 text-blue-500 hover:underline"
            onClick={handleViewAllUsers}
          >
            View All Users
          </button>
        </div>
      </section>

      {/* Actions */}
      <section className="mt-6 mb-6">
        <button
          onClick={() => setAddCompanyModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
        >
          Add New Company
        </button>
        <button
          onClick={handleAddUserModalOpen}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New User
        </button>
      </section>

      {/* Modals */}

      {addUserModalOpen && (
        <AddUserModal
          onClose={handleAddUserModalClose}
          onSave={handleSaveUser}
        />
      )}
      {addCompanyModalOpen && (
        <AddCompanyModal
          onClose={() => setAddCompanyModalOpen(false)}
          onSave={handleSaveCompany}
        />
      )}
      {viewCompanymodalOpen.isOpen && (
        <ViewCompanyDetails
          onClose={handleCloseViewCompanyModal}
          data={viewCompanymodalOpen.data}
        />
      )}

      {viewUsermodalOpen.isOpen && (
        <ViewUserDeatils
          onClose={handleCloseViewUserModal}
          data={viewUsermodalOpen.data}
        />
      )}
    </div>
  );
};

export default Home;
