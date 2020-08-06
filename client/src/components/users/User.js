import React from 'react';
import PropTypes from 'prop-types';
import image from '../layout/images/office.jpg';

const User = ({ user }) => {
  const { name, username, email } = user;
  return (
    <div style={{ marginRight: '30px', display: 'inline' }}>
      <div
        className='card'
        style={{
          borderRadius: '15px 15px 15px 15px',
        }}
      >
        <div className='card-image'>
          <img
            src={image}
            alt=''
            className='activator circle'
            style={{
              borderRadius: '15px 15px 15px 15px',
              height: '140px',
              width: '170px',
            }}
          />
        </div>

        <div className='card-content'>
          <span
            className='card-title activator grey-text text-darken-4'
            style={{ fontSize: '12px' }}
          >
            {name}
            <i className='tiny material-icons right'>more_vert</i>
          </span>
        </div>
        <div className='card-reveal container'>
          <span
            className='card-title grey-text text-darken-4'
            style={{ fontSize: '14px' }}
          >
            <div className='secondary-content grey-text'>
              <i className='tiny material-icons right'>close</i>
            </div>
            {name}
          </span>
          <p style={{ fontSize: '10px' }}>
            Email:{email}
            <br />
            Username:{username}
          </p>
        </div>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
