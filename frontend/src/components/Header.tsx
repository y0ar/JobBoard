import React from 'react';
import { Search, Plus, LogIn, UserPlus, Briefcase } from 'lucide-react';

interface HeaderProps {
  onAddJob: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddJob, onLogin, onRegister }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">JobBoard</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Jobs
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Companies
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddJob}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </button>
            
            <button
              onClick={onLogin}
              className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </button>
            
            <button
              onClick={onRegister}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
