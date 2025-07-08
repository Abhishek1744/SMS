import React from 'react';
import { TrendingUp, DollarSign, Users, AlertTriangle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 
            changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

interface DashboardStatsProps {
  userRole: 'admin' | 'resident';
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ userRole }) => {
  const adminStats = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      title: 'Active Residents',
      value: '145',
      change: '+3.2%',
      changeType: 'increase' as const,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Pending Requests',
      value: '8',
      change: '-15.3%',
      changeType: 'decrease' as const,
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
      color: 'bg-orange-100'
    },
    {
      title: 'Collection Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'increase' as const,
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-100'
    }
  ];

  const residentStats = [
    {
      title: 'Outstanding Dues',
      value: '$320',
      change: '-$80',
      changeType: 'decrease' as const,
      icon: <DollarSign className="h-6 w-6 text-red-600" />,
      color: 'bg-red-100'
    },
    {
      title: 'Maintenance Requests',
      value: '3',
      change: '+1',
      changeType: 'increase' as const,
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
      color: 'bg-orange-100'
    },
    {
      title: 'Payments This Year',
      value: '$2,840',
      change: '+$240',
      changeType: 'increase' as const,
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      color: 'bg-green-100'
    },
    {
      title: 'Payment Score',
      value: '98%',
      change: '+5%',
      changeType: 'increase' as const,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-100'
    }
  ];

  const stats = userRole === 'admin' ? adminStats : residentStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};