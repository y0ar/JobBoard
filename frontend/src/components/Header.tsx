import { Plus, LogIn, UserPlus, Briefcase, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isRecruiter = user?.userType?.toLowerCase() === 'recruiter';
  const isAdmin = user?.userType?.toLowerCase() === 'administrator';

  return (
    <header className="bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">JobBoard</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Jobs
            </Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Companies
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </Link>            
            {/* Dashboard Link */}
            {user && (
              <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"} className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            )}
            {/* Add Job (Recruiter) */}
            {isRecruiter && (
              <Link to="/add-job" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  Hello, {user.firstName}!
                </span>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
