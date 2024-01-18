import React, { useEffect, useState } from "react";
import { BASE_URL_CAROUSEL } from "../../services/utils";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const GetCarousel = () => {
  const [carousel, setCarousel] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL_CAROUSEL}/`)
      .then((res) => res.json())
      .then((result) => setCarousel(result));
  }, []);

  return (
    <div className="d-flex flex-column gap-5 justify-content-center ">
      <h2>Carousel Images</h2>
      <Carousel fade>
      {carousel.map((images) => (

      
        
        images.url.map((image) => (
            <Carousel.Item key={image}>
            <img src={image} alt='...' style={{height: 600, width: '100%',objectFit:'cover'}}/>
            </Carousel.Item>
        ))
       
        )
      )}
      </Carousel>
            <div className="d-flex justify-content-center align-items-center gap-4">

           
      <button
        onClick={() => {
          nav("/add-carousel-image");
        }}
        className="btn-success btn"
        disabled={carousel.length > 0}
      >
        Add New Carousel
      </button>
      <button
        onClick={() => {
          nav(`/edit-carousel/${carousel[0]._id}`);
        }}
        className="btn-primary btn"
        disabled={carousel.length <= 0}
      >
        Edit Carousel Images
      </button>
      </div>
    </div>
  );
};

export default GetCarousel;


