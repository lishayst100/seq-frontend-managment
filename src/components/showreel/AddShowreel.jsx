import React, { useState } from 'react'
import UploadVideo from '../project-manager/UploadVideo'
import { BASE_URL } from '../../services/utils'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Circles, ColorRing } from 'react-loader-spinner'

const AddShowreel = () => {
    const [video, setVideo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()



    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
    
        const formData = new FormData();
       
    
        if (video) {
          formData.append("video", video);
        }
       
    
        console.log(formData);
    
        try {
          const response = await fetch(`${BASE_URL}/api/showreel/addShowreel`, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Showreel created:", data.newShowreel);
            Swal.fire({
              title: "Good job!",
              text: data.message,
              icon: "success",
            });
            setIsLoading(false);
            nav("/");
            
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: 'Please contact the developer'
            });
            console.error("Failed to create project");
          }
        } catch (error) {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'Please contact the developer'
          });
          console.error("Error occurred:", error);
        }
      };



  return (
    <div className='w-75 mx-auto d-flex flex-column gap-4'>
        <div className='w-50'>

        </div>
        {isLoading ? <ColorRing/> : ''}
        <form action="" className='d-flex flex-column gap-4'>
        <UploadVideo setVideo={setVideo}/>
        <button disabled={video === '' ? true : false} className='btn btn-success' onClick={handleSubmit}>Upload Showreel</button>
        </form>
    </div>
  )
}

export default AddShowreel