import React from "react";
import ComplaintFeedback from "./Complaint";
import Maintainance from "./Maintainance";
import FinancialExpenses from "./FinancialExpenses"
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Financialdata from "./Financialdata";
import OwnerServices from "./Ownerservices";

function Owner({ oid, username }) {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-yellow-400">Owner Dashboard</h1>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/viewexpenses"
                className="p-2 rounded hover:bg-gray-700"
              >
                View Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/lodgecomplaint"
                className="p-2 rounded hover:bg-gray-700"
              >
                Lodge Complaint
              </Link>
            </li>
            <li>
              <Link
                to="/ownerservices"
                className="p-2 rounded hover:bg-gray-700"
              >
                Owner Services
              </Link>
            </li>
            <li>
              <Link
                to="/paymaintainence"
                className="p-2 rounded hover:bg-gray-700"
              >
                Pay Maintenance
              </Link>
            </li>
            <li>
              <Link
                to="/expensegraphicview"
                className="p-2 rounded hover:bg-gray-700"
              >
                Expense Graphic View
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Define Routes */}
      <div className="bg-gray-900 text-white p-4">
        <Routes>
          <Route path="/viewexpenses" element={<Financialdata />} /> 
          <Route path="/lodgecomplaint" element={<ComplaintFeedback />} />
          <Route path="/ownerservices" element={<OwnerServices />} />
          <Route path="/paymaintainence" element={<Maintainance oid={oid} />} />
          <Route path="/expensegraphicview" element={<FinancialExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Owner;
