import React from 'react'

const UrlImages = ({urlImages,handleRemoveImage}) => {
  return (
    <div >
        <h4>Current Images</h4>
        <div className='d-flex gap-4 flex-wrap justify-content-center align-items-center'>

       
        {urlImages.map((image,index)=> (
          <div className='d-flex flex-column justify-content-center align-items-center' key={index}>
              <input type="button" value="Remove" className='btn btn-danger' onClick={()=>{handleRemoveImage(index)}} />
              <img src={image} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
          </div>
          
        ))}
         </div>
      </div>
  )
}

export default UrlImages