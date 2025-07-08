import React from 'react';
import { Bell, User, LogOut, Settings, Home } from 'lucide-react';
import { User as UserType } from '../../types';

interface NavbarProps {
  user: UserType;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentView }) => {
  const isAdmin = user.role === 'admin';

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Society Manager</h1>
              <p className="text-xs text-gray-500">
                {isAdmin ? 'Admin Dashboard' : `Flat ${user.flatNumber}`}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            
            {isAdmin && (
              <>
                <button
                  onClick={() => onNavigate('users')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'users'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => onNavigate('analytics')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'analytics'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Analytics
                </button>
              </>
            )}
            
            <button
              onClick={() => onNavigate('payments')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'payments'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Payments
            </button>
            
            <button
              onClick={() => onNavigate('maintenance')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'maintenance'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Maintenance
            </button>
            
            <button
              onClick={() => onNavigate('notices')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'notices'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Notices
            </button>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-8 w-8 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Settings className="h-5 w-5" />
            </button>
            
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};