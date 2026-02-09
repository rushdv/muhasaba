import React from 'react';

const IslamicLogo = ({ size = 24, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect
            x="25"
            y="25"
            width="50"
            height="50"
            className="stroke-current"
            strokeWidth="6"
            transform="rotate(0 50 50)"
        />
        <rect
            x="25"
            y="25"
            width="50"
            height="50"
            className="stroke-current"
            strokeWidth="6"
            transform="rotate(45 50 50)"
        />
        <circle
            cx="50"
            cy="50"
            r="8"
            className="fill-current"
        />
    </svg>
);

export default IslamicLogo;
