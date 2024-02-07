import React, { useEffect, useState } from 'react'
import {  BASE_URL_TEXT } from '../../services/utils'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const GetText = () => {
    const [texts, setTexts] = useState([])
    const nav = useNavigate()

    useEffect(()=>{
       getText()
    },[])

    const getText = () => {
        fetch(`${BASE_URL_TEXT}`)
        .then(res => res.json())
        .then(result => setTexts(result))
        .catch(err => console.log(err))
    }


    const handleDelete =(id) => {
        fetch(`${BASE_URL_TEXT}/deleteText/${id}`,{
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
    <div>
        <h2>About Text</h2>

        <div>
            {texts.map(text =>(
                <div>
                    <p>
                        {text}
                    </p>

                    <div>
                        <button className='btn btn-danger' onClick={()=>{handleDeleteConfirm(text._id)}}>Delete</button>
                        <button className='btn btn-primary' onClick={()=>{nav(`/editText/${text._id}`)}}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GetText