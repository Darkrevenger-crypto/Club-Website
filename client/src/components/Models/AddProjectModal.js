import React, { useContext, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import ProjectContext from '../../context/project/projectContext';

const AddProjectModal = () => {
  const projectContext = useContext(ProjectContext);

  const { addProject } = projectContext;

  const [project, setProject] = useState({
    name: '',
    body: '',
    isCompleted: true,
    link: '',
  });
  const { name, body, link, isCompleted } = project;
  const onSubmit = (e) => {
    if (name === '' || body === '') {
      M.toast({ html: 'Name and Description required' });

      setProject({
        name: '',
        body: '',
        isCompleted: true,
        link: '',
      });
    } else {
      addProject({
        ...project,
      });
      setProject({
        name: '',
        body: '',
        isCompleted: true,
        link: '',
      });
    }
  };

  return (
    <div id='add' className='modal  ' style={modalStyle}>
      <div className='modal-content container'>
        <div className='text-center' style={{ fontSize: '40px' }}>
          New Project
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
            <label htmlFor='name' className='active'>
              Project Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='body'
              value={body}
              onChange={(e) => setProject({ ...project, body: e.target.value })}
            />
            <label htmlFor='body' className='active'>
              Description
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='link'
              value={link}
              onChange={(e) => setProject({ ...project, link: e.target.value })}
            />
            <label htmlFor='link' className='active'>
              Link to Project
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <label>
              <input
                type='checkbox'
                className='filled-in'
                checked={isCompleted}
                value={isCompleted}
                onChange={(e) =>
                  setProject({ ...project, isCompleted: !isCompleted })
                }
              />
              <span>Completed</span>
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer container'>
        <a
          href='#!'
          onClick={onSubmit}
          style={{ marginRight: '25px' }}
          className='modal-close waves-effect waves-light btn '
        >
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '65%',
  height: '95%',
};
export default AddProjectModal;
