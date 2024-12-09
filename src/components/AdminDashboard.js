import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddOwner from './Addowner';
import AddFlatDetails from './AddFlatDetails';
import UpdateFlatOwner from './UpdateFlatOwner';
import FinancialExpenses from './FinancialExpenses';
import '../output.css';

function AdminDashboard({setLoginStatus}) {

  const logout=()=>{
    setLoginStatus(false)
  }
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-white px-4 py-2">
        <h1 className="text-4xl font-extrabold text-center text-black mb-8">
          Admin Dashboard
        </h1>

        <nav className="bg-gradient-to-b from-blue-300 to-white shadow-lg rounded-lg mb-8">
          <div className="max-w-4xl mx-auto p-4 flex justify-around">
            <Link
              to="/add-owner"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Add Flat Owner
            </Link>
            <Link
              to="/add-flat-details"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Add Flat Details
            </Link>
            <Link
              to="/update-flat-owner"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Update Flat Owner
            </Link>
            <Link
              to="/financial-expenses"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
            >
              Financial Expenses
            </Link>
            <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md" onClick={logout}>Logout</button>
          </div>
        </nav>

        {/* Routes */}
        <div>
          <Routes>
            <Route path="/add-owner" element={<AddOwner />} />
            <Route path="/add-flat-details" element={<AddFlatDetails />} />
            <Route path="/update-flat-owner" element={<UpdateFlatOwner />} />
            <Route path="/financial-expenses" element={<FinancialExpenses />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AdminDashboard;
