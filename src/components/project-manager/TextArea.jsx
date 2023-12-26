import React from 'react'

const TextArea = ({value,setState}) => {
  return (
    <div className='d-flex flex-column align-items-start'>
  <label>Credits:</label>
  <textarea
    
    rows={15}
    className='form-control'
    value={value}
    onChange={(e) => setState(e.target.value)}
    placeholder="Credits"
  ></textarea>
</div>
  )
}

export default TextArea