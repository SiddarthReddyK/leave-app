import React from 'react';

const Button = ({ children, variant = 'primary', disabled = false, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-600',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
