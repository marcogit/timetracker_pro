import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'admin@timetracker.com', password: 'admin123', role: 'admin' },
    { email: 'manager@timetracker.com', password: 'manager123', role: 'manager' },
    { email: 'employee@timetracker.com', password: 'employee123', role: 'employee' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const validCredential = mockCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (validCredential) {
        // Store user data in localStorage for mock authentication
        localStorage.setItem('timetracker_user', JSON.stringify({
          email: validCredential.email,
          role: validCredential.role,
          name: validCredential.email.split('@')[0].charAt(0).toUpperCase() + validCredential.email.split('@')[0].slice(1),
          isAuthenticated: true
        }));

        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please try: admin@timetracker.com / admin123, manager@timetracker.com / manager123, or employee@timetracker.com / employee123'
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-50"></div>
      
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <Icon name="Timer" size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading-semibold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to your TimeTracker Pro account
            </p>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-error-50 border border-error-100 rounded-lg">
              <div className="flex items-start">
                <Icon name="AlertCircle" size={20} className="text-error mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-error text-sm">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-body-medium text-text-primary mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-150 ease-out ${
                    errors.email 
                      ? 'border-error bg-error-50' :'border-border bg-surface hover:border-secondary-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <Icon 
                  name="Mail" 
                  size={20} 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    errors.email ? 'text-error' : 'text-text-secondary'
                  }`} 
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-body-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-150 ease-out ${
                    errors.password 
                      ? 'border-error bg-error-50' :'border-border bg-surface hover:border-secondary-300'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={20} 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    errors.password ? 'text-error' : 'text-text-secondary'
                  }`} 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
                  disabled={isLoading}
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-error flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  disabled={isLoading}
                />
                <span className="ml-2 text-sm text-text-secondary">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary-700 transition-colors duration-150 ease-out"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-secondary-50 rounded-lg">
            <h3 className="text-sm font-body-medium text-text-primary mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-xs text-text-secondary">
              <p><strong>Admin:</strong> admin@timetracker.com / admin123</p>
              <p><strong>Manager:</strong> manager@timetracker.com / manager123</p>
              <p><strong>Employee:</strong> employee@timetracker.com / employee123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} TimeTracker Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;