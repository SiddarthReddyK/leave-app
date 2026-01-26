import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-500">EduLeave</h1>
        <div className="flex items-center space-x-4">
          <span className="text-secondary-600">{user?.name}</span>
          <button
            onClick={onLogout}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
