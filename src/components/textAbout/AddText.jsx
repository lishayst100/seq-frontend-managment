import React, { useState } from 'react'
import { BASE_URL_TEXT } from '../../services/utils'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddText = () => {
  const nav = useNavigate()
  const [newText, setNewText] = useState('')
  const hanleAddText = () => {
    const text = {text: newText}
    fetch(`${BASE_URL_TEXT}/addText`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(text)
    }).then(res => res.json())
    .then(result => {
      Swal.fire({
        title: "Good job!",
        text: result.message,
        icon: "success",
      })
      nav('/text')
    }
     
      
      
     
      )
    .catch(err => console.log(err))
  }

  return (
    <div className='container mx-auto d-flex justify-content-center align-items-center flex-column gap-4'>
      
      <textarea name="" className='form-control w-75' onChange={(e)=> {setNewText(e.target.value)}} id="" cols="30" rows="10" placeholder='add your text here'></textarea>
      <button onClick={hanleAddText} className='btn btn-primary'>Add Text</button>
    </div>
  )
}

export default AddText