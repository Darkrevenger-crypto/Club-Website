import axios from 'axios';
import React, { useReducer } from 'react';
import usersReducer from './usersReducer';
import usersContext from './usersContext';
import { GET_USERS, USER_ERROR } from '../types';

const UsersState = (props) => {
  const initialState = {
    users: null,
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  return (
    <usersContext.Provider
      value={{
        users: state.users,
        getUsers,
      }}
    >
      {props.children}
    </usersContext.Provider>
  );
};
export default UsersState;
