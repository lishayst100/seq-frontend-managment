import React from 'react'

const TextArea = ({value,setState,label}) => {
  return (
    <div className='d-flex flex-column align-items-start'>
  <label>{label}:</label>
  <textarea
    
    rows={15}
    className='form-control'
    value={value}
    onChange={(e) => setState(e.target.value)}
    placeholder={label}
  ></textarea>
</div>
  )
}

export default TextArea