import React, { useState } from 'react';

const UploadVideo = ({setVideo}) => {
 
  const [videoObjectUrl, setVideoObjectUrl] = useState(''); // Track object URL

  const handleVideoChange = (event) => {
    setVideoObjectUrl('')
    const selectedVideo = event.target.files[0];
    setVideoObjectUrl(URL.createObjectURL(selectedVideo));
    setVideo(selectedVideo);
  };

  return (
    <div>
      <label htmlFor="videoInput" className="form-label label-title">Upload Master Video</label>
      <input
        type="file"
        id="videoInput"
        accept="video/*"
        onChange={handleVideoChange}
        className="form-control"
      />
      {videoObjectUrl !== '' && (
        <div className="mt-2">
          <p>Video Preview:</p>
          <video width="320" height="240" controls={true} controlsList="nodownload" >
            <source src={videoObjectUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={()=>{setVideoObjectUrl('')}} className='btn btn-danger'>Remove</button>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
