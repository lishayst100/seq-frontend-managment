import React, { useEffect, useState } from 'react'
import { BASE_URL} from '../../services/utils'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditText = () => {
  const {id}= useParams()  
  const nav = useNavigate()
  const [newText, setNewText] = useState('')

    useEffect(()=> {
        fetch(`${BASE_URL}/api/text/${id}`)
        .then(res => res.json())
        .then(result => setNewText(result.text))
        .catch( err => console.log(err))
    },[])


  const hanleAddText = () => {
    const text = {text: newText}
    fetch(`${BASE_URL}/api/text/updateText/${id}`, {
      method: 'PUT',
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
      
      <textarea name="" value={newText} className='form-control w-75' onChange={(e)=> {setNewText(e.target.value)}} id="" cols="30" rows="10" placeholder='add your text here'></textarea>
      <button onClick={hanleAddText} className='btn btn-primary'>Upadte Text</button>
    </div>
  )
}

export default EditText