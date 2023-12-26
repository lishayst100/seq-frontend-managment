
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { useContext, useEffect } from 'react';
import ProjectDetails from './components/project-details/ProjectDetails';
import AddProject from './components/project-manager/AddProject';
import EditProject from './components/project-details/EditProject';
import { ProjectContext } from './context/ProjectContext';



function App() {
  const {getProjects} = useContext(ProjectContext)
  useEffect(()=>{
   getProjects()
  },[])
  
  return (
    <div className="App">
      <Routes>
        <Route path='/add-project' element={<AddProject/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/project/:id' element={<ProjectDetails/>}/>
        <Route path='/edit-project/:id' element={<EditProject/>}/>

      </Routes>
      {/* <ImageUpload/> */}
      
    </div>
  );
}

export default App;
