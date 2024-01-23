import React, { useEffect, useState } from "react";
import ImagesPreview from "../project-details/ImagesPreview";
import UrlImages from "../project-manager/UrlImages";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL_CAROUSEL } from "../../services/utils";
import Swal from "sweetalert2";

const UpdateCarousel = () => {
  const { id } = useParams();
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urlImages, setUrlImages] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL_CAROUSEL}/findCarousel/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setUrlImages(result.url);
      });
  }, []);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("carouselImages", images[i]);
    }

    for (let i = 0; i < urlImages.length; i++) {
      formData.append("urlImages", urlImages[i]);
    }

    try {
      const response = await fetch(`${BASE_URL_CAROUSEL}/updateImages/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Project updated:", data.updatedcarousel);
        Swal.fire({
          title: "Good job!",
          text: "Project Successfully Added!",
          icon: "success",
        });
        setIsLoading(false);
        nav("/");
      } else {
        console.error("Failed to update project");
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Please contact the developer",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImages(files);

    const imagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e) => {
        imagePreviews.push(e.target.result);
        if (imagePreviews.length === files.length) {
          setPreviewImages(imagePreviews);
        }
      };

      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemovePreviewImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedFiles = [...images];
    updatedFiles.splice(index, 1);
    setImages(updatedFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = urlImages.filter((_, i) => i !== index);
    setUrlImages(updatedImages);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-5 justify-content-center align-items-center">
        <ImagesPreview
          handleFileChange={handleFileChange}
          previewImages={previewImages}
          handleRemovePreviewImage={handleRemovePreviewImage}
        />
        <UrlImages
          handleRemoveImage={handleRemoveImage}
          urlImages={urlImages}
        />

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Updating Carousel..." : "Update Carousel"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCarousel;
