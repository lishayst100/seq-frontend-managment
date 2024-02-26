import React, { useContext } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import { BASE_URL } from '../../services/utils';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectContext';
const DeleteBtn = ({id,setTeam}) => {
  
    const nav = useNavigate()
    const handleDelete = async() => {
      try {
        const response = await fetch(`${BASE_URL}/api/team/deleteTeam/${id}`,{
          method:'DELETE'
      })
      const data = await response.json()
      } catch (error) {
        console.log(error)
      }
        
    }


    const getTeam = () => {
        fetch(`${BASE_URL}/api/team`)
        .then(res=> res.json())
        .then(result => setTeam(result))
    }


    const handleDeleteConfirm = () => {
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
              handleDelete()
              getTeam()  
              Swal.fire({
                title: "Deleted!",
                text: "Your Team Member has been deleted.",
                icon: "success"
              });
            }
          });
    }

    


  return (
    <button className='btn btn-danger d-flex gap-2 justify-content-center align-items-center' onClick={handleDeleteConfirm}>
        <span>Delete</span>
        <FaTrashAlt/>
    </button>
  )
}

export default DeleteBtn