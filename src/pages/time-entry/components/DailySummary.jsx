import React from 'react';
import Icon from '../../../components/AppIcon';

const DailySummary = ({ selectedDate, timeEntries, totalHours }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Daily Summary Card */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-medium text-text-primary">Daily Summary</h3>
          <Icon name="Calendar" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary mb-1">Selected Date</p>
            <p className="font-body-medium text-text-primary">{formatDate(selectedDate)}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-body-medium text-primary">Total Hours</span>
              </div>
              <p className="text-2xl font-heading-semibold text-primary">
                {totalHours.toFixed(1)}h
              </p>
            </div>
            
            <div className="bg-accent-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="FileText" size={16} className="text-accent" />
                <span className="text-sm font-body-medium text-accent">Entries</span>
              </div>
              <p className="text-2xl font-heading-semibold text-accent">
                {timeEntries.length}
              </p>
            </div>
          </div>
          
          {totalHours >= 8 && (
            <div className="bg-success-50 border border-success-100 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-body-medium text-success">
                  Daily target achieved!
                </span>
              </div>
            </div>
          )}
          
          {totalHours > 0 && totalHours < 8 && (
            <div className="bg-warning-50 border border-warning-100 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-body-medium text-warning">
                  {(8 - totalHours).toFixed(1)}h remaining to reach 8h target
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Time Tracking Tips */}
      <div className="bg-secondary-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} className="text-secondary" />
          <h4 className="text-sm font-body-medium text-text-primary">Tips</h4>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={12} className="mt-1 text-secondary" />
            <span>Use the timer for accurate tracking</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={12} className="mt-1 text-secondary" />
            <span>Log time daily for better records</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={12} className="mt-1 text-secondary" />
            <span>Take regular breaks to stay productive</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailySummary;