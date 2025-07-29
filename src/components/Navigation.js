import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, BookOpen, LogOut } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';

export default function Navigation() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ChatBot</span>
            </div>
            <div className="ml-10 flex space-x-8">
              <Link to="/chat" className="nav-link">
                <MessageCircle className="icon" />
                Chat
              </Link>
              <Link to="/grammar-rules" className="nav-link">
                <BookOpen className="icon" />
                Grammar Rules
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleLogout} className="nav-link">
              <LogOut className="icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
