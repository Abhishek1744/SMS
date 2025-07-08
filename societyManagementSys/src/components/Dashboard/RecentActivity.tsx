import React from 'react';
import { Clock, DollarSign, Wrench, Bell, FileText } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'payment' | 'maintenance' | 'notice' | 'document';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'pending' | 'warning';
}

interface RecentActivityProps {
  userRole: 'admin' | 'resident';
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ userRole }) => {
  const adminActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      description: 'A-101 paid monthly maintenance fee',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'New Maintenance Request',
      description: 'Plumbing issue reported in B-205',
      timestamp: '4 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'notice',
      title: 'Notice Published',
      description: 'Society meeting scheduled for next week',
      timestamp: '1 day ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'document',
      title: 'Document Uploaded',
      description: 'New policy document added to library',
      timestamp: '2 days ago',
      status: 'success'
    }
  ];

  const residentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Successful',
      description: 'Monthly maintenance fee paid',
      timestamp: '3 days ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'Maintenance Complete',
      description: 'AC repair work completed',
      timestamp: '5 days ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'notice',
      title: 'New Notice',
      description: 'Water supply maintenance scheduled',
      timestamp: '1 week ago',
      status: 'warning'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Due',
      description: 'Monthly maintenance fee due in 3 days',
      timestamp: '1 week ago',
      status: 'pending'
    }
  ];

  const activities = userRole === 'admin' ? adminActivities : residentActivities;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-blue-600" />;
      case 'notice':
        return <Bell className="h-5 w-5 text-orange-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                {activity.status && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};