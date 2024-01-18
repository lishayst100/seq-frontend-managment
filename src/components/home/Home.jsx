import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectsList from './ProjectsList'


const Home = () => {
    const nav = useNavigate()
  return (
    <div>

    <h2>Hey Dvir, Welcome To Your WebSite Management</h2>
    <div className='home d-flex justify-content-center align-items-center flex-column gap-5'>
      <button onClick={()=>{nav('/add-project')}} className='btn-primary btn'>Add New Project</button>
      <button onClick={()=>{nav('/carousel')}} className='btn-success btn'> Carousel Page</button>
      <button onClick={()=>{nav('/team')}} className='btn-success btn'>Team Page</button>
        <ProjectsList/>
        
    </div>
    </div>
  )
}

export default Home