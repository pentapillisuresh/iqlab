import React from 'react';
import { Users, Shield, Briefcase, TrendingUp } from 'lucide-react';

const DashboardStats = ({ users, serviceTitles }) => {
  const totalUsers = Object.values(users).reduce((acc, userArray) => acc + userArray.length, 0);
  const totalRevenue = Object.values(users)
    .flat()
    .reduce((acc, user) => acc + (user.amount || 0), 0);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'ISO Users',
      value: users.iso?.length || 0,
      icon: Shield,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Club Members',
      value: users.club?.length || 0,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Career Guidance',
      value: users.career?.length || 0,
      icon: Briefcase,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard Overview</h1>
        <p className="text-gray-600">Monitor and manage all your services from one place</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(users).map(([service, userList]) => {
              const percentage = totalUsers > 0 ? ((userList.length / totalUsers) * 100).toFixed(1) : 0;
              return (
                <div key={service} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {service === 'iso' && <Shield className="h-5 w-5 text-green-600 mr-2" />}
                    {service === 'club' && <Users className="h-5 w-5 text-purple-600 mr-2" />}
                    {service === 'career' && <Briefcase className="h-5 w-5 text-orange-600 mr-2" />}
                    <span className="font-medium text-gray-700">
                      {serviceTitles[service]}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{userList.length} users</span>
                    <span className="text-sm font-medium text-gray-800">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/admin/iso'}
              className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-gray-700">Manage ISO Users</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/admin/club'}
              className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-gray-700">Manage Club Members</span>
              </div>
              <span className="text-purple-600">→</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/admin/career'}
              className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-orange-600 mr-3" />
                <span className="font-medium text-gray-700">Manage Career Users</span>
              </div>
              <span className="text-orange-600">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;