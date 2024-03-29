import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./Input";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import { ProjectContext } from "../../context/ProjectContext";
import {ColorRing} from 'react-loader-spinner'
import { BASE_URL } from "../../services/utils";
import CheckBox from "./CheckBox";


const AddProject = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [credits, setCredits] = useState("");
  /* const [linkId, setLinkId] = useState(""); */
  const [checkGenres, setCheckGenres] = useState([]);
  const {getProjects,projects} = useContext(ProjectContext)
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();


  


  useEffect(()=>{
    console.log(checkGenres)
  },[checkGenres])

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    checkGenres.forEach((genre) => {
      formData.append("genres", genre);
    })
    formData.append("title", title);
    formData.append("link", link);
    formData.append("credits", credits);
    formData.append("linkId", projects.length.toString());

    try {
      const response = await fetch(
        `${BASE_URL}/api/projects/addProject`,
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
        getProjects()
        
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
      <h2>New Project</h2>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto d-flex flex-column gap-3 w-75 shadow-lg p-4 rounded-4">
          <button type="submit" className="btn btn-primary mx-auto" disabled={!title || isLoading}>
          {isLoading ? "Adding your Project..." : "Add Project"}
        </button>
        {isLoading && <ColorRing width={'100%'}/>}
        <Input label={"Title"} setState={setTitle} value={title} />
        <Input label={"Link"} setState={setLink} value={link} />
       {/*  <Input label={"Link ID"} setState={setLinkId} value={linkId} /> */}
        <TextArea setState={setCredits} value={credits} label={'Credits'} />
        <CheckBox checkGenres={checkGenres} setCheckGenres={setCheckGenres}/>
        <UploadImage setImages={setImages} images={images}/>
        
      </form>
    </div>
  );
};

export default AddProject;
