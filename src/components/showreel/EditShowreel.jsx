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
  const [videoText, setVideoText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const nav =useNavigate()

  useEffect(()=> {
    fetch(`${BASE_URL}/api/showreel/getShowreel/${id}`)
    .then(res => res.json())
    .then( result => setVideo(result))
    .then(console.log(video))
},[])

const handleSubmit = async (event) => {
  setIsLoading(true);
  event.preventDefault();

  try {
    const response = await fetch(`${BASE_URL}/api/showreel/updateShowreel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',  // Set the content type to JSON
      },
      body: JSON.stringify({ showreelText: videoText }),  // Properly stringify the body
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Project updated:', data);
      Swal.fire({
        title: "Good job!",
        text: "Project Successfully Updated!",
        icon: "success",
      });
      setIsLoading(false);
      nav("/");
    } else {
      console.error('Failed to update project');
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Please contact the developer',
      });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    setIsLoading(false);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "An unexpected error occurred!",
    });
  }
};



  return (
    <div>
      <h4>הוראות איך להעלות את הסרטון</h4>
      <ol>
        <li>click on this <a href="https://imagekit.io/" target="_blank" rel="noopener noreferrer">Link to Imagekit</a></li>
        <li>login with google to this mail ,seqweb100@gmail.com</li>
        <li>username: seqweb100@gmail.com  <br />password: Dvir1234</li>
        <li>upload the showreel, make sure that is less than 100mb</li>
       
        <li>Copy the Url Link and paste it in the input text</li>
      </ol>
   
    <form>
      <video className='w-50' src={video.link} controls></video>
     
      <input type="text" value={videoText} className='form-control w-75' onChange={(e)=> {setVideoText(e.target.value)}} />
      <button className='btn btn-primary' onClick={handleSubmit} disabled={videoText === '' ? true : false}>Update Showreel</button>
     
      {isLoading ? <ColorRing/> : ''}
      </form>

      </div>
  )
}

export default EditShowreel