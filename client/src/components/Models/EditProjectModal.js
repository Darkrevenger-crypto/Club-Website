import React, { useContext, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import ProjectContext from '../../context/project/projectContext';
import AuthContext from '../../context/auth/authContext';

const EditProjectModal = () => {
  const projectContext = useContext(ProjectContext);
  const authContext = useContext(AuthContext);
  const { editProject, current, clearCurrent } = projectContext;

  const [project, setProject] = useState({
    _id: null,
    name: '',
    body: '',
    isCompleted: true,
    link: '',
    username: null,
    date: new Date(),
  });
  const { name, body, link, isCompleted } = project;
  const onSubmit = (e) => {
    if (name === '' || body === '') {
      M.toast({ html: 'Name and Description required' });
      clearCurrent();
      setProject({
        _id: null,
        name: '',
        body: '',
        isCompleted: true,
        link: '',
        username: null,
        date: new Date(),
      });
    } else {
      editProject({
        ...project,
        _id: current._id,
        username: authContext.user.username,
      });
      clearCurrent();
      setProject({
        _id: null,
        name: '',
        body: '',
        isCompleted: true,
        link: '',
        username: null,
        date: new Date(),
      });
    }
  };

  return (
    <div id='edit' className='modal ' style={modalStyle}>
      <div className='modal-content container'>
        <div className='text-center' style={{ fontSize: '40px' }}>
          Edit Project
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
              ProjectName
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
      <div className='modal-footer conatiner'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light btn '
          style={{ marginRight: '25px' }}
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
export default EditProjectModal;
