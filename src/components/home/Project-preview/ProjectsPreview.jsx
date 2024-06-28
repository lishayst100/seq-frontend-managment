import React, { useContext, useState } from "react";
import "./Project.scss"; // Ensure the correct path to your SCSS file
import Project from "./Project";
import { ProjectContext } from "../../../context/ProjectContext";




const ProjectsPreview = () => {
  const {projects,isLoading} = useContext(ProjectContext)


  return (
    <div>

        <div className="layout">
          
          {projects.sort((a,b)=> a.linkId - b.linkId).map((project,index) => (
            <Project img={project.frontImage} title={project.title} key={project._id} index={index} _id={project._id} item={'item'}/>
          ))}
         
        </div>
      
      
    </div>
  );
};

export default ProjectsPreview;
