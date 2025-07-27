import React, { useState } from 'react';
import { Plus, LogIn, UserPlus, Briefcase, LogOut, LayoutDashboard, Bell, CalendarClock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Dummy jobAlerts for now; replace with your state/service.
const jobAlerts: any[] = [
  // Example: { id: 1, keyword: "React", location: "Remote", candidateId: 42 }
];

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // TODO: Replace jobAlerts and onMarkAsRead with real service/props as you need.
  const unreadCount = jobAlerts.length;
  const onMarkAsRead = (alertId: number) => {
    // Implement this function to mark notification as read in your app.
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isRecruiter = user?.userType?.toLowerCase() === 'recruiter';
  const isCandidate = user?.userType?.toLowerCase() === 'candidate';
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
            {user && (
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Jobs
              </Link>
            )}
            {user && (
              <Link to={isAdmin ? "/admin-dashboard" : "/dashboard"} className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            )}
            {isRecruiter && (
              <Link to="/add-job" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                Post Job
              </Link>
            )}
            {(isCandidate || isRecruiter) && (
              <Link to={"/interview-planning"} className="inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                <CalendarClock className="h-4 w-4 mr-2" />
                Interviews
              </Link>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* NOTIFICATIONS */}
            {user && isCandidate && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Job Alerts</h3>
                      <p className="text-sm text-gray-600">{unreadCount} new alerts</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {jobAlerts.length > 0 ? (
                        jobAlerts.map((alert) => (
                          <div key={alert.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  New job matching: "{alert.keyword}"
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Location: {alert.location}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  Candidate ID: {alert.candidateId}
                                </p>
                              </div>
                              <button
                                onClick={() => onMarkAsRead(alert.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                              >
                                Mark as read
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No job alerts</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* USER GREETING AND AUTH BUTTONS */}
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
