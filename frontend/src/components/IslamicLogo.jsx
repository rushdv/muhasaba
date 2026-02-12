import React from 'react';
import logoImg from '../assets/Logo.png';

const IslamicLogo = ({ size = 24, className = "" }) => (
    <img
        src={logoImg}
        alt="Muhasabah"
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size, objectFit: 'contain' }}
    />
);

export default IslamicLogo;
