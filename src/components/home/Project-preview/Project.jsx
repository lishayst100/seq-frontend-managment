import React, { useState } from "react";
import './Project.scss'
import { useNavigate } from "react-router-dom";
import { convertBaseImg, convertSrcImg } from "../../../services/utils";



const Project = ({ title, img, index, _id, item }) => {
  const nav = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const base_img = convertBaseImg(img)
  const src_img = convertSrcImg(img)

  return (
    <div
      className={item}
      onClick={() => {
        nav(`/project/${_id}`);
      }}
    >
      <div className="image-container">
        {!imageLoaded && (
          <div
            className="blur-placeholder"
            style={{
              background:`${base_img}tr:w-800,f-auto/${src_img}`
            }}
          />
        )}
        <img
          src={`${base_img}tr:w-800,f-auto/${src_img}`}
          srcSet={`${base_img}tr:w-400,f-auto/${src_img} 400w ,${base_img}tr:w-800,f-auto/${src_img} 800w, ${base_img}tr:w-1200,f-auto/${src_img} 1200w`}
          alt={title}
          onError={({currentTarget})=>{
            currentTarget.src = `${base_img}tr:w-800,f-png/${src_img}`
            currentTarget.onerror = null
          }}
          loading="lazy"
          className={`image-project ${imageLoaded ? "loaded" : ""}`}
          onLoad={handleImageLoad}
        />
        
        <div className="color-overlay"></div>
        <div className="project-title">{title}</div>
      </div>
    </div>
  );
};

export default Project;





/* initial={{ filter: "blur(15px)",  }}
          whileInView={{
            transition: { duration: 0.6 },
            filter: "blur(0)",
           

          }}
          viewport={{margin: '-20% 0px -20% 0px'}} */