import React from 'react'

const UrlVideo = ({link,setLink}) => {
  return (
    <div className="mt-2">
    <p>Video Preview:</p>
    <video width="320" height="240" controls={true} controlsList="nodownload" src={link} >
      
    </video>
    <button onClick={()=>{setLink('')}} className='btn btn-danger'>Remove</button>
  </div>
  )
}

export default UrlVideo