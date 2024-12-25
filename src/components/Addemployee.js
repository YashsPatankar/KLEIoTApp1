import React, { useState } from 'react';
import axios from 'axios';
import '../output.css';

const Addemployee = () => {
  const [formData, setFormData] = useState({
    empcellno: '',
    empgender: 'M',
    empid: '',
    empname: '',
    empaadhaarno: '',
    empaddress: '',
    empsalarydet: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/admin/addemployee', {
        ...formData,
      });
      console.log('Data submitted successfully:', response.data);
      alert('Employee data saved successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to save data. Please try again.');
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-blue-600 to-white">
      <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-2xl w-full m-4">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Employee Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                name="empid"
                value={formData.empid}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="empname"
                value={formData.empname}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Cell No</label>
              <input
                type="text"
                name="empcellno"
                value={formData.empcellno}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="empgender"
                value={formData.empgender}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Aadhaar No</label>
              <input
                type="number"
                name="empaadhaarno"
                value={formData.empaadhaarno}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="empaddress"
                value={formData.empaddress}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Addemployee;