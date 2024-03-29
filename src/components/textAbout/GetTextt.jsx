import React, { useEffect, useState } from 'react'
import {  BASE_URL } from '../../services/utils'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const GetText = () => {
    const [texts, setTexts] = useState([])
    const nav = useNavigate()

    useEffect(()=>{
       getText()
    },[])

    const getText = () => {
        fetch(`${BASE_URL}/api/text`)
        .then(res => res.json())
        .then(result => setTexts(result))
        .catch(err => console.log(err))
    }


    const handleDelete =(id) => {
        fetch(`${BASE_URL}/api/text/deleteText/${id}`,{
            method: 'DELETE'
        }).then(res => res.json())
        .then()
    }


    const handleDeleteConfirm = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              handleDelete(id)
              getText()  
              Swal.fire({
                title: "Deleted!",
                text: "Your Text has been deleted.",
                icon: "success"
              });
            }
          });
    }


  return (
    <div className='d-flex gap-3 justify-content-center align-items-center flex-column'>
        <h2>About Text</h2>
        <button className='btn btn-primary' onClick={()=>{nav('/add-text')}}>Add Text</button>

        <div>
            {texts.map(text =>(
                <div className='shadow-lg container p-4 rounded-3'>
                    <p>
                        {text.text}
                    </p>

                    <div className='d-flex gap-3 justify-content-center align-items-center'>
                        <button className='btn btn-danger' onClick={()=>{handleDeleteConfirm(text._id)}}>Delete</button>
                        <button className='btn btn-success' onClick={()=>{nav(`/edit-text/${text._id}`)}}>Edit</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GetText