import React, { useState } from 'react';

const UploadFrontImage = ({ setImage }) => {
  const [imageObjectUrl, setImageObjectUrl] = useState(''); // Track object URL

  const handleImageChange = (event) => {
    setImageObjectUrl('');
    const selectedImage = event.target.files[0];
    setImageObjectUrl(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  return (
    <div>
      <label htmlFor="imageInput" className="form-label label-title">Upload Master Image</label>
      <input
        type="file"
        id="imageInput"
        onChange={handleImageChange}
        className="form-control"
      />
      {imageObjectUrl !== '' && (
        <div className="mt-2">
          <p>Image Preview:</p>
          <img src={imageObjectUrl} alt="Preview" width="320" height="240" />
          <button onClick={() => { setImageObjectUrl('') }} className="btn btn-danger">Remove</button>
        </div>
      )}
    </div>
  );
};

export default UploadFrontImage;
