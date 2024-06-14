import React, { useState } from 'react';

const UploadMultipleVideos = ({ setVideos }) => {
  const [videoObjects, setVideoObjects] = useState([]);

  const handleVideosChange = (event) => {
    const selectedVideos = Array.from(event.target.files);
    const newVideoObjects = selectedVideos.map((video) => ({
      file: video,
      url: URL.createObjectURL(video),
    }));
    setVideoObjects((prevVideos) => [...prevVideos, ...newVideoObjects]);
    setVideos((prevVideos) => [...prevVideos, ...selectedVideos]);
  };

  const removeVideo = (url) => {
    setVideoObjects((prevVideos) => prevVideos.filter((video) => video.url !== url));
    setVideos((prevVideos) => prevVideos.filter((video) => URL.createObjectURL(video) !== url));
  };

  return (
    <div>
      <label htmlFor="videosInput" className="form-label label-title">Upload More Videos</label>
      <input
        type="file"
        id="videosInput"
        accept="video/*"
        multiple
        onChange={handleVideosChange}
        className="form-control"
      />
      {videoObjects.length > 0 && (
        <div className="mt-2">
          <p>Video Previews:</p>
          {videoObjects.map((videoObject, index) => (
            <div key={index} className="mb-2">
              <video width="320" height="240" controls controlsList="nodownload">
                <source src={videoObject.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={() => removeVideo(videoObject.url)} className="btn btn-danger mt-1">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadMultipleVideos;
