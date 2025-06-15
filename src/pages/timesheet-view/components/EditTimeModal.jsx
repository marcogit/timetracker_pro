import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EditTimeModal = ({ isOpen, onClose, entry, projects }) => {
  const [formData, setFormData] = useState({
    project: '',
    client: '',
    task: '',
    startTime: '',
    endTime: '',
    hours: '',
    description: '',
    billable: true,
    status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (entry) {
      setFormData({
        project: entry.project || '',
        client: entry.client || '',
        task: entry.task || '',
        startTime: entry.startTime || '',
        endTime: entry.endTime || '',
        hours: entry.hours?.toString() || '',
        description: entry.description || '',
        billable: entry.billable ?? true,
        status: entry.status || 'draft'
      });
    }
  }, [entry]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.project) newErrors.project = 'Project is required';
    if (!formData.task) newErrors.task = 'Task is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.hours) newErrors.hours = 'Hours is required';

    // Validate time logic
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    // Validate hours
    const hours = parseFloat(formData.hours);
    if (isNaN(hours) || hours <= 0 || hours > 24) {
      newErrors.hours = 'Hours must be between 0 and 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSaving(true);
    
    // Simulate save process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Saving time entry:', formData);
    
    setIsSaving(false);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const calculateHours = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}`);
      const end = new Date(`2000-01-01T${formData.endTime}`);
      if (end > start) {
        const diffMs = end - start;
        const hours = (diffMs / (1000 * 60 * 60)).toFixed(2);
        handleInputChange('hours', hours);
      }
    }
  };

  useEffect(() => {
    calculateHours();
  }, [formData.startTime, formData.endTime]);

  const tasks = [
    'Frontend Development',
    'Backend Development',
    'UI Design',
    'Bug Fixes',
    'Testing',
    'Code Review',
    'Documentation',
    'Meeting',
    'Research'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003 p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-heading-medium text-text-primary">
            {entry ? 'Edit Time Entry' : 'Add Time Entry'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project and Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Project <span className="text-error">*</span>
              </label>
              <select
                value={formData.project}
                onChange={(e) => {
                  handleInputChange('project', e.target.value);
                  const selectedProject = projects.find(p => p.name === e.target.value);
                  if (selectedProject) {
                    handleInputChange('client', selectedProject.client);
                  }
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.project ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.project && <p className="text-error text-xs mt-1">{errors.project}</p>}
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary-50"
                readOnly
              />
            </div>
          </div>

          {/* Task */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Task <span className="text-error">*</span>
            </label>
            <select
              value={formData.task}
              onChange={(e) => handleInputChange('task', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.task ? 'border-error' : 'border-border'
              }`}
            >
              <option value="">Select Task</option>
              {tasks.map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </select>
            {errors.task && <p className="text-error text-xs mt-1">{errors.task}</p>}
          </div>

          {/* Time and Hours */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Start Time <span className="text-error">*</span>
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.startTime ? 'border-error' : 'border-border'
                }`}
              />
              {errors.startTime && <p className="text-error text-xs mt-1">{errors.startTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                End Time <span className="text-error">*</span>
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.endTime ? 'border-error' : 'border-border'
                }`}
              />
              {errors.endTime && <p className="text-error text-xs mt-1">{errors.endTime}</p>}
            </div>

            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Hours <span className="text-error">*</span>
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="24"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.hours ? 'border-error' : 'border-border'
                }`}
              />
              {errors.hours && <p className="text-error text-xs mt-1">{errors.hours}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Describe what you worked on..."
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.billable}
                onChange={(e) => handleInputChange('billable', e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-text-primary">Billable time</span>
            </label>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-body-medium text-text-primary">Status:</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="Save" size={16} className="mr-2" />
                Save Entry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTimeModal;