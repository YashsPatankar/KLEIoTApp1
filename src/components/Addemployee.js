import React, { useState } from 'react';
import axios from 'axios';
import '../output.css'  

const Addemployee=()=>
{
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
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 flex items-center justify-left px-4">
          <div className="bg-white shadow-2xl rounded-xl p-10 max-w-2xl w-full m-4">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 text-center">Employee Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Employee ID:</label>
                <input
                  type="text"
                  name="empid"
                  value={formData.empid}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="empname"
                  value={formData.empname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  required/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Cell No:</label>
                <input
                  type="text"
                  name="empcellno"
                  value={formData.empcellno}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Gender:</label>
                <select
                  name="empgender"
                  value={formData.empgender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Aadhaar No:</label>
                <input
                  type="number"
                  name="empaadhaarno"
                  value={formData.empaadhaarno}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Address:</label>
                <input
                  type="text"
                  name="empaddress"
                  value={formData.empaddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Submit</button>
            </form>
          </div>
        </div>
      );
};

export default Addemployee;
