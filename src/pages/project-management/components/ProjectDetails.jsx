import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import TeamAssignment from './TeamAssignment';
import TaskManagement from './TaskManagement';

const ProjectDetails = ({ project, clients, teamMembers, onProjectUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      name: project.name || '',
      description: project.description || '',
      client: project.client || '',
      billingRate: project.billingRate || 0,
      currency: project.currency || 'USD',
      status: project.status || 'active',
      budgetHours: project.budgetHours || 0
    });
    setIsEditing(false);
    setActiveTab('overview');
  }, [project]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Info' },
    { id: 'team', name: 'Team', icon: 'Users' },
    { id: 'tasks', name: 'Tasks', icon: 'CheckSquare' },
    { id: 'settings', name: 'Settings', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedProject = { ...project, ...formData };
    onProjectUpdate(updatedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: project.name || '',
      description: project.description || '',
      client: project.client || '',
      billingRate: project.billingRate || 0,
      currency: project.currency || 'USD',
      status: project.status || 'active',
      budgetHours: project.budgetHours || 0
    });
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50 border-success-100';
      case 'completed':
        return 'text-primary bg-primary-50 border-primary-100';
      case 'on-hold':
        return 'text-warning bg-warning-50 border-warning-100';
      case 'cancelled':
        return 'text-error bg-error-50 border-error-100';
      default:
        return 'text-text-secondary bg-secondary-100 border-secondary-200';
    }
  };

  const getProgressPercentage = () => {
    if (!project.budgetHours) return 0;
    return Math.min((project.totalHours / project.budgetHours) * 100, 100);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-xl font-heading-semibold text-text-primary bg-transparent border-b-2 border-primary focus:outline-none w-full"
            />
          ) : (
            <h2 className="text-xl font-heading-semibold text-text-primary">{project.name}</h2>
          )}
          <div className="flex items-center space-x-4 mt-2">
            <span className={`px-3 py-1 text-sm font-body-medium rounded-full border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className="text-text-secondary text-sm">Created {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-sm text-text-secondary border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 ease-out"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-150 ease-out"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
            >
              <Icon name="Edit" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Hours Logged</p>
              <p className="text-2xl font-heading-semibold text-text-primary">{project.totalHours}</p>
            </div>
            <Icon name="Clock" size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Budget Hours</p>
              <p className="text-2xl font-heading-semibold text-text-primary">{project.budgetHours}</p>
            </div>
            <Icon name="Target" size={24} className="text-accent" />
          </div>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Team Members</p>
              <p className="text-2xl font-heading-semibold text-text-primary">{project.teamMembers.length}</p>
            </div>
            <Icon name="Users" size={24} className="text-secondary" />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-secondary-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading-medium text-text-primary">Project Progress</h3>
          <span className="text-text-secondary text-sm">{Math.round(getProgressPercentage())}% Complete</span>
        </div>
        <div className="w-full bg-secondary-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ease-out ${
              getProgressPercentage() > 90 ? 'bg-warning' : getProgressPercentage() > 100 ? 'bg-error' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">Client</label>
            {isEditing ? (
              <select
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {clients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-secondary">{project.client}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">Billing Rate</label>
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={formData.billingRate}
                  onChange={(e) => handleInputChange('billingRate', parseFloat(e.target.value))}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  step="0.01"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            ) : (
              <p className="text-text-secondary">${project.billingRate.toFixed(2)} {project.currency}/hour</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">Status</label>
            {isEditing ? (
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <span className={`px-3 py-1 text-sm font-body-medium rounded-full border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">Budget Hours</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.budgetHours}
                onChange={(e) => handleInputChange('budgetHours', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            ) : (
              <p className="text-text-secondary">{project.budgetHours} hours</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-body-medium text-text-primary mb-2">Description</label>
        {isEditing ? (
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        ) : (
          <p className="text-text-secondary leading-relaxed">{project.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-body-medium text-sm transition-colors duration-150 ease-out ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'team' && (
          <TeamAssignment
            project={project}
            teamMembers={teamMembers}
            onProjectUpdate={onProjectUpdate}
          />
        )}
        {activeTab === 'tasks' && (
          <TaskManagement
            project={project}
            onProjectUpdate={onProjectUpdate}
          />
        )}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-error-50 border border-error-100 rounded-lg p-4">
              <h3 className="font-heading-medium text-error mb-2">Danger Zone</h3>
              <p className="text-text-secondary text-sm mb-4">These actions cannot be undone. Please proceed with caution.</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-error text-white rounded-lg font-body-medium hover:bg-red-600 transition-colors duration-150 ease-out">
                  Archive Project
                </button>
                <button className="px-4 py-2 border border-error text-error rounded-lg font-body-medium hover:bg-error-50 transition-colors duration-150 ease-out">
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;