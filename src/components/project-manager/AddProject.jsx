import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./Input";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import UploadVideo from "./UploadVideo";
import UploadMultipleVideos from "./UploadMultipleVideos";
import { ProjectContext } from "../../context/ProjectContext";
import { ColorRing } from 'react-loader-spinner';
import { BASE_URL } from "../../services/utils";
import CheckBox from "./CheckBox";
import UploadFrontImage from "./UploadFrontImage";
import './../home/Home.scss';
import Loop from "./Loop";

const AddProject = () => {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [supplementaryVideos, setSupplementaryVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [credits, setCredits] = useState("");
  const [checkGenres, setCheckGenres] = useState([]);
  const [frontImage, setFrontImage] = useState([]);
  const [frontImages, setFrontImages] = useState([]);
  const [isLooping, setIsLooping] = useState(false); // State for looping
  const { getProjects, projects } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    if (frontImages) {
      frontImages.forEach((image) => {
        formData.append("frontImages", image);
      });
    }

    if (video) {
      formData.append("video", video);
    }
    supplementaryVideos.forEach((supplementaryVideo) => {
      formData.append("supplementaryVideos", supplementaryVideo);
    });
    checkGenres.forEach((genre) => {
      formData.append("genres", genre);
    });
    formData.append("frontImage", frontImage);
    formData.append("title", title);
    formData.append("credits", credits);
    formData.append("linkId", projects.length.toString());
    formData.append("isLooping", isLooping); // Append looping value to form data

    console.log(formData);

    try {
      const response = await fetch(`${BASE_URL}/api/projects/addProject`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Project created:", data.newProject);
        Swal.fire({
          title: "Good job!",
          text: data.message,
          icon: "success",
        });
        setIsLoading(false);
        nav("/");
        getProjects();
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: 'Please contact the developer'
        });
        console.error("Failed to create project");
      }
    } catch (error) {
      setIsLoading(false);
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
        className="container mx-auto d-flex flex-column gap-3 w-75 shadow-lg p-4 rounded-4"
      >
        <button type="submit" className="btn btn-primary mx-auto" disabled={!title || isLoading}>
          {isLoading ? "Adding your Project..." : "Add Project"}
        </button>
        {isLoading && <ColorRing width={"100%"} />}
        <Input label={"Title"} setState={setTitle} value={title} />
        <TextArea setState={setCredits} value={credits} label={"Credits"} />
        <CheckBox checkGenres={checkGenres} setCheckGenres={setCheckGenres} />
        <UploadFrontImage setImage={setFrontImage} />
        <UploadImage setImages={setImages} images={images} />
        <UploadVideo setVideo={setVideo} label="Main Video" />
        <UploadMultipleVideos setVideos={setSupplementaryVideos} />
        {supplementaryVideos.length > 0 && (
          <UploadImage setImages={setFrontImages} images={frontImages} />
        )}
        <Loop isLooping={isLooping} setIsLooping={setIsLooping}/>
      </form>
    </div>
  );
};

export default AddProject;
