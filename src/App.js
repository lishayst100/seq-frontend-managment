
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import { useContext, useEffect } from 'react';
import ProjectDetails from './components/project-details/ProjectDetails';
import AddProject from './components/project-manager/AddProject';
import EditProject from './components/project-details/EditProject';
import { ProjectContext } from './context/ProjectContext';
import AddCarouselImage from './components/carousel/AddCarouselImage';
import GetCarousel from './components/carousel/GetCarousel';
import UpdateCarousel from './components/carousel/UpdateCarousel';
import AddTeam from './components/team/AddTeam';
import GetTeam from './components/team/GetTeam';
import EditTeam from './components/team/EditTeam';



function App() {
  const {getProjects} = useContext(ProjectContext)
  useEffect(()=>{
   getProjects()
  },[])
  
  return (
    <div className="App">
      <Routes>
        {/* Projects */}
        <Route path='/add-project' element={<AddProject/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/project/:id' element={<ProjectDetails/>}/>
        <Route path='/edit-project/:id' element={<EditProject/>}/>
        {/* Carousel */}
        <Route path='/add-carousel-image' element={<AddCarouselImage/>}/>
        <Route path='/carousel' element={<GetCarousel/>}/>
        <Route path='/edit-carousel/:id' element={<UpdateCarousel/>}/>
        {/* Team */}
        <Route path='/add-team' element={<AddTeam/>}/>
        <Route path='/team' element={<GetTeam/>}/>
        <Route path='/edit-team/:id' element={<EditTeam/>}/>
      </Routes>
      {/* <ImageUpload/> */}
      
    </div>
  );
}

export default App;
