import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/project/projectContext';

import Moment from 'react-moment';
import M from 'materialize-css/dist/js/materialize.min.js';
import image from '../layout/images/download.jfif';

const ProjectItem = ({ project }) => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);
  const { deleteProject, setCurrent } = projectContext;
  const { isAuthenticated } = authContext;
  const { name, username, body, date, _id, link, isCompleted } = project;
  const onClick = (e) => {
    deleteProject(_id);
    M.toast({ html: `Project ${name}  removed` });
  };
  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <div className='col s12 m7'>
        <div className='card horizontal'>
          <div className='card-image'>
            <img src={image} alt='' />
          </div>
          <div className='card-stacked'>
            <div className='card-content'>
              <div className='truncate'>
                {isCompleted ? (
                  <span
                    className='new badge green white-text'
                    data-badge-caption='Completed'
                  ></span>
                ) : (
                  <span
                    className='new badge orange white-text'
                    data-badge-caption='Ongoing'
                  ></span>
                )}
                Name: {name}
                <br />
                Description :{body}
              </div>
            </div>
            <div className='card-action'>
              <a href='#'>
                Project Link:<div style={{ fontSize: '12px' }}>{link}</div>{' '}
              </a>
              {isAuthenticated ? (
                <a
                  className='modal-trigger  btn-floating secondary-content waves-effect waves-light black'
                  href='#edit'
                  onClick={() => {
                    setCurrent(project);
                  }}
                >
                  <i className='tiny material-icons'>create</i>
                </a>
              ) : (
                <Fragment></Fragment>
              )}
              {isAuthenticated ? (
                <a className='tiny btn-floating secondary-content  secondary-content waves-effect waves-light grey'>
                  <i className='tiny material-icons' onClick={onClick}>
                    delete
                  </i>
                </a>
              ) : (
                <Fragment></Fragment>
              )}
            </div>

            <div
              className='grey-text secondary-content text-right'
              style={{ fontSize: '10px' }}
            >
              posted by:
              <span
                className='grey-text text-darken-2'
                style={{ fontSize: '12px' }}
              >
                {username}
              </span>{' '}
              on <Moment format='MMMM Do YYYY h:mm:ss a'>{date}</Moment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};
export default ProjectItem;
