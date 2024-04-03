import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/utils'
import ReactVimeoOembed from 'react-vimeo-oembed';
import Credits from './Credits';


const ProjectDetails = () => {
    const {id} = useParams()
    const [project,setProject] = useState({})
    const [loading,setLoading] = useState(true)
    const {title,credits,images,link} = project
    const vimeoId = parseInt(project.linkId)

     useEffect(()=>{
        fetch(`${BASE_URL}/api/projects/getOneProject/${id}`)
        .then(res =>res.json())
        .then(result => {
             setProject(result)
             setLoading(false)})
     },[id])

  return (
    <div> 
        <div>
          <h2>{title}</h2>
          <Credits credits={credits}/>
          <ReactVimeoOembed videoId={vimeoId}/>
          <div>
            {images?.map(img => (
              <img src={img} alt="..." key={img} width={250} height={250} />
            ))}
          </div>

          <video src={link} controls></video>
        </div>
        {loading && <p>Loading...</p>}
    </div>
  )
}

export default ProjectDetails