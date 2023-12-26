import { useEffect, useState } from 'react'
import axios from 'axios';

const url = "http://localhost:3001/uploads"
const urlText = "http://localhost:3001/text"
const getUrl = 'http://localhost:3001/getText'

function Upload() {
  
  const [postImage, setPostImage] = useState( { myFile : ""})
  const [Images, setImages] = useState([])
  const [imagesList,setImagesList] = useState([])
  const [text, setText] = useState('')
  const [textList, setTextList] = useState([])

  const createPost = async (newImage) => {
    try{
      await axios.post(url, newImage)
    }catch(error){
      console.log(error)
    }
  }

  const createText = async() => {
    try{
        await axios.post(urlText,{text})
    }catch(e){
        console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setPostImage({ ...postImage, myFile : base64 })
  
  }

  const check = () => {
    console.log(imagesList)
  }

  useEffect(()=> {
    fetch(getUrl)
    .then(res => res.json())
    .then(result => setTextList(result))
    .catch(e => console.log(e))
  },[])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        {/* <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.myFile} alt="" />
        </label> */}

        <input 
          type="file"
          lable="Image"
          name="myFile"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />

         <h3>Doris Wilder</h3>
         <span>Designer</span>

         <button type='submit'>Submit</button>
         <button onClick={check}>Check</button>
      </form>


      <div>
        {Images.map(image => (
            <img src={image.myFile} alt='...' key={image._id} width={100} height={100}/>
        ))}

        <textarea name="" id="" cols="30" rows="10" value={text} onChange={(e)=> setText(e.target.value)}></textarea>
        <button onClick={createText}>Send To Db</button>
        {
            textList.map((t)=> (
                <pre key={t._id}>{t.text}</pre>
            ))
        }
      </div>
    </div>
  )
}

export default Upload


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}