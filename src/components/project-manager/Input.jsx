import React from 'react'

const Input = ({value,label,setState}) => {
  return (
    <div className='d-flex flex-column align-items-start'>
  <label>{label}</label>
  <input
    className='form-control'
    type="text"
    value={value}
    onChange={(e) => setState(e.target.value)}
    placeholder={label}
    required
  />
</div>
  )
}

export default Input