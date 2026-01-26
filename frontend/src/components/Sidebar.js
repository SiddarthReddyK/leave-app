import React, { useState } from 'react';

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    student: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Apply Leave', href: '/apply-leave' },
      { label: 'My Leaves', href: '/my-leaves' },
    ],
    teacher: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Pending Requests', href: '/pending-leaves' },
      { label: 'Approved Leaves', href: '/approved-leaves' },
    ],
    admin: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'All Leaves', href: '/all-leaves' },
      { label: 'Reports', href: '/reports' },
    ],
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 bg-primary-500 text-white p-3 rounded-full shadow-lg z-20"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen w-64 bg-white shadow-md transform md:transform-none transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-10`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-8">Menu</h2>
          <nav className="space-y-2">
            {menuItems[role]?.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-lg text-secondary-600 hover:bg-background hover:text-primary-500 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
