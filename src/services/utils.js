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


export const BASE_URL = 'https://brave-cow-headscarf.cyclic.app/api/projects' 

//http://localhost:3001/api/projects
//https://brave-cow-headscarf.cyclic.app/api/projects