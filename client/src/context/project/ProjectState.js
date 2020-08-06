import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import axios from 'axios';
import {
  ADD_PROJECT,
  EDIT_PROJECT,
  GET_PROJECTS,
  PROJECT_ERROR,
  DELETE_PROJECT,
  CLEAR_ERRORS,
  CLEAR_CURRENT,
  SET_CURRENT,
} from '../types';

const ProjectState = (props) => {
  const initialState = {
    error: null,
    loading: true,
    projects: null,
    current: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  //get projects
  const getProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.data }); //No message is being sent as a json object
    }
  };
  //add project
  const addProject = async (projectdata) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/projects', projectdata, config);
      dispatch({ type: ADD_PROJECT, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg }); //msg is being sent
    }
  };
  //edit project
  const editProject = async (project) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/projects/${project._id}`,
        project,
        config
      );
      dispatch({ type: EDIT_PROJECT, payload: res.data });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg }); //msg is being sent
    }
  };
  //delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (err) {
      dispatch({ type: PROJECT_ERROR, payload: err.response.msg }); //msg is being sent
    }
  };
  //clear error
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  //set current
  const setCurrent = (project) => {
    dispatch({ type: SET_CURRENT, payload: project });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  return (
    <projectContext.Provider
      value={{
        error: state.error,
        loading: state.loading,
        projects: state.projects,
        current: state.current,
        getProjects,
        addProject,
        editProject,
        deleteProject,
        clearErrors,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
