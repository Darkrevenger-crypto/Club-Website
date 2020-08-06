import {
  ADD_PROJECT,
  EDIT_PROJECT,
  GET_PROJECTS,
  PROJECT_ERROR,
  DELETE_PROJECT,
  CLEAR_ERRORS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        projects: null,
        error: action.payload,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false,
      };

    case DELETE_PROJECT:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case EDIT_PROJECT:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        ),
      };
    default:
      return { ...state };
  }
};
