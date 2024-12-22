import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ setLoginStatus, setUserType,setUsername }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "Admin", // Default user type
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    setMessage(""); // Clear previous message
    setUsername(formData.username)
    try {
      // Make API request to login
      const response = await axios.post("http://localhost:9000/api/login/authenticate", formData);

      if (response.status === 200) {
        // Handle successful login
        setMessage(response.data.message);
        setUserType(response.data.userType); // Set userType from server response
        setLoginStatus(true); // Set login status to true
      } else {
        // Handle unexpected responses
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle errors
      setMessage(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-200 via-blue-300 to-blue-400 text-blue-900">
      <div className="w-full max-w-lg bg-gradient-to-t from-blue-300 via-blue-200 to-white p-10 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          Welcome to Apartment Management System
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-3" htmlFor="username">
              Username:
            </label>
            <input
              className="w-full p-4 rounded-lg bg-blue-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-3" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full p-4 rounded-lg bg-blue-50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold mb-3" htmlFor="userType">
              User Type:
            </label>
            <select
              className="w-full p-4 rounded-lg bg-blue-50 text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Chairman">Chairman</option>
              <option value="Secretary">Secretary</option>
              <option value="Owner">Owner</option>
              <option value="Security">Security</option>
            </select>
          </div>
          <button
            className={`w-full py-4 rounded-lg text-2xl font-bold ${
              isLoading
                ? "bg-blue-300 text-blue-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <p
              className={`mt-6 text-center text-xl font-semibold ${
                message.includes("failed") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
