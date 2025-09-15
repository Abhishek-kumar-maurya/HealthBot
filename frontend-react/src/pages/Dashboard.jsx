import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { healthRecordsAPI, chatAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRecords: 0,
    recentRecords: [],
    totalChats: 0,
    recentChats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch health records
      const recordsPromise = healthRecordsAPI.getRecords().catch(() => ({ results: [] }));
      
      // Fetch chat history
      const chatsPromise = chatAPI.getChatHistory().catch(() => ({ results: [] }));
      
      const [recordsData, chatsData] = await Promise.all([recordsPromise, chatsPromise]);
      
      const records = recordsData.results || recordsData || [];
      const chats = chatsData.results || chatsData || [];
      
      setStats({
        totalRecords: records.length,
        recentRecords: records.slice(0, 5),
        totalChats: chats.filter(chat => chat.sender === 'user').length,
        recentChats: chats.slice(-3).reverse()
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      medication: 'bg-green-100 text-green-800',
      appointment: 'bg-purple-100 text-purple-800',
      test: 'bg-yellow-100 text-yellow-800',
      symptom: 'bg-red-100 text-red-800'
    };
    return colors[category] || colors.general;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.username || user?.first_name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">Here's your health overview</p>
      </div>

      <ErrorMessage error={error} onDismiss={() => setError(null)} onRetry={fetchDashboardData} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Health Records</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chat Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalChats}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Profile</p>
              <p className="text-lg font-bold text-gray-900">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg font-bold text-gray-900">Healthy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate('/health-records')}
          className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors text-left"
        >
          <h3 className="text-lg font-semibold mb-2">Health Records</h3>
          <p className="text-blue-200">View and manage your health records</p>
        </button>

        <button
          onClick={() => navigate('/chat')}
          className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors text-left"
        >
          <h3 className="text-lg font-semibold mb-2">Chat with HealthBot</h3>
          <p className="text-green-200">Get health advice and support</p>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors text-left"
        >
          <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
          <p className="text-purple-200">Update your profile information</p>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Health Records */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Health Records</h2>
            <button
              onClick={() => navigate('/health-records')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View all
            </button>
          </div>
          
          {stats.recentRecords.length === 0 ? (
            <p className="text-gray-500">No health records yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentRecords.map((record) => (
                <div key={record.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{record.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{record.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(record.category)}`}>
                      {record.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(record.date || record.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Chat Messages */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Chat Activity</h2>
            <button
              onClick={() => navigate('/chat')}
              className="text-green-600 hover:text-green-800 text-sm"
            >
              Open chat
            </button>
          </div>
          
          {stats.recentChats.length === 0 ? (
            <p className="text-gray-500">No chat messages yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentChats.map((chat, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-start">
                    <span className={`text-xs px-2 py-1 rounded mr-2 ${
                      chat.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {chat.sender === 'user' ? 'You' : 'Bot'}
                    </span>
                    <p className="text-sm text-gray-900 flex-1 truncate">{chat.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(chat.timestamp)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;