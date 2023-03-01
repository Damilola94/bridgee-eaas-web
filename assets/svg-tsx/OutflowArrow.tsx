import React from 'react';

const OutflowArrow = ({ className = '', color = 'white' }) => {
  return (
    <svg className={className} width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.99609 25.8867H23.3469" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.70312 4.94336L21.6391 20.7924" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.70312 16.5698V4.94336H17.3933" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default OutflowArrow;
