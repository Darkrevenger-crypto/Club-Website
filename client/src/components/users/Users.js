import React, { useContext, useEffect } from 'react';
import User from './User';
import UsersContext from '../../context/users/usersContext';
import Preloader from '../layout/Preloader';

const Users = () => {
  const usersContext = useContext(UsersContext);
  const { getUsers, users, loading } = usersContext;
  useEffect(() => {
    getUsers();
    //eslint-disable-next-line
  });
  if (users !== null && users.length === 0 && !loading) {
    return <h4>No Current Members</h4>;
  }
  return (
    <div>
      {users !== null && !loading ? (
        <div style={userStyle}>
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '2px',
};
export default Users;
