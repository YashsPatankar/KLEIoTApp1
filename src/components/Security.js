import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Visitors({ setLoginStatus }) {
    const [visitors, setVisitors] = useState([]);
    const vname = useRef("");
    const vcellno = useRef("");
    const flatno = useRef("");
    const vdate = useRef("");
    const vpurpose = useRef("");
    const intime = useRef("");
    const outtime = useRef("");

    useEffect(() => {
        axios.get("http://localhost:9000/api/getallvisitors")
            .then(response => {
                setVisitors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [visitors]);

    const logout = () => {
        setLoginStatus(false)
    }

    const addvisitor = () => {
        let vname1 = vname.current.value;
        let vcellno1 = vcellno.current.value;
        let flatno1 = flatno.current.value;
        let vdate1 = vdate.current.value;
        let vpurpose1 = vpurpose.current.value;
        let intime1 = intime.current.value;
        let outtime1 = outtime.current.value;

        const payload = {
            vname: vname1,
            vcellno: vcellno1,
            flatno: flatno1,
            vdate: vdate1,
            vpurpose: vpurpose1,
            intime: intime1,
            outtime: outtime1
        };

        axios.post("http://localhost:9000/api/addvisitors", payload)
            .then(response => {
                alert("Visitor added successfully!");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="relative flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-400 text-white p-6">
    {/* Heading */}
    <h1 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-blue-900">
        Security Dashboard
    </h1>

    {/* Logout Button */}
    <button 
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md" 
        onClick={logout}
    >
        Logout
    </button>

    <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mt-20 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Visitors Information Section */}
        <div className="flex-[5] bg-gradient-to-t from-blue-400 via-blue-400 to-blue-200 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
                Visitors Information
            </h2>
            <table className="w-full border-collapse shadow-lg">
                <thead>
                    <tr className="bg-blue-700 text-white">
                        <th className="p-3 font-semibold">Name</th>
                        <th className="p-3 font-semibold">Contact</th>
                        <th className="p-3 font-semibold">Flat No</th>
                        <th className="p-3 font-semibold">Purpose</th>
                        <th className="p-3 font-semibold">In Time</th>
                        <th className="p-3 font-semibold">Out Time</th>
                        <th className="p-3 font-semibold">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((v, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                            <td className="p-1 border-b text-gray-800">{v.vname}</td>
                            <td className="p-3 border-b text-gray-800">{v.vcellno}</td>
                            <td className="p-3 border-b text-gray-800">{v.flatno}</td>
                            <td className="p-1 border-b text-gray-800">{v.vpurpose}</td>
                            <td className="p-3 border-b text-gray-800">{v.intime}</td>
                            <td className="p-3 border-b text-gray-800">{v.outtime}</td>
                            <td className="p-3 border-b text-gray-800">{v.vdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Visitor's Form Section */}
        <div className="flex-[2] bg-gradient-to-t from-blue-400 to-blue-200 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
                Fill the Visitor's Form
            </h2>
            <input ref={vname} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter visitor's name" />
            <input ref={flatno} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter visiting flat number" />
            <input ref={vcellno} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter visitor's cell number" />
            <label className="text-xl font-semibold mb-2 text-gray-700">Enter visiting date</label>
            <input ref={vdate} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="date" />
            <input ref={intime} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter in timing" />
            <input ref={outtime} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter out timing" />
            <input ref={vpurpose} className="form-control mb-4 p-3 rounded-lg bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter visiting purpose" />
            <button className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-md" onClick={addvisitor}>
                Add Visitor Info
            </button>
        </div>
    </div>
</div>


    );
}

export default Visitors;
