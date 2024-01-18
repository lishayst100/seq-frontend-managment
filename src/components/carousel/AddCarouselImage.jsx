import React, { useState } from 'react'
import UploadImage from '../project-manager/UploadImage'
import {  BASE_URL_CAROUSEL } from '../../services/utils';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const AddCarouselImage = () => {
    const [images ,setImages] = useState([])
    const [isLoading ,setIsLoading] = useState(false)
    const nav = useNavigate()

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
    
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("carouselImages", image);
        });
    
        try {
          const response = await fetch(
            `${BASE_URL_CAROUSEL}/addCarouselImage`,
            {
              method: "POST",
              body: formData,
              
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log("Images uploaded:", data.newProject);
            Swal.fire({
              title: "Good job!",
              text: data.message,
              icon: "success",
            });
            setIsLoading(false);
            nav("/");
            
            
          } else {
            setIsLoading(false)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: 'Please contact the developer'
            });
            console.error("Failed to upload images");
          }
        } catch (error) {
          setIsLoading(false)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'Please contact the developer'
          });
          console.error("Error occurred:", error);
        }
      };

    

  return (
    <form onSubmit={handleSubmit}>
        <UploadImage images={images} setImages={setImages}/>
        <button type='submit'>Create Carousel</button>
        {isLoading && <ColorRing/>}

    </form>
  )
}

export default AddCarouselImage