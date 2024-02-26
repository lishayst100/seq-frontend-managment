import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { ProjectContext } from "../../context/ProjectContext";
import {ColorRing} from 'react-loader-spinner'
import { BASE_URL } from "../../services/utils";
import Input from "../project-manager/Input";
import TextArea from "../project-manager/TextArea";
import UploadImage from "../project-manager/UploadImage";



const AddTeam = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  
  
 
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();


  




  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    
    formData.append("title", title);
    formData.append("name", name);
    formData.append("desc", desc);


    try {
      const response = await fetch(
        `${BASE_URL}/api/team/addTeam`,
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
        nav("/team");
       
        
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
    <div>
      <h2>New Team</h2>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto d-flex flex-column gap-3 w-75 shadow-lg p-4 rounded-4">
          <button type="submit" className="btn btn-primary mx-auto" disabled={!title || isLoading}>
          {isLoading ? "Adding your Project..." : "Add Project"}
        </button>
        {isLoading && <ColorRing width={'100%'}/>}
       
        <Input label={"Name"} setState={setName} value={name} />
        <Input label={"Title"} setState={setTitle} value={title} />
        
        <TextArea setState={setDesc} value={desc} label={'Descripation'} />
     
        <UploadImage setImages={setImages} images={images}/>
         
      </form>
    </div>
  );
};

export default AddTeam;
