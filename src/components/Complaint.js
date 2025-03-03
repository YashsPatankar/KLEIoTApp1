import React, { useState } from "react";
import axios from "axios";

function ComplaintFeedback() {
  const [complaint, setComplaint] = useState({
    category: "",
    description: "",
    isAnonymous: false,
    status: "Pending",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage({ type: "", message: "" });
    
    const payload = {
      category: complaint.category,
      description: complaint.description,
      isAnonymous: complaint.isAnonymous,
      status: "Pending", // Always set to 'Pending'
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/AddComplaint",
        payload
      );
      setFeedbackMessage({
        type: "success",
        message: response.data.message || "Complaint submitted successfully!"
      });
      setComplaint({
        category: "",
        description: "",
        isAnonymous: false,
        status: "Pending",
      }); // Reset form
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setFeedbackMessage({
        type: "error",
        message: "Failed to submit complaint. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-xl shadow-2xl border border-gray-700 relative overflow-hidden">
      {/* Background accent elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 opacity-10 rounded-full -mr-32 -mt-32 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full -ml-32 -mb-32 blur-xl"></div>
      
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        Submit Complaint
      </h2>
      
      {feedbackMessage.message && (
        <div className={`mb-6 p-4 rounded-lg ${feedbackMessage.type === "success" ? "bg-green-900/50 text-green-200 border border-green-700" : "bg-red-900/50 text-red-200 border border-red-700"}`}>
          <p className="flex items-center">
            {feedbackMessage.type === "success" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {feedbackMessage.message}
          </p>
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-2 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Category
          </label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg shadow-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="maintenance">Maintenance</option>
            <option value="security">Security</option>
            <option value="parking">Parking</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-2 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Description
          </label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            placeholder="Describe your complaint or feedback in detail..."
            rows="4"
            required
            className="w-full px-4 py-3 bg-gray-800 text-gray-200 rounded-lg shadow-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-none"
          ></textarea>
        </div>

        {/* Anonymity Checkbox */}
        <div className="flex items-center space-x-3">
          <div className="relative inline-block">
            <input
              type="checkbox"
              name="isAnonymous"
              id="isAnonymous"
              checked={complaint.isAnonymous}
              onChange={handleInputChange}
              className="opacity-0 absolute h-5 w-5 cursor-pointer"
            />
            <div className={`border ${complaint.isAnonymous ? 'bg-purple-600 border-purple-500' : 'bg-gray-800 border-gray-600'} w-5 h-5 rounded-md flex flex-shrink-0 justify-center items-center mr-2 transition-colors duration-200 ease-in-out`}>
              {complaint.isAnonymous && (
                <svg className="fill-current text-white w-3 h-3 pointer-events-none" viewBox="0 0 20 20">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              )}
            </div>
          </div>
          <label htmlFor="isAnonymous" className="text-gray-300 cursor-pointer select-none flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Submit anonymously
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition duration-300 transform hover:-translate-y-1"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Complaint
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default ComplaintFeedback;