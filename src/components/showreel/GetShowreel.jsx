import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../services/utils'

const GetShowreel = () => {
    const nav = useNavigate()
    const [video, setVideo] = useState([])


    useEffect(()=> {
        fetch(`${BASE_URL}/api/showreel/getShowreel`)
        .then(res => res.json())
        .then( result => setVideo(result))
        .then(console.log(video))
    },[])

  return (
    <div className='d-flex gap-3 flex-column justify-content-center'>GetShowreel
        <div className='d-flex gap-3 justify-content-center'>
      {/*   <button disabled={video.length === 1 ? true : false} onClick={()=>{nav('/add-showreel')}} className='btn btn-primary'>Add Showreel</button> */}
        <button onClick={()=>{nav(`/edit-showreel/${video[0]._id}`)}} className='btn btn-success' >Edit Showreel</button>
        </div>
        
        <div className='w-75 mx-auto'>
            {video?.map(vidoe => (
                <video src={vidoe.link} controls className='w-50' ></video>
            ))}
        </div>
    </div>
  )
}

export default GetShowreel