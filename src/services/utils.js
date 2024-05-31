export function convertToBase64(file){
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


  export const convertBaseImg = (img) => {
    return img.split("").slice(0, 33).join("");
  }

  export const convertSrcImg = (img) => {
    return img.split("").slice(33, img.length).join("");
  }


export const BASE_URL = 'https://server-seq.onrender.com' 
//export const BASE_URL = 'http://localhost:3001' 

/* export const BASE_URL = 'https://server-seq.onrender.com' 
export const BASE_URL_CAROUSEL = 'https://server-seq.onrender.com/api/carousel' 
export const BASE_URL_TEAM = 'https://server-seq.onrender.com/api/team' 
export const BASE_URL_TEXT = 'https://server-seq.onrender.com/api/text' */

//http://localhost:3001/api/projects
//https://brave-cow-headscarf.cyclic.app/api/projects