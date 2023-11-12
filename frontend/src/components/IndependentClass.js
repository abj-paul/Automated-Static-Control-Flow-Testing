import React from 'react'
import './IndependentClass.css'

const IndependentClass = () => {
  return (
    <div className="form-grid">
      <div className="single-box">
        <span>Cyclometric Complexity =</span>
        <input type="text" placeholder="3" />
      </div>
      <div className="triple-box">
        <input type="text" placeholder="Insert Path" />
      </div>
      <div className="triple-box">
        {/* Content for the second of the three boxes */}
        <input type="text" placeholder="Insert Input Data" />
      </div>
      <div className="triple-box">
        {/* Content for the third of the three boxes */}
        <input type="text" placeholder="Insert Expected Output" />
      </div>
    </div>
  )
}

export default IndependentClass