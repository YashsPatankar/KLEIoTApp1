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
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600 px-6 py-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-white mb-12">
          Admin Dashboard
        </h1>
        <nav className="bg-white shadow-xl rounded-lg mb-12 p-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-between gap-6">
            <Link
              to="/add-owner"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            >
              Add Flat Owner
            </Link>
            <Link
              to="/add-employee"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            >
              Add Employee
            </Link>
            <Link
              to="/financial-year"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            >
              Set Financial Year
            </Link>
            <Link
              to="/add-apartment"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            >
              Add Apartment
            </Link>
            <Link
              to="/financial-expenses"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600"
            >
              Financial Expenses
            </Link>
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-100 to-red-100 text-white font-semibold rounded-lg transform transition duration-300 hover:scale-105 shadow-lg hover:bg-gradient-to-r hover:from-red-100 hover:to-red-100"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Dashboard Routes */}
        <div>
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
