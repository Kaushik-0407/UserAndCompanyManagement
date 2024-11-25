import React, { createContext, useReducer } from "react";

// Create the context
export const AppContext = createContext();

// Initial state
const initialState = {
  companyList: [],
  employeeList: [],
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE_LIST":
      return { ...state, employeeList: action.payload };
    case "SET_COMPANY_LIST":
      return { ...state, companyList: action.payload };
    case "ADD_COMPANY":
      return { ...state, companyList: [...state.companyList, action.payload] };
      case "ADD_EMPLOYEE":
        return {
          ...state,
          employeeList: [...state.employeeList, action.payload],
        };
    case "DELETE_COMPANY":
      // Remove the company from the company list
      const updatedCompanies = state.companyList.filter(
        (company) => company.id !== action.payload.companyId
      );
      // Remove the employees associated with the deleted company
      const updatedEmployees = state.employeeList.filter(
        (employee) => employee.companyId !== action.payload.companyId
      );
      return {
        ...state,
        companyList: updatedCompanies,
        employeeList: updatedEmployees,
      };
    case "DELETE_EMPLOYEE":
      // Remove the employee from the employee list
      const updatedEmployeeList = state.employeeList.filter(
        (employee) => employee.id !== action.payload.employeeId
      );

      return {
        ...state,
        employeeList: updatedEmployeeList,
      };
    case "EDIT_EMPLOYEE":
      return {
        ...state,
        employeeList: state.employeeList.map((employee) =>
          employee.id === action.payload.id ? { ...action.payload } : employee
        ),
      };
      case "UPDATE_COMPANY": {
        const { updatedCompany } = action.payload;
  
        return {
          ...state,
          companyList: state.companyList.map((company) =>
            company.id === updatedCompany.id ? { ...company, ...updatedCompany } : company
          ),
        };
      }

    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
