import React, { useState, useEffect } from 'react';

const UploadImage = ({ setImages, images, title }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
    // Reset image previews when new images are selected
    setImagePreviews([]);
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);

    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    setImagePreviews(updatedPreviews);
  };

  useEffect(() => {
    const previewImages = [];
    images.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImages.push(e.target.result);
        if (previewImages.length === images.length) {
          setImagePreviews(previewImages);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [images]);

  return (
    <div className='d-flex flex-column'>
      <div className='text-center label-title '>{title}</div>
      <input
        className='form-control'
        type="file"
        onChange={handleFileChange}
        multiple
      />
      {imagePreviews.map((preview, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
          <img
            src={preview}
            alt={`Preview ${index}`}
            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
          />
          <input type='button' onClick={() => removeImage(index)} value='Remove' className='btn btn-danger '/>
        </div>
      ))}
    </div>
  );
};

export default UploadImage;

