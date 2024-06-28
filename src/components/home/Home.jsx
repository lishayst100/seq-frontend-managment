import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectsList from './ProjectsList'
import ProjectList from './LoadMore'
import SortList from './SortList'
import ProjectsPreview from './Project-preview/ProjectsPreview'



const Home = () => {
    const nav = useNavigate()
  return (
    <div className='d-flex gap-4 flex-column'>
     
    <h2>Hey Dvir, Welcome To Your WebSite Management</h2>
    <div className='home d-flex justify-content-center align-items-center flex-column gap-5'>
      <button onClick={()=>{nav('/add-project')}} className='btn-primary btn'>Add New Project</button>
    </div>
    <SortList/>
    <ProjectsPreview/>
    </div>
  )
}

export default Home