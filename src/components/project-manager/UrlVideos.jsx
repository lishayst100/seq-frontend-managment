import React from 'react'

const UrlVideos = ({ urlVideos, handleRemoveVideo }) => {
  return (
    <div>
      <h4>Current Videos</h4>
      <div className='d-flex gap-4 flex-wrap justify-content-center align-items-center'>
        {urlVideos?.map((video, index) => (
          <div className='d-flex flex-column justify-content-center align-items-center' key={index}>
            <input type="button" value="Remove" className='btn btn-danger' onClick={() => { handleRemoveVideo(index) }} />
            <div style={{ maxWidth: 400, height: 300 }}>
              <video
                src={video}
                controls
                style={{ marginRight: '10px', maxWidth: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UrlVideos
