import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b-2 border-blue-500">
      <div className="flex items-center space-x-2">
        <span className="text-blue-700 text-2xl">🏠</span>
        <Link to="/" className="text-xl font-bold text-blue-800">InstaDoc</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Doctor Login
        </Link>
        <Link to="/register" className="text-green-600 font-medium hover:underline">
          Doctor Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
