import React from 'react';
import Icon from '../../../components/AppIcon';

const DailySummary = ({ selectedDate, timeEntries, projects, totalHours }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProjectAllocation = () => {
    const allocation = {};
    timeEntries.forEach(entry => {
      const project = projects.find(p => p.name === entry.project);
      if (project) {
        const [hours, minutes] = entry.duration.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        
        if (!allocation[project.name]) {
          allocation[project.name] = {
            name: project.name,
            color: project.color,
            minutes: 0,
            entries: 0
          };
        }
        allocation[project.name].minutes += totalMinutes;
        allocation[project.name].entries += 1;
      }
    });
    
    return Object.values(allocation).map(project => ({
      ...project,
      hours: Math.floor(project.minutes / 60),
      remainingMinutes: project.minutes % 60,
      percentage: totalHours > 0 ? (project.minutes / (totalHours * 60)) * 100 : 0
    }));
  };

  const projectAllocation = getProjectAllocation();

  const recentProjectTasks = [
    { project: 'Website Redesign', task: 'Frontend Development', lastUsed: '2 hours ago' },
    { project: 'Mobile App Development', task: 'API Integration', lastUsed: '1 day ago' },
    { project: 'Database Migration', task: 'Data Analysis', lastUsed: '2 days ago' },
    { project: 'API Integration', task: 'Documentation', lastUsed: '3 days ago' },
    { project: 'Security Audit', task: 'Vulnerability Assessment', lastUsed: '1 week ago' }
  ];

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

      {/* Project Allocation */}
      {projectAllocation.length > 0 && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading-medium text-text-primary">Project Allocation</h3>
            <Icon name="PieChart" size={20} className="text-text-secondary" />
          </div>
          
          <div className="space-y-3">
            {projectAllocation.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm font-body-medium text-text-primary">
                      {project.name}
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {project.hours}:{project.remainingMinutes.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="w-full bg-secondary-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300 ease-out"
                    style={{
                      backgroundColor: project.color,
                      width: `${project.percentage}%`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>{project.entries} {project.entries === 1 ? 'entry' : 'entries'}</span>
                  <span>{project.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Used Project/Task Combinations */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-medium text-text-primary">Quick Select</h3>
          <Icon name="Zap" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-2">
          {recentProjectTasks.slice(0, 5).map((item, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-150 ease-out group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-body-medium text-text-primary group-hover:text-primary">
                    {item.project}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {item.task}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">
                    {item.lastUsed}
                  </span>
                  <Icon name="ChevronRight" size={14} className="text-text-secondary group-hover:text-primary" />
                </div>
              </div>
            </button>
          ))}
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
            <span>Use templates for recurring tasks</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={12} className="mt-1 text-secondary" />
            <span>Log time daily for accuracy</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Dot" size={12} className="mt-1 text-secondary" />
            <span>Include detailed descriptions</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailySummary;