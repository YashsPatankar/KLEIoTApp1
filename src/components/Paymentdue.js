import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Paymentdue() {
  const [paymentdues, setPaymentdues] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/api/secretary/paymentdues")
      .then(response => {
        setPaymentdues(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  const recievepayment = () => {

  }
  return (
    <div>
      {(paymentdues && paymentdues.length > 0) ? (paymentdues.map((owner, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Maintenance of :- {owner.ofname} {owner.olname}
          </h3>
          <div className="flex flex-wrap gap-6">
            {owner.maintainence && owner.maintainence.length > 0 ? (
              owner.maintainence.map((m, idx) => (
                <div
                  key={idx}
                  className="w-full p-4 border rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg hover:scale-105 transition-transform"
                >
                  <h4 className="text-lg font-bold text-blue-600 mb-3">
                    Payment #{idx + 1}
                  </h4>
                  <div className="flex flex-wrap justify-between items-start text-center">
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">
                        Payment Date
                      </span>
                      <span className="text-gray-800">{m.paymentdate}</span>
                    </div>
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">Amount</span>
                      <span className="text-gray-800">{m.amount}</span>
                    </div>
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">Year</span>
                      <span className="text-gray-800">{m.year}</span>
                    </div>
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">
                        Mode of Payment
                      </span>
                      <span className="text-gray-800">{m.modeofpayment}</span>
                    </div>
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">Status</span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${m.estatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {m.estatus}
                      </span>
                    </div>
                    <div className="flex flex-col w-1/7">
                      <span className="font-medium text-gray-700">
                        Description
                      </span>
                      <span className="text-gray-800">{m.paymentdescription}</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Payment Status
                      </span>
                      <button
                        onClick={recievepayment}
                        className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Receive Payment
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : ""}
          </div>
        </div>
      ))
      ) : (
        <p className="text-gray-500 text-center">No owner data available.</p>
      )}
    </div>
  )
}

export default Paymentdue