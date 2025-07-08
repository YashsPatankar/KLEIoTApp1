import React, { useState, useEffect, useRef } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";

// Register chart components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
);

const FinancialExpenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [monthWiseData, setMonthWiseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartType, setChartType] = useState("bar");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const selectedYear1=useRef("2022-2023")
  const displayNotification = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const onselection=()=>{
    axios
      .get("http://localhost:9000/api/admin/getsummaryexpenses/"+selectedYear1.current.value)
      .then((response) => {
        const data = response.data || [];
        setExpenseData(data);
        
        // Calculate total expenses
        const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
        setTotalExpenseAmount(total);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching summary expenses:", error);
        displayNotification("Failed to load expense data. Please try again later.", "error");
        setLoading(false);
      });
  }

  // Fetch overall summary expenses
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/admin/getsummaryexpenses/"+selectedYear1.current.value)
      .then((response) => {
        const data = response.data || [];
        setExpenseData(data);
        
        // Calculate total expenses
        const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
        setTotalExpenseAmount(total);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching summary expenses:", error);
        displayNotification("Failed to load expense data. Please try again later.", "error");
        setLoading(false);
      });
  }, [monthWiseData,selectedYear1]);

  // Fetch month-wise expenses based on the selected description
  const fetchMonthWiseExpenses = () => {
    if (!selectedDescription) {
      displayNotification("Please select a description.", "error");
      return;
    }

    if (!selectedYear) {
      displayNotification("Please select a year.", "error");
      return;
    }

    setChartLoading(true);
    
    const payload = {
      description: selectedDescription,
      year: selectedYear
    };

    axios.post("http://localhost:9000/api/admin/getmonthwiseexpenses", payload)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setMonthWiseData(data);
          displayNotification(`Successfully loaded data for ${selectedDescription} in ${selectedYear}`);
        } else {
          console.error("Unexpected response format for month-wise data:", data);
          displayNotification("Error: Unable to load month-wise data.", "error");
        }
        setChartLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching month-wise expenses:", error);
        displayNotification("Failed to fetch month-wise expenses.", "error");
        setChartLoading(false);
      });
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getMonthName = (monthNumber) => {
    return months[monthNumber - 1] || "Unknown";
  };

  // Colors for charts
  const chartColors = {
    bar: {
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderColor: "rgba(67, 56, 202, 1)",
    },
    doughnut: {
      backgroundColor: expenseData.map((_, index) => {
        const hue = (index * 30) % 360;
        return `hsla(${hue}, 70%, 60%, 0.8)`;
      }),
      borderColor: expenseData.map((_, index) => {
        const hue = (index * 30) % 360;
        return `hsla(${hue}, 70%, 50%, 1)`;
      }),
    },
    line: {
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "rgba(5, 150, 105, 1)",
    },
    monthWise: {
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      borderColor: "rgba(5, 150, 105, 1)",
    }
  };

  // Data for the overall expenses chart
  const overallChartData = {
    labels: expenseData.map((item) => item._id || "Unknown"),
    datasets: [
      {
        label: "Total Expenses",
        data: expenseData.map((item) => item.total || 0),
        backgroundColor: chartType === "doughnut" 
          ? chartColors.doughnut.backgroundColor 
          : chartColors.bar.backgroundColor,
        borderColor: chartType === "doughnut" 
          ? chartColors.doughnut.borderColor 
          : chartColors.bar.borderColor,
        borderWidth: 2,
        borderRadius: chartType === "bar" ? 10 : 0,
        tension: 0.4,
      },
    ],
  };

  // Data for the month-wise expenses chart
  const monthWiseChartData = {
    labels: monthWiseData ? monthWiseData.map((item) => getMonthName(item.month)) : [],
    datasets: [
      {
        label: `Expenses for ${selectedDescription} (${selectedYear})`,
        data: monthWiseData ? monthWiseData.map((item) => item.totalAmount || 0) : [],
        backgroundColor: chartColors.monthWise.backgroundColor,
        borderColor: chartColors.monthWise.borderColor,
        borderWidth: 2,
        borderRadius: 10,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: { 
        display: true, 
        text: chartType === "doughnut" ? "Expense Distribution" : "Financial Overview", 
        font: { size: 18, weight: 'bold' } 
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ₹${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: chartType !== "doughnut" ? {
      x: { grid: { display: false } },
      y: { 
        grid: { color: "rgba(209, 213, 219, 0.2)" },
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      },
    } : {},
  };

  // Render different chart types
  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (expenseData.length === 0) {
      return (
        <div className="flex justify-center items-center h-96 bg-gray-50 rounded-xl">
          <p className="text-center text-gray-500 text-lg">No expense data available</p>
        </div>
      );
    }

    switch (chartType) {
      case "bar":
        return <Bar data={overallChartData} options={chartOptions} />;
      case "doughnut":
        return <Doughnut data={overallChartData} options={chartOptions} />;
      case "line":
        return <Line data={overallChartData} options={chartOptions} />;
      default:
        return <Bar data={overallChartData} options={chartOptions} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10">
      {/* Notification */}
      {showNotification && (
        <div 
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            notificationType === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notificationMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Dashboard Header */}
        <div className="bg-white shadow-xl rounded-2xl mb-8 p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-800 mb-4 md:mb-0">
              Financial Expenses Dashboard
            </h1>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-indigo-50 rounded-lg">
                <span className="text-sm text-indigo-600 font-medium">Total Expenses</span>
                <div className="text-2xl font-bold text-indigo-800">₹{totalExpenseAmount.toLocaleString()}</div>
              </div>
              <div className="px-4 py-2 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600 font-medium">Categories</span>
                <div className="text-2xl font-bold text-green-800">{expenseData.length}</div>
              </div>
            </div>
          </div>
         

          {/* Chart Type Selection */}
          <div className="flex justify-center mb-6">
          <select
          ref={selectedYear1}
          onChange={onselection}
          className="block w-half m-2 p-2.5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition"
        >
          <option disabled selected>Year</option>
          <option>2022-2023</option>
          <option>2023-2024</option>
          <option>2024-2025</option>
          <option>2025-2026</option>
        </select>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setChartType("bar")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  chartType === "bar"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Bar Chart
              </button>
              <button
                type="button"
                onClick={() => setChartType("line")}
                className={`px-4 py-2 text-sm font-medium ${
                  chartType === "line"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Line Chart
              </button>
              <button
                type="button"
                onClick={() => setChartType("doughnut")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  chartType === "doughnut"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Doughnut Chart
              </button>
            </div>
          </div>

          {/* Overall Financial Chart */}
          <div className="h-96 mb-12">
            {renderChart()}
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Monthly Expense Analysis
          </h2>

          {/* Filter Section */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dropdown for Expense Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expense Category</label>
                <select
                  value={selectedDescription}
                  onChange={(e) => setSelectedDescription(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                >
                  <option value="" disabled>
                    Select a description
                  </option>
                  <option value="Electricity bill paid">Electricity Bill</option>
                  <option value="Water bill paid">Water Bill</option>
                  <option value="Watchman salary">Watchman Salary</option>
                  <option value="electrician_charges">Electrician Charges</option>
                  <option value="lift_maintenance_charges">Lift Maintenance Charges</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Dropdown for Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                >
                  <option value="" disabled>Select a Year</option>
                  {Array.from({ length: 14 }, (_, i) => 2022 + i).map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Button for Fetching Data */}
              <div className="flex items-end">
                <button
                  onClick={fetchMonthWiseExpenses}
                  disabled={chartLoading}
                  className={`w-full p-3 rounded-lg shadow text-white font-medium transition-all ${
                    chartLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                  }`}
                >
                  {chartLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Generate Report"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Month-Wise Financial Chart */}
          <div className="bg-white p-4 rounded-xl">
            <div className="h-96">
              {chartLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : monthWiseData ? (
                monthWiseData.length > 0 ? (
                  <Bar data={monthWiseChartData} options={chartOptions} />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">No data available for {selectedDescription} in {selectedYear}</p>
                    <p className="text-gray-400 text-sm mt-2">Try selecting a different category or year</p>
                  </div>
                )
              ) : (
                <div className="flex flex-col justify-center items-center h-full bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-lg">Select a category and year to view monthly breakdown</p>
                  <p className="text-gray-400 text-sm mt-2">Use the filters above to generate a report</p>
                </div>
              )}
            </div>
          </div>

          {/* Data Summary */}
          {monthWiseData && monthWiseData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Data Summary</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="text-sm text-gray-500 mb-1">Total Amount</h4>
                    <p className="text-2xl font-bold text-indigo-600">
                      ₹{monthWiseData.reduce((sum, item) => sum + (item.totalAmount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="text-sm text-gray-500 mb-1">Average Monthly</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(monthWiseData.reduce((sum, item) => sum + (item.totalAmount || 0), 0) / monthWiseData.length).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow">
                    <h4 className="text-sm text-gray-500 mb-1">Highest Month</h4>
                    <p className="text-2xl font-bold text-amber-600">
                      {(() => {
                        const highestExpense = Math.max(...monthWiseData.map(item => item.totalAmount || 0));
                        const highestMonth = monthWiseData.find(item => item.totalAmount === highestExpense);
                        return highestMonth ? getMonthName(highestMonth.month) : 'N/A';
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialExpenses;