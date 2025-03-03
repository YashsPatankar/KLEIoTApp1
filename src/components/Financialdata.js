import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Financialdata() {
    const [financedata, setFinancedata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:9000/api/owner/getfinancedata`)
            .then((response) => {
                setFinancedata(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching finance data:', err);
                setError('Failed to load financial data');
                setLoading(false);
            });
    }, []); // Removed financedata dependency to prevent infinite loop

    // Format currency values
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-center">
                <div className="bg-red-900/30 border border-red-700 text-red-200 px-6 py-4 rounded-lg max-w-md text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-bold mb-2">Error Loading Data</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2 text-yellow-400 tracking-wide">
                        Financial Summary
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Detailed breakdown of maintenance payments, expenses, and balances by financial year
                    </p>
                </div>

                {financedata.length > 0 ? (
                    <div className="bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Financial Year
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Balance Carried Forward
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Amount Collected
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Amount Expected
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Total Amount
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Expenses
                                        </th>
                                        <th className="bg-gradient-to-r from-yellow-700/80 to-yellow-600/80 text-yellow-100 p-4 text-left font-bold text-lg border-b border-gray-600">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {financedata.map((item, index) => (
                                        <tr 
                                            key={index} 
                                            className={`${index % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-700/70'} hover:bg-gray-600/90 transition-colors duration-200`}
                                        >
                                            <td className="p-4 border-b border-gray-700 font-medium">{item.financialyear}</td>
                                            <td className="p-4 border-b border-gray-700">{formatCurrency(item.balancecarriedforward)}</td>
                                            <td className="p-4 border-b border-gray-700 text-green-400 font-medium">{formatCurrency(item.amountcollected)}</td>
                                            <td className="p-4 border-b border-gray-700">{formatCurrency(item.amountexpected)}</td>
                                            <td className="p-4 border-b border-gray-700 font-medium">{formatCurrency(item.totalamount)}</td>
                                            <td className="p-4 border-b border-gray-700 text-red-400 font-medium">{formatCurrency(item.expenses)}</td>
                                            <td className="p-4 border-b border-gray-700 font-medium">{formatCurrency(item.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-gray-900/50 p-4 text-gray-400 text-sm border-t border-gray-700">
                            <p>Showing {financedata.length} financial records • Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-400 mb-2">No Financial Records Available</h3>
                        <p className="text-gray-500">There are no finance records in the system at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Financialdata;