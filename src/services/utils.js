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


//export const BASE_URL = 'https://server-seq.onrender.com/api/projects' 
/* export const BASE_URL = 'http://localhost:3001/api/projects' 
export const BASE_URL_CAROUSEL = 'http://localhost:3001/api/carousel' 
export const BASE_URL_TEAM = 'http://localhost:3001/api/team'  */
export const BASE_URL = 'https://server-seq.onrender.com/api/projects' 
export const BASE_URL_CAROUSEL = 'https://server-seq.onrender.com/api/carousel' 
export const BASE_URL_TEAM = 'https://server-seq.onrender.com/api/team' 

//http://localhost:3001/api/projects
//https://brave-cow-headscarf.cyclic.app/api/projects