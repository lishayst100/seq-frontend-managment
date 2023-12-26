import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteProjectBtn from '../project-manager/DeleteProjectBtn'
import EditBtn from '../project-manager/EditBtn'
import { ProjectContext } from '../../context/ProjectContext'

const ProjectsList = () => {
    const {projects} = useContext(ProjectContext)
    const nav = useNavigate()
  return (
    <div className='d-flex flex-wrap gap-3 justify-content-center align-items-center'>
        {projects.length === 0 && <h4>No Projects Found</h4>}
        {
          projects.length > 0 &&  projects.map(project => (
                <div key={project._id} className='shadow-lg p-4 rounded d-flex flex-column gap-4'>
                    <h2>{project.title}</h2>
                    <img className='rounded' src={project.images[0]} alt="" width={200} height={200} onClick={()=>{nav(`project/${project._id}`)}}/>
                    <div className='d-flex justify-content-between '>
                    <DeleteProjectBtn id={project._id}/>
                    <EditBtn id={project._id}/>
                    </div>
                   
                </div>
            ))
        }
    </div>
  )
}

export default ProjectsList