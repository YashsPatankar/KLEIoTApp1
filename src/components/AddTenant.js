import React, { useRef } from 'react';
import axios from 'axios';

function AddTenant() {
    const tname = useRef("");
    const taadhar = useRef("");
    const taddress = useRef("");
    const tcell = useRef("");
    const tod = useRef("");
    const tld = useRef("");

    const addtenant = () => {
        let tname1 = tname.current.value;
        let taadhar1 = taadhar.current.value;
        let taddress1 = taddress.current.value;
        let tcell1 = tcell.current.value;
        let tod1 = tod.current.value;
        let tld1 = tld.current.value;

        const payload = {
            tname: tname1,
            taadhar: taadhar1,
            taddress: taddress1,
            tcell: tcell1,
            tod: tod1,
            tld: tld1,
            tstatus:"occupied"
        };
        
        axios.post("http://localhost:9000/api/owner/addtenant", payload)
            .then(response => {
                alert("Tenant added successfully");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-blue-50">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Tenant</h3>
                    <p className="mt-1 text-sm text-gray-600">
                        Please fill in all the required tenant information
                    </p>
                </div>

                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="tname" className="block text-sm font-medium text-gray-700">
                                Tenant Name
                            </label>
                            <input
                                type="text"
                                id="tname"
                                ref={tname}
                                placeholder="Enter tenant name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="taadhar" className="block text-sm font-medium text-gray-700">
                                Aadhar Number
                            </label>
                            <input
                                type="text"
                                id="taadhar"
                                ref={taadhar}
                                placeholder="Enter tenant Aadhar number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="taddress" className="block text-sm font-medium text-gray-700">
                                Previous Address
                            </label>
                            <input
                                type="text"
                                id="taddress"
                                ref={taddress}
                                placeholder="Enter previous address"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="tcell" className="block text-sm font-medium text-gray-700">
                                Cell Number
                            </label>
                            <input
                                type="text"
                                id="tcell"
                                ref={tcell}
                                placeholder="Enter tenant cell number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tod" className="block text-sm font-medium text-gray-700">
                                    Occupation Date
                                </label>
                                <input
                                    type="date"
                                    id="tod"
                                    ref={tod}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="tld" className="block text-sm font-medium text-gray-700">
                                    Leaving Date
                                </label>
                                <input
                                    type="date"
                                    id="tld"
                                    ref={tld}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end">
                    <button
                        onClick={addtenant}
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Tenant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTenant;