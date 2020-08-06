import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, logout, user } = authContext;

  return (
    <nav
      style={{
        borderRadius: '20px 20px 0px 0px',
      }}
    >
      <div
        className='center-align nav-wrapper   grey darken-3 '
        style={{ borderRadius: '15px 15px 0px 0px' }}
      >
        <ul className=' hide-on-med-and-down' style={{ paddingLeft: '15px' }}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/projects'>Projects</Link>
          </li>
          <li className=''>
            {isAuthenticated && !loading ? (
              <Link
                to='/'
                onClick={(e) => {
                  logout();
                }}
              >
                Logout
              </Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
        {isAuthenticated && !loading ? (
          <div
            className='text-right white-text'
            style={{ paddingRight: '10px', fontFamily: 'serif' }}
          >
            Hi {user.name}{' '}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
