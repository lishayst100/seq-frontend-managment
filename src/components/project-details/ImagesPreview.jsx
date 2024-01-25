import React from 'react'

const ImagesPreview = ({handleFileChange,previewImages,handleRemovePreviewImage}) => {
  return (
    <div>
          <input
        className='form-control'
        type="file"
        onChange={handleFileChange}
        multiple
      />

        <div>
          {previewImages.length > 0 && <h3>Preview Images</h3>}
            {previewImages.map((preview, index) => (
              <div key={index} className='d-flex flex-column gap-2 justify-content-center align-items-center'>
                  <input type="button" value="Remove" className='btn btn-danger' onClick={()=>{handleRemovePreviewImage(index)}}/>
                  <div style={{maxWidth: 400 ,height: 300}}>
              <img src={preview} alt={`Preview ${index}`} style={{  marginRight: '10px', maxWidth: '100%', objectFit: 'cover' }} />
              </div>
              </div>
             
            ))}
          
        </div>
    </div>
  )
}

export default ImagesPreview