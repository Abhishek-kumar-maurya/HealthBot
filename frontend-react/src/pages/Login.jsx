import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    try {
      await login(formData);
      // Add a small delay to ensure token is properly set before navigation
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Login failed:', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    clearError();
    
    if (registerData.password !== registerData.confirmPassword) {
      // Handle password mismatch error
      return;
    }
    
    try {
      const { confirmPassword, ...submitData } = registerData;
      await register(submitData);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Registration failed:', error);
    }
  };

  const handleLoginChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Create your account' : 'Sign in to HealthBot'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegistering ? 'Or ' : 'Or '}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                clearError();
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isRegistering ? 'sign in to your existing account' : 'create a new account'}
            </button>
          </p>
        </div>

        <ErrorMessage error={error} onDismiss={clearError} />

        {!isRegistering ? (
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleLoginChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleLoginChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner size="small" text="" /> : 'Sign in'}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="reg-username" className="sr-only">
                  Username
                </label>
                <input
                  id="reg-username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="reg-email" className="sr-only">
                  Email
                </label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email address"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="sr-only">
                  Password
                </label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div>
                <label htmlFor="reg-confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="reg-confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>
            </div>

            {registerData.password && registerData.confirmPassword && 
             registerData.password !== registerData.confirmPassword && (
              <p className="text-red-600 text-sm">Passwords do not match</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading || (registerData.password !== registerData.confirmPassword)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner size="small" text="" /> : 'Create account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;