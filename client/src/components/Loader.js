import React from 'react';
import './Loader.css';

const Loader = ({ text = "Loading movie details..." }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <div className="loader-text">{text}</div>
    </div>
  );
};

export default Loader;
