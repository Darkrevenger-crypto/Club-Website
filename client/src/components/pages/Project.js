import React, { useContext } from 'react';
import Projects from '../projects/Projects';

import AuthContext from '../../context/auth/authContext';
const Project = () => {
  const authContext = useContext(AuthContext);
  return (
    <div
      className='white center'
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
        height: '900px',
        overflowY: 'auto',
      }}
    >
      <div style={{ fontSize: '60px', fontFamily: 'serif' }}>Projects</div>
      <div className='container' style={{ marginTop: '40px' }}>
        <div
          className='black white-text '
          style={{
            textDecorationWidth: '10px',
            fontSize: '30px',
            marginBottom: '25px',
          }}
        >
          Current Projects :
          {authContext.isAuthenticated ? (
            <div className='secondary-content'>
              <a
                className='modal-trigger tiny btn-floating  waves-effect waves-light black'
                href='#add'
              >
                <i className='tiny material-icons'>add</i>
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <Projects />
      </div>
    </div>
  );
};

export default Project;
