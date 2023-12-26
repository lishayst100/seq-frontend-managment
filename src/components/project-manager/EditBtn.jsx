import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const EditBtn = ({id}) => {
  const nav = useNavigate()
  return (
    <button className='btn btn-success d-flex gap-2 justify-content-center align-items-center' onClick={()=>{nav(`/edit-project/${id}`)}}>
        <span>Edit</span>
        <FaRegEdit/>
        </button>
  )
}

export default EditBtn