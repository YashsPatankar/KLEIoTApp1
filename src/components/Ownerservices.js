import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/api/owner/getOwnerServices`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching owner services data:', err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-6 my-6 shadow-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
            <div className="mt-2 text-md text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h3 className="text-2xl leading-6 font-bold text-gray-900">Owner Services</h3>
        <p className="mt-2 max-w-2xl text-md text-gray-600">
          Services currently registered in the system
        </p>
      </div>

      {services.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-lg font-bold text-gray-700 uppercase tracking-wider">
                  Cell No
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150 ease-in-out`}
                >
                  <td className="px-6 py-5 whitespace-nowrap text-md font-medium text-gray-900">
                    {service.servicename}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                    {service.name}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-md text-gray-700">
                    {service.cellno}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-6 py-16 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No services available</h3>
          <p className="mt-2 text-md text-gray-600">No services have been added to the system yet.</p>
        </div>
      )}
    </div>
  );
};

export default OwnerServices;