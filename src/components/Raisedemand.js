import React, { useRef } from 'react'

function Raisedemand() {
  const paymentdate=useRef("")
  const year=useRef("")
  const amount=useRef("")
  const estatus=useRef("")

  const raiseddemand=()=>{
    
  }
  return (
    <div>
        <h1>Raisedemand</h1>
        <input ref={paymentdate} placeholder='Enter payment date'></input>
        <input ref={year} placeholder='Enter year'></input>
        <input ref={amount} placeholder='Enter raised maintainence demand'></input>
        <input ref={estatus} placeholder='Enter payment status'></input>
        <button onClick={raiseddemand}>Raise demand</button>
    </div>
  )
}

export default Raisedemand