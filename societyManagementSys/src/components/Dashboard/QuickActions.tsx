import React from 'react';
import { Plus, Upload, Bell, Users, Settings, FileText } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  userRole: 'admin' | 'resident';
  onNavigate: (view: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ userRole, onNavigate }) => {
  const adminActions: QuickAction[] = [
    {
      id: '1',
      title: 'Add New User',
      description: 'Register a new resident',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      onClick: () => onNavigate('users')
    },
    {
      id: '2',
      title: 'Create Notice',
      description: 'Post a new announcement',
      icon: <Bell className="h-6 w-6" />,
      color: 'bg-orange-600 hover:bg-orange-700 text-white',
      onClick: () => onNavigate('notices')
    },
    {
      id: '3',
      title: 'Upload Document',
      description: 'Add important documents',
      icon: <Upload className="h-6 w-6" />,
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      onClick: () => onNavigate('documents')
    },
    {
      id: '4',
      title: 'System Settings',
      description: 'Configure application',
      icon: <Settings className="h-6 w-6" />,
      color: 'bg-gray-600 hover:bg-gray-700 text-white',
      onClick: () => onNavigate('settings')
    }
  ];

  const residentActions: QuickAction[] = [
    {
      id: '1',
      title: 'Make Payment',
      description: 'Pay maintenance dues',
      icon: <Plus className="h-6 w-6" />,
      color: 'bg-green-600 hover:bg-green-700 text-white',
      onClick: () => onNavigate('payments')
    },
    {
      id: '2',
      title: 'Upload Receipt',
      description: 'Upload payment receipt',
      icon: <Upload className="h-6 w-6" />,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      onClick: () => onNavigate('receipts')
    },
    {
      id: '3',
      title: 'Request Maintenance',
      description: 'Report an issue',
      icon: <Bell className="h-6 w-6" />,
      color: 'bg-orange-600 hover:bg-orange-700 text-white',
      onClick: () => onNavigate('maintenance')
    },
    {
      id: '4',
      title: 'View Documents',
      description: 'Access society documents',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-purple-600 hover:bg-purple-700 text-white',
      onClick: () => onNavigate('documents')
    }
  ];

  const actions = userRole === 'admin' ? adminActions : residentActions;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`p-4 rounded-lg transition-all transform hover:scale-105 ${action.color}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {action.icon}
              </div>
              <div className="text-left">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};