// ProjectList.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../services/utils';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching projects for page:', page);
      const response = await axios.get(`${BASE_URL}/loadMoreProjects?page=${page}`);
      setProjects(prevProjects => [...prevProjects, ...response.data]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProjects();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchProjects]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 20 && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      {projects.map(project => (
        // Render project components here
        <div key={project._id}>
            <h2>{project.title}</h2>
            <img src={project.images[0]} width={200} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
