import { createContext,useState } from "react";
import { BASE_URL } from "../services/utils";

const ProjectContext = createContext(null)


const ProjectContextProvider = ({children}) => {
    const [projects, setProjects] = useState([])
    
    const getProjects = () => {
        fetch(`${BASE_URL}/getProjects`)
        .then(res => res.json())
        .then(result => setProjects(result))
        .catch(e => console.log(e))
    }


    return (
        <ProjectContext.Provider value={{projects,setProjects,getProjects}}>
            {children}
        </ProjectContext.Provider>
    )
}


export default ProjectContextProvider
export { ProjectContext,ProjectContextProvider }