import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { DashboardStats } from './components/Dashboard/DashboardStats';
import { RecentActivity } from './components/Dashboard/RecentActivity';
import { QuickActions } from './components/Dashboard/QuickActions';
import { PaymentSection } from './components/Payments/PaymentSection';
import { MaintenanceSection } from './components/Maintenance/MaintenanceSection';
import { NoticesSection } from './components/Notices/NoticesSection';

function App() {
  const { user, isLoading, login, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {user.role === 'admin' 
                  ? 'Here\'s an overview of your society management dashboard.'
                  : `Here's your personalized dashboard for flat ${user.flatNumber}.`
                }
              </p>
            </div>
            
            <DashboardStats userRole={user.role} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivity userRole={user.role} />
              <QuickActions userRole={user.role} onNavigate={setCurrentView} />
            </div>
          </div>
        );
      case 'payments':
        return <PaymentSection userRole={user.role} />;
      case 'maintenance':
        return <MaintenanceSection userRole={user.role} />;
      case 'notices':
        return <NoticesSection userRole={user.role} />;
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics and reporting features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings and configuration options coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600">The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onLogout={logout} 
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;