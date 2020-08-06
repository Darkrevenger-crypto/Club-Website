import React from 'react';

const Footer = () => {
  return (
    <footer
      className='page-footer grey darken-4 shadow
    '
      style={{
        paddingTop: '0px',
        paddingLeft: '15px',
        borderRadius: '0px 0px 15px 15px',

        height: '200px',
      }}
    >
      <div className='row'>
        <div className='col l6 s12'>
          <h5 className='white-text'>Info</h5>
          <p className='grey-text text-lighten-4'>
            You can use rows and columns here to organize your footer content.
          </p>
        </div>
      </div>

      <div className='center-align '>© 2014 Copyright Text</div>
    </footer>
  );
};

export default Footer;
