import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectUpdate = () => {
    const { id} = useParams()
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [linkId, setLinkId] = useState('');
  const [link, setLink] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.put(`http://localhost:3001/api/projects/${id}`, {
        title,
        credits,
        linkId,
        link,
      });

      if (images.length > 0) {
        await axios.put(`http://localhost:3001/api/projects/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('Updated project:', response.data.updatedProject);
      // Handle success or update UI as needed
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={credits} onChange={(e) => setCredits(e.target.value)} placeholder="Credits" />
      <input type="text" value={linkId} onChange={(e) => setLinkId(e.target.value)} placeholder="Link ID" />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <input type="file" onChange={handleImageUpload} multiple />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Project'}
      </button>
    </form>
  );
};

export default ProjectUpdate;
