import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  // Mock favorite projects data
  const favoriteProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'TechCorp',
      color: '#2563EB',
      lastUsed: '2 hours ago',
      defaultTask: 'Frontend Development'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      color: '#059669',
      lastUsed: 'Yesterday',
      defaultTask: 'UI/UX Design'
    },
    {
      id: 3,
      name: 'Database Migration',
      client: 'Enterprise Inc',
      color: '#DC2626',
      lastUsed: '3 days ago',
      defaultTask: 'Testing & QA'
    }
  ];

  const quickActions = [
    {
      name: 'New Time Entry',
      description: 'Log time manually',
      icon: 'Plus',
      color: 'primary',
      action: () => navigate('/time-entry')
    },
    {
      name: 'View Timesheet',
      description: 'Review your hours',
      icon: 'Calendar',
      color: 'accent',
      action: () => navigate('/timesheet-view')
    },
    {
      name: 'Take Break',
      description: 'Start break timer',
      icon: 'Coffee',
      color: 'warning',
      action: () => console.log('Starting break timer...')
    }
  ];

  const handleQuickStart = (project) => {
    // Mock quick start functionality
    console.log('Quick starting timer for:', project.name, '-', project.defaultTask);
    alert(`Started timer for ${project.name} - ${project.defaultTask}`);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 hover:bg-primary-100 text-primary border-primary-200',
      accent: 'bg-accent-50 hover:bg-accent-100 text-accent border-accent-200',
      warning: 'bg-warning-50 hover:bg-warning-100 text-warning border-warning-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading-medium text-text-primary">Quick Actions</h3>
          <p className="text-text-secondary text-sm mt-1">Common tasks and shortcuts</p>
        </div>

        <div className="p-6 space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`w-full flex items-center p-4 rounded-lg border transition-all duration-150 ease-out ${getColorClasses(action.color)}`}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Icon name={action.icon} size={20} />
                <div className="text-left">
                  <p className="font-body-medium text-sm">{action.name}</p>
                  <p className="text-xs opacity-75">{action.description}</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-50" />
            </button>
          ))}
        </div>
      </div>

      {/* Favorite Projects */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-heading-medium text-text-primary">Favorite Projects</h3>
              <p className="text-text-secondary text-sm mt-1">Quick start your common projects</p>
            </div>
            <button className="text-text-secondary hover:text-primary transition-colors duration-150 ease-out">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {favoriteProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: project.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="font-body-medium text-text-primary text-sm truncate">
                    {project.name}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-text-secondary text-xs truncate">
                      {project.client}
                    </span>
                    <span className="text-text-secondary text-xs">•</span>
                    <span className="text-text-secondary text-xs">
                      {project.lastUsed}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleQuickStart(project)}
                className="flex items-center justify-center w-8 h-8 bg-primary hover:bg-primary-700 text-white rounded-lg transition-colors duration-150 ease-out"
                title={`Quick start ${project.name}`}
              >
                <Icon name="Play" size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button className="w-full text-sm font-body-medium text-primary hover:text-primary-700 transition-colors duration-150 ease-out">
            Manage Favorites
          </button>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading-medium text-text-primary">Activity Summary</h3>
          <p className="text-text-secondary text-sm mt-1">Your recent tracking activity</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success-50 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              <div>
                <p className="font-body-medium text-text-primary text-sm">Entries Approved</p>
                <p className="text-text-secondary text-xs">Last 7 days</p>
              </div>
            </div>
            <span className="text-lg font-heading-semibold text-text-primary">12</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning-50 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={16} className="text-warning" />
              </div>
              <div>
                <p className="font-body-medium text-text-primary text-sm">Pending Review</p>
                <p className="text-text-secondary text-xs">Awaiting approval</p>
              </div>
            </div>
            <span className="text-lg font-heading-semibold text-text-primary">3</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-body-medium text-text-primary text-sm">Goal Progress</p>
                <p className="text-text-secondary text-xs">Weekly target</p>
              </div>
            </div>
            <span className="text-lg font-heading-semibold text-text-primary">95%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;