import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/utils';
import Input from '../project-manager/Input';
import TextArea from '../project-manager/TextArea';
import UrlImages from '../project-manager/UrlImages';
import { ProjectContext } from '../../context/ProjectContext';
import Swal from 'sweetalert2';
import { ColorRing } from 'react-loader-spinner';
import ImagesPreview from './ImagesPreview';
import CheckBox from '../project-manager/CheckBox';
import CheckBoxEdit from '../project-manager/CheckBoxEdit';

const EditProject = () => {
  const {id} = useParams()
  const [images, setImages] = useState([]);
  const [urlImages , setUrlImages] = useState([])
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState('');
  const [link, setLink] = useState('');
  const [linkId, setLinkId] = useState('');
  const [frontImage, setFrontImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkGenres, setCheckGenres] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const {getProjects} = useContext(ProjectContext)
  const nav = useNavigate();
  
const getProject = () => {
  fetch(`${BASE_URL}/api/projects/getOneProject/${id}`)
  .then(res => res.json())
  .then(result => {
    setTitle(result.title)
    setCredits(result.credits)
    setUrlImages(result.images)
    setLink(result.link)
    setLinkId(result.linkId)
    setCheckGenres(result.genres)
    setFrontImage(result.frontImage ?? result.images[0]) 
  }).catch(err => console.log(err.message))
}


const handleRemoveImage = (index) => {
  
    const updatedImages = urlImages.filter((_, i) => i !== index);
    setUrlImages(updatedImages);
}


const handleRemovePreviewImage = (index) => {
  const updatedPreviews = [...previewImages];
  updatedPreviews.splice(index, 1);
  setPreviewImages(updatedPreviews);

  const updatedFiles = [...images];
  updatedFiles.splice(index, 1);
  setImages(updatedFiles);
};



  useEffect(()=>{
    getProject()
    
  },[])

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

  const handleSubmit = async (event) => {
    setIsLoading(true)
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    for (let i = 0; i < urlImages.length; i++) {
      formData.append('urlImages', urlImages[i]);
    }
    checkGenres.forEach((genre) => {
      formData.append("genres", genre);
    })
    formData.append('title', title);
    formData.append('credits', credits);
    formData.append('link', link);
    formData.append('linkId', linkId);
    formData.append('frontImage', frontImage);
    

    try {
      const response = await fetch(`${BASE_URL}/api/projects/myUpdateProject/${id}`, {
        method: 'PUT',
        body: formData,
       
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project updated:', data.updatedProject);
        Swal.fire({
          title: "Good job!",
          text: "Project Successfully Added!",
          icon: "success",
        });
        setIsLoading(false);
        nav("/");
        getProjects()
      } else {
        console.error('Failed to update project');
        setIsLoading(false)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: 'Please contact the developer'
      });
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  

  return (
    <div className='py-5'>
      <h2>Edit Project</h2>
      <form
      onSubmit={handleSubmit}
        className="container mx-auto d-flex flex-column gap-3 w-75 shadow-lg p-4 rounded-4">
          <button type="submit" className="btn btn-primary mx-auto" disabled={!title || isLoading}>
          {isLoading ? "Updating your Project..." : "Update Project"}
        </button>
        {isLoading && <ColorRing width={'100%'}/>}
        <Input label={"Title"} setState={setTitle} value={title} />
        <Input label={"Link"} setState={setLink} value={link} />
        <Input label={"Link ID"} setState={setLinkId} value={linkId} />
        <TextArea setState={setCredits} value={credits} label={'Credits'}/>
        <CheckBoxEdit checkGenres={checkGenres} setCheckGenres={setCheckGenres}/>
        <ImagesPreview handleFileChange={handleFileChange} previewImages={previewImages} handleRemovePreviewImage={handleRemovePreviewImage}/>
      </form>
      <div>
          <h3>Front Image</h3>
          <img src={frontImage} alt="..." style={{maxWidth: 400 ,height: 300}} />
        </div>

        <UrlImages handleRemoveImage={handleRemoveImage} urlImages={urlImages} setFrontImage={setFrontImage}/>

        
    </div>
  );
};

export default EditProject;
