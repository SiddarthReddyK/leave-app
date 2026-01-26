import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold text-primary-500 mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
