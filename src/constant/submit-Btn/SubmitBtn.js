import React from 'react'
import "./SubmitBtn.css"

const  SubmitBtn=({title,action})=> {
  return (
    <>
    <button onClick={action} className="success-btn">{title}</button>
    </>
  )
}

export default SubmitBtn
