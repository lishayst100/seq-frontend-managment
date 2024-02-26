import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/utils';
import Swal from 'sweetalert2';
import { ColorRing } from 'react-loader-spinner';
import Input from '../project-manager/Input';
import TextArea from '../project-manager/TextArea';
import UrlImages from '../project-manager/UrlImages';
import ImagesPreview from '../project-details/ImagesPreview';


const EditTeam = () => {
  const {id} = useParams()
  const [images, setImages] = useState([]);
  const [urlImages , setUrlImages] = useState([])
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const nav = useNavigate();
  
const getTeam = () => {
  fetch(`${BASE_URL}/api/team/${id}`)
  .then(res => res.json())
  .then(result => {
    setTitle(result.title)
    setName(result.name)
    setUrlImages(result.img)
    setDesc(result.desc)
   
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
    getTeam()
    
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
    
    formData.append('title', title);
    formData.append('name', name);
    formData.append('desc', desc);
    

    try {
      const response = await fetch(`${BASE_URL}/api/team/updateTeam/${id}`, {
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
        nav("/team");
        
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
      <h2>Edit {name}</h2>
      <form
      onSubmit={handleSubmit}
        className="container mx-auto d-flex flex-column gap-3 w-75 shadow-lg p-4 rounded-4">
          <button type="submit" className="btn btn-primary mx-auto" disabled={!title || isLoading}>
          {isLoading ? "Updating your Project..." : "Update Project"}
        </button>
        {isLoading && <ColorRing width={'100%'}/>}
       
        <Input label={"Name"} setState={setName} value={name} />
        <Input label={"Title"} setState={setTitle} value={title} />
        <TextArea setState={setDesc} value={desc} label={'Descripation'} />
        <ImagesPreview handleFileChange={handleFileChange} previewImages={previewImages} handleRemovePreviewImage={handleRemovePreviewImage}/>
      </form>
        <UrlImages handleRemoveImage={handleRemoveImage} urlImages={urlImages}/>

      
    </div>
  );
};

export default EditTeam;
