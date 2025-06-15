import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mb-6">
            <Icon name="FileQuestion" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-heading-semibold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading-medium text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to tracking your time!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Go to Dashboard
          </button>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-body-medium hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-150 ease-out"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/time-entry')}
              className="text-sm text-primary hover:text-primary-700 transition-colors duration-150 ease-out"
            >
              Time Entry
            </button>
            <button
              onClick={() => navigate('/timesheet-view')}
              className="text-sm text-primary hover:text-primary-700 transition-colors duration-150 ease-out"
            >
              Timesheet View
            </button>
            <button
              onClick={() => navigate('/project-management')}
              className="text-sm text-primary hover:text-primary-700 transition-colors duration-150 ease-out"
            >
              Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;