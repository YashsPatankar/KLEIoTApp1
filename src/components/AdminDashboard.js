import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddOwner from "./Addowner";
import Addemployee from "./Addemployee";
import FinancialExpenses from "./FinancialExpenses";
import AddApartmentDetails from "./AddApartmentDetails";
import Adminsettings from "./Adminsettings";

function AdminDashboard({ setLoginStatus }) {
  const logout = () => {
    setLoginStatus(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-white px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-black mb-8">
          Admin Dashboard
        </h1>

        <nav className="bg-gradient-to-b from-blue-300 to-white shadow-lg rounded-lg mb-8">
          <div className="max-w-7xl mx-auto p-4 flex flex-wrap justify-center sm:justify-between gap-4">
            <Link
              to="/add-owner"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
            >
              Add Flat Owner
            </Link>
            <Link
              to="/add-employee"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
            >
              Add Employee
            </Link>
            <Link
              to="/financial-year"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
            >
              Set financial year
            </Link>
            <Link
              to="/add-apartment"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
            >
              Add Apartment
            </Link>
            <Link
              to="/financial-expenses"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
            >
              Financial Expenses
            </Link>
            <button
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md text-center"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Routes */}
        <div >
          <Routes>
            <Route path="/add-owner" element={<AddOwner />} />
            <Route path="/add-employee" element={<Addemployee />} />
            <Route path="/add-apartment" element={<AddApartmentDetails />} />
            <Route path="/financial-expenses" element={<FinancialExpenses />} />
            <Route path="/financial-year" element={<Adminsettings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminDashboard;
