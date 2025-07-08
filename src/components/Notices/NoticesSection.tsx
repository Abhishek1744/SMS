import React, { useState } from 'react';
import { Bell, Plus, Calendar, User, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

interface NoticesSectionProps {
  userRole: 'admin' | 'resident';
}

export const NoticesSection: React.FC<NoticesSectionProps> = ({ userRole }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'medium' as const
  });

  const notices: Notice[] = [
    {
      id: '1',
      title: 'Water Supply Maintenance',
      content: 'Water supply will be interrupted tomorrow from 10 AM to 2 PM for maintenance work. Please store water accordingly.',
      priority: 'high',
      createdAt: new Date('2024-01-10'),
      createdBy: 'Admin',
      isActive: true
    },
    {
      id: '2',
      title: 'Society Meeting',
      content: 'Monthly society meeting scheduled for January 15th at 7 PM in the community hall. All residents are requested to attend.',
      priority: 'medium',
      createdAt: new Date('2024-01-08'),
      createdBy: 'Admin',
      isActive: true
    },
    {
      id: '3',
      title: 'Parking Guidelines',
      content: 'Please ensure proper parking in designated areas. Vehicles parked in no-parking zones will be towed at owner\'s expense.',
      priority: 'low',
      createdAt: new Date('2024-01-05'),
      createdBy: 'Admin',
      isActive: true
    },
    {
      id: '4',
      title: 'Festive Celebrations',
      content: 'Diwali celebrations will be organized in the community hall on October 28th. All residents are invited to participate.',
      priority: 'low',
      createdAt: new Date('2023-12-20'),
      createdBy: 'Admin',
      isActive: false
    }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmitNotice = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notice submission
    console.log('New notice:', newNotice);
    setShowCreateModal(false);
    setNewNotice({ title: '', content: '', priority: 'medium' });
  };

  const CreateNoticeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Notice</h3>
          
          <form onSubmit={handleSubmitNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Notice title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Notice content"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={newNotice.priority}
                onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notices</h2>
          <p className="text-gray-600">Important announcements and updates</p>
        </div>
        {userRole === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Notice</span>
          </button>
        )}
      </div>

      {/* Active Notices */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Notices</h3>
        <div className="grid gap-4">
          {notices.filter(notice => notice.isActive).map((notice) => (
            <div key={notice.id} className={`bg-white rounded-xl shadow-sm border-2 p-6 ${getPriorityColor(notice.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getPriorityIcon(notice.priority)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{notice.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{notice.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{notice.createdBy}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{notice.createdAt.toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
                {userRole === 'admin' && (
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Archive
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archived Notices */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Archived Notices</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {notices.filter(notice => !notice.isActive).map((notice) => (
              <div key={notice.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{notice.title}</h4>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {notice.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{notice.createdBy}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{notice.createdAt.toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  {userRole === 'admin' && (
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Restore
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && <CreateNoticeModal />}
    </div>
  );
};