import React from 'react';

const LogoImage = ({ src, alt, width, height }) => {
  return <img src={src} alt={alt} style={{ width, height }} />;
};

export default LogoImage;
