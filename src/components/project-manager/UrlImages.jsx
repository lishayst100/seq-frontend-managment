import React from 'react'

const UrlImages = ({urlImages,handleRemoveImage, setFrontImage}) => {
  return (
    <div >
        <h4>Current Images</h4>
        <div className='d-flex gap-4 flex-wrap justify-content-center align-items-center'>

       
        {urlImages.map((image,index)=> (
          <div className='d-flex flex-column justify-content-center align-items-center' key={index}>
              <input type="button" value="Remove" className='btn btn-danger' onClick={()=>{handleRemoveImage(index)}} />
              <div style={{maxWidth: 400 ,height: 300}}>
              <img src={image} alt={`Preview ${index}`} onClick={(e)=> {setFrontImage(e.target.src)}} style={{  marginRight: '10px', maxWidth: '100%', objectFit: 'cover' }} />
              </div>
              
          </div>
          
        ))}
         </div>
      </div>
  )
}

export default UrlImages