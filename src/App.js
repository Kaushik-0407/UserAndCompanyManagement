import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { AppProvider } from "./contextApi/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompaniesList from "./components/CompanyList";
import UserList from "./components/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndividualUserList from "./components/IndividualUserList";

function App() {
  return (
    <React.Fragment>
          <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/allCompanies" element={<CompaniesList />} />
            <Route path="/userList" element={<UserList/>} />
            <Route path="/singleUserList" element={<IndividualUserList/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
    </React.Fragment>
  );
}

export default App;
