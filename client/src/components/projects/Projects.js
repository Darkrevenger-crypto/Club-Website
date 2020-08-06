import React, { useEffect, useContext } from 'react';
import ProjectContext from '../../context/project/projectContext';
import ProjectItem from './ProjectItem';
import M from 'materialize-css/dist/js/materialize.min.js';
import Preloader from '../layout/Preloader';

const Projects = () => {
  const projectContext = useContext(ProjectContext);

  const { projects, getProjects, loading, error, clearErrors } = projectContext;

  useEffect(() => {
    getProjects();

    if (error) {
      M.toast({ html: 'Internal Server Error' });
      clearErrors();
    }
  });
  if (!loading && projects !== null && projects.length === 0) {
    return <div style={{ fontSize: '20px' }}>No Project available</div>;
  }
  return (
    <div>
      {!loading && projects !== null ? (
        <div>
          {projects.map((project) => (
            <ProjectItem key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div>
          <Preloader />
        </div>
      )}
    </div>
  );
};
export default Projects;
