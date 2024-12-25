import React, { useRef } from "react";
import axios from "axios";

function AddFlatDetails() {
  const Oid = useRef("");
  const FlatNumber = useRef("");
  const FlatOwner = useRef("");
  const FlatSize = useRef("");
  const FlatFloor = useRef("");

  const addFlatDetails = () => {
    const payload = {
      FlatNumber: FlatNumber.current.value,
      FlatOwner: FlatOwner.current.value,
      Oid: Oid.current.value,
      FlatSize: FlatSize.current.value,
    };

    axios.post("http://localhost:9000/api/admin/insertFlatDetails", payload)
      .then((response) => {
        alert("Flat details have been successfully inserted!");
        // Clear input fields after submission
        FlatNumber.current.value = "";
        FlatOwner.current.value = "";
        Oid.current.value = "";
        FlatSize.current.value = "";
      })
      .catch((err) => {
        console.error("Error inserting flat details:", err);
        alert("Failed to insert flat details. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-blue-600 to-white">
      <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-2xl w-full m-4">
        <h2 className="text-black text-2xl font-extrabold mb-6 text-center tracking-wide">Add Flat Details</h2>
        <div className="space-y-6">
          {/* Flat Number Input */}
          <div className="relative">
            <input
              type="text"
              ref={FlatNumber}
              className="w-full px-5 py-3 text-gray-800 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Flat Number"
              name="flatNumber"
            />
          </div>

          {/* Owner Name Input */}
          <div className="relative">
            <input
              type="text"
              ref={FlatOwner}
              className="w-full px-5 py-3 text-gray-800 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Owner Name"
              name="ownerName"
            />
          </div>

          {/* Owner ID Input */}
          <div className="relative">
            <input
              type="text"
              ref={Oid}
              className="w-full px-5 py-3 text-gray-800 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Owner ID"
              name="ownerId"
            />
          </div>

          {/* Flat Size Input */}
          <div className="relative">
            <input
              type="text"
              ref={FlatSize}
              className="w-full px-5 py-3 text-gray-800 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Flat Size (sq ft)"
              name="size"
            />
          </div>

          {/* Flat Floor Input */}
          <div className="relative">
            <input
              type="text"
              ref={FlatFloor}
              className="w-full px-5 py-3 text-gray-800 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Flat Floor"
              name="floor"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="w-full px-5 py-3 font-bold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
              onClick={addFlatDetails}
            >
              Add Flat
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default AddFlatDetails;
