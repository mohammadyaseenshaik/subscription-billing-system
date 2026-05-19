import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Sidebar />
      {/* Content area: offset by sidebar width on sm+ and navbar height on all screens */}
      <div className="sm:ml-64 pt-16 min-h-screen">
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
