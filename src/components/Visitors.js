import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Visitors() {
    const [visitors, setVisitors] = useState([])
    const vname = useRef("")
    const vcellno = useRef("")
    const flatno = useRef("")
    const vdate = useRef("")
    const vpurpose = useRef("")
    const intime = useRef("")
    const outtime = useRef("")
    useEffect(() => {
        axios.get("http://localhost:9000/api/getallvisitors")
            .then(response => {
                setVisitors(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [visitors])

    const addvisitor = () => {
        let vname1 = vname.current.value
        let vcellno1 = vcellno.current.value
        let flatno1 = flatno.current.value
        let vdate1 = vdate.current.value
        let vpurpose1 = vpurpose.current.value
        let intime1 = intime.current.value
        let outtime1 = outtime.current.value

        const payload = {
            vname: vname1,
            vcellno: vcellno1,
            flatno: flatno1,
            vdate: vdate1,
            vpurpose: vpurpose1,
            intime: intime1,
            outtime: outtime1
        }
        axios.post("http://localhost:9000/api/addvisitors", payload)
            .then(response => {
                alert("Visitor added successfullyy!!!")
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div
    style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        gap: '20px',
    }}
>
    {/* Visitors Table */}
    <div
        style={{
            flex: 2, // Takes two parts of the space
            backgroundColor: '#f4f7fc',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <h2
            style={{
                color: '#007BFF',
                textAlign: 'center',
                marginBottom: '20px',
            }}
        >
            Visitors
        </h2>
        <table
            style={{
                width: '100%',
                borderCollapse: 'collapse',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <thead>
                <tr
                    style={{
                        backgroundColor: '#007BFF',
                        color: 'white',
                        textAlign: 'left',
                    }}
                >
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Name</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Contact</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Flat No</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Purpose</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>In Time</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Out Time</th>
                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Date</th>
                </tr>
            </thead>
            <tbody>
                {visitors.map((v, index) => (
                    <tr
                        key={index}
                        style={{
                            backgroundColor: index % 2 === 0 ? '#fff' : '#f7f7f7',
                        }}
                    >
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.vname}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.vcellno}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.flatno}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.vpurpose}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.intime}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.outtime}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{v.vdate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Form */}
    <div
        style={{
            flex: 1, // Takes one part of the space
            backgroundColor: '#DFFFD6',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <h2 style={{ color: '#28A745', marginBottom: '20px', textAlign: 'center' }}>
            Fill the Visitors Form
        </h2>
        <input style={{ margin: '6px 0' }} ref={vname} className="form-control" type="text" placeholder="Enter visitor's name" />
        <input style={{ margin: '6px 0' }} ref={flatno} className="form-control" type="text" placeholder="Enter visiting flat number" />
        <input style={{ margin: '6px 0' }} ref={vcellno} className="form-control" type="text" placeholder="Enter visitor's cell number" />
        <label style={{ margin: '10px 0' }}>Enter visiting date</label>
        <input style={{ margin: '6px 0' }} ref={vdate} className="form-control" type="date" placeholder="Enter visiting date" />
        <input style={{ margin: '6px 0' }} ref={intime} className="form-control" type="text" placeholder="Enter in timing" />
        <input style={{ margin: '6px 0' }} ref={outtime} className="form-control" type="text" placeholder="Enter out timing" />
        <input style={{ margin: '6px 0' }} ref={vpurpose} className="form-control" type="text" placeholder="Enter visiting purpose" />
        <button
            className="btn btn-success m-1"
            onClick={addvisitor}
            style={{ marginTop: '10px' }}
        >
            Add Visitor Info
        </button>
    </div>
</div>

    )
}

export default Visitors