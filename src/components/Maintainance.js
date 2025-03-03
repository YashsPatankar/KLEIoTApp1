import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Maintainance({ oid, username, login }) {
  const [maintainance, setMaintainance] = useState([]);
  const [amount, setAmount] = useState(15000);
  const [currency, setCurrency] = useState('INR');
  const [receipt, setReceipt] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const payNow = async (M) => {
    try {
      const response = await axios.post('http://localhost:9000/api/create-order', {
        amount: parseFloat(M.amount),
        currency,
        receipt,
      });

      if (response.data.success) {
        setOrderId(response.data.orderId);
        launchRazorpay(response.data.orderId, response.data.amount);
      } else {
        setMessage('Failed to create order.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('An error occurred while creating the order.');
    }

    axios.post(`http://localhost:9000/api/getMaintainance`, { oid: oid, year: M.year, status: "Updated" })
      .then(response => {
        alert("Updated");
      })
      .catch(err => {
        console.log(err);
      });

    const payload1 = {
      amount: amount
    };
    const payload2 = {
      year: M.year,
      username: login
    };

    console.log(payload2);
    axios.post("http://localhost:9000/api/owner/updatepaymentstatus", payload2)
      .then(response => {
        alert("Status updated");
      })
      .catch(error => {
        console.log(error);
      });

    axios.post("http://localhost:9000/api/owner/addamount", payload1)
      .then(response => {
        alert("Amount added successfully");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const launchRazorpay = (orderId, amount) => {
    if (typeof window.Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      setMessage('Razorpay SDK not loaded.');
      return;
    }

    const options = {
      key: 'rzp_test_FRoCXFr2FkZqrx', // Replace with your Razorpay API Key
      amount: amount,
      currency: currency,
      name: 'jFork Technology Services',
      description: 'Training and Project Guidance Services',
      order_id: orderId,
      handler: async (response) => {
        try {
          const captureResponse = await axios.post('http://localhost:9000/api/capture-payment', {
            paymentId: response.razorpay_payment_id,
            amount: parseFloat(amount),
          });

          if (captureResponse.data.success) {
            setMessage('Payment captured successfully.');
          } else {
            setMessage('Payment captured successfully.');
          }
        } catch (error) {
          console.error('Error capturing payment:', error);
          setMessage('An error occurred while capturing the payment.');
        }
      },
      prefill: {
        name: 'Sunil Rodd',
        email: 'sfroddjforkts@gmail.com',
        contact: '9480275919',
      },
      theme: {
        color: '#2d89ef',
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/getMaintainance/${oid}`)
      .then((response) => {
        setMaintainance(response.data);
      })
      .catch((err) => {
        console.error('Error fetching maintenance data:', err);
      });
  }, [oid, maintainance]);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-yellow-400">Maintenance Payment Information</h1>

        {/* Maintenance Table */}
        {maintainance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700 text-sm rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-700 text-yellow-300">
                  <th className="border border-gray-600 p-3 text-left">Year</th>
                  <th className="border border-gray-600 p-3 text-left">Description</th>
                  <th className="border border-gray-600 p-3 text-left">Amount (₹)</th>
                  <th className="border border-gray-600 p-3 text-left">Due Date</th>
                  <th className="border border-gray-600 p-3 text-left">Payment Status</th>
                  <th className="border border-gray-600 p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {maintainance.map((M, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                    } hover:bg-gray-600 transition-colors duration-200`}
                  >
                    <td className="border border-gray-600 p-3">{M.year}</td>
                    <td className="border border-gray-600 p-3">{M.paymentdescription}</td>
                    <td className="border border-gray-600 p-3">₹{M.amount}</td>
                    <td className="border border-gray-600 p-3">{M.paymentdate}</td>
                    <td className="border border-gray-600 p-3">
                      {M.estatus === 'Pending' ? (
                        <span className="text-red-500 font-semibold">Pending</span>
                      ) : (
                        <span className="text-green-400 font-semibold">Paid</span>
                      )}
                    </td>
                    <td className="border border-gray-600 p-3">
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        onClick={() => payNow(M)}
                      >
                        Make Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {message && <div className="text-center mt-4 text-yellow-400">{message}</div>}
          </div>
        ) : (
          <p className="text-center text-gray-400">No maintenance records available</p>
        )}
      </div>
    </div>
  );
}

export default Maintainance;
