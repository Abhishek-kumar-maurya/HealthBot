import React, { useState, useEffect } from 'react';
import { healthRecordsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    title: '',
    description: '',
    date: '',
    category: 'general'
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await healthRecordsAPI.getRecords();
      setRecords(data.results || data || []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch health records');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const createdRecord = await healthRecordsAPI.createRecord(newRecord);
      setRecords([createdRecord, ...records]);
      setNewRecord({ title: '', description: '', date: '', category: 'general' });
      setShowAddForm(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create health record');
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }
    
    try {
      await healthRecordsAPI.deleteRecord(id);
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete health record');
    }
  };

  const handleInputChange = (e) => {
    setNewRecord({
      ...newRecord,
      [e.target.name]: e.target.value
    });
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
        <LoadingSpinner text="Loading health records..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Record'}
        </button>
      </div>

      <ErrorMessage error={error} onDismiss={() => setError(null)} onRetry={fetchRecords} />

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Health Record</h2>
          <form onSubmit={handleAddRecord} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={newRecord.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Record title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={newRecord.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newRecord.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newRecord.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General</option>
                  <option value="medication">Medication</option>
                  <option value="appointment">Appointment</option>
                  <option value="test">Test</option>
                  <option value="symptom">Symptom</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Record
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {records.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No health records found.</p>
            <p className="text-gray-400">Add your first health record to get started.</p>
          </div>
        ) : (
          records.map((record) => (
            <div key={record.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{record.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(record.category)}`}>
                    {record.category}
                  </span>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete record"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              {record.description && (
                <p className="text-gray-600 mb-3">{record.description}</p>
              )}
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Date: {formatDate(record.date || record.created_at)}</span>
                <span>Created: {formatDate(record.created_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthRecords;