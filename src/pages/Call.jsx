import React from 'react';
import './Call.css';

const Call = () => {
  const phoneNumber = 'tel:+919100135553'; // Replace with your number

  return (
    <a href={phoneNumber} className="call-button" aria-label="Call us">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="call-icon"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.54.57 1 1 0 011 1V20a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.54 1 1 0 01-.21 1.11l-2.2 2.2z" />
      </svg>
    </a>
  );
};

export default Call;
