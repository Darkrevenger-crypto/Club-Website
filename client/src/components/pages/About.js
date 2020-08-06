import React from 'react';
import Users from '../users/Users';
const About = () => {
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
      <div style={{ fontSize: '60px', fontFamily: 'serif' }}>About</div>
      <div className='container' style={{ marginTop: '40px' }}>
        <div
          className='black white-text '
          style={{
            textDecorationWidth: '10px',
            fontSize: '30px',
            marginBottom: '25px',
          }}
        >
          Current Members :
        </div>

        <Users />
      </div>
    </div>
  );
};

export default About;
