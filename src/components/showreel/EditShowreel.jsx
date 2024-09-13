import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/utils'
import UploadVideo from '../project-manager/UploadVideo'
import Swal from 'sweetalert2'
import { ColorRing } from 'react-loader-spinner'

const EditShowreel = () => {
  const {id} = useParams()
  const [video, setVideo] = useState({})
  const [videoFile, setVideoFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const nav =useNavigate()

  useEffect(()=> {
    fetch(`${BASE_URL}/api/showreel/getShowreel/${id}`)
    .then(res => res.json())
    .then( result => setVideo(result))
    .then(console.log(video))
},[])

const handleSubmit = async (event) => {
  setIsLoading(true)
  event.preventDefault();

  const formData = new FormData();
  if (videoFile) {
    formData.append("video", videoFile);
  }
  
  try {
    const response = await fetch(`${BASE_URL}/api/showreel/updateShowreel/${id}`, {
      method: 'PUT',
      body: formData,
     
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Project updated:');
      Swal.fire({
        title: "Good job!",
        text: "Project Successfully Added!",
        icon: "success",
      });
      setIsLoading(false);
      nav("/");
      
    } else {
      console.error('Failed to update project');
      setIsLoading(false)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: 'Please contact the developer'
    });
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};


  return (
    <form>
      <video className='w-50' src={video.link}></video>
      <UploadVideo setVideo={setVideoFile}/>
      <button className='btn btn-primary' onClick={handleSubmit} disabled={videoFile === null ? true : false}>Update Showreel</button>
      {isLoading ? <ColorRing/> : ''}
      </form>
  )
}

export default EditShowreel