import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CreateProjectModal = ({ isOpen, onClose, clients, teamMembers, onProjectCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    billingRate: '',
    currency: 'USD',
    budgetHours: '',
    status: 'active',
    selectedTeamMembers: []
  });

  const [errors, setErrors] = useState({});

  const currencies = ['USD', 'EUR', 'GBP'];
  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'planning', label: 'Planning' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTeamMemberToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      selectedTeamMembers: prev.selectedTeamMembers.includes(memberId)
        ? prev.selectedTeamMembers.filter(id => id !== memberId)
        : [...prev.selectedTeamMembers, memberId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.client) {
      newErrors.client = 'Client selection is required';
    }

    if (!formData.billingRate || parseFloat(formData.billingRate) <= 0) {
      newErrors.billingRate = 'Valid billing rate is required';
    }

    if (!formData.budgetHours || parseInt(formData.budgetHours) <= 0) {
      newErrors.budgetHours = 'Valid budget hours is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedMembers = teamMembers
      .filter(member => formData.selectedTeamMembers.includes(member.id))
      .map(member => ({ ...member, active: true }));

    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      client: formData.client,
      billingRate: parseFloat(formData.billingRate),
      currency: formData.currency,
      budgetHours: parseInt(formData.budgetHours),
      status: formData.status,
      teamMembers: selectedMembers,
      tasks: [],
      createdAt: new Date().toISOString().split('T')[0],
      totalHours: 0,
      children: []
    };

    onProjectCreate(newProject);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      client: '',
      billingRate: '',
      currency: 'USD',
      budgetHours: '',
      status: 'active',
      selectedTeamMembers: []
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading-semibold text-text-primary">Create New Project</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-heading-medium text-text-primary">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Enter project name"
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                    errors.description ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Describe the project objectives and scope"
                />
                {errors.description && <p className="text-error text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    Client *
                  </label>
                  <select
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.client ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select client</option>
                    {clients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                  {errors.client && <p className="text-error text-sm mt-1">{errors.client}</p>}
                </div>

                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="font-heading-medium text-text-primary">Financial Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    Billing Rate *
                  </label>
                  <input
                    type="number"
                    value={formData.billingRate}
                    onChange={(e) => handleInputChange('billingRate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.billingRate ? 'border-error' : 'border-border'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  {errors.billingRate && <p className="text-error text-sm mt-1">{errors.billingRate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-1">
                  Budget Hours *
                </label>
                <input
                  type="number"
                  value={formData.budgetHours}
                  onChange={(e) => handleInputChange('budgetHours', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.budgetHours ? 'border-error' : 'border-border'
                  }`}
                  placeholder="0"
                  min="1"
                />
                {errors.budgetHours && <p className="text-error text-sm mt-1">{errors.budgetHours}</p>}
              </div>
            </div>

            {/* Team Assignment */}
            <div className="space-y-4">
              <h3 className="font-heading-medium text-text-primary">Team Assignment</h3>
              <p className="text-text-secondary text-sm">Select team members to assign to this project</p>
              
              <div className="max-h-48 overflow-y-auto border border-border rounded-lg">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center p-3 hover:bg-secondary-50 transition-colors duration-150 ease-out">
                    <input
                      type="checkbox"
                      id={`member-${member.id}`}
                      checked={formData.selectedTeamMembers.includes(member.id)}
                      onChange={() => handleTeamMemberToggle(member.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor={`member-${member.id}`} className="ml-3 flex items-center space-x-3 flex-1 cursor-pointer">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-heading-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-body-medium text-text-primary">{member.name}</p>
                        <p className="text-text-secondary text-sm">{member.role}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              
              {formData.selectedTeamMembers.length > 0 && (
                <p className="text-primary text-sm">
                  {formData.selectedTeamMembers.length} team member(s) selected
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-secondary-50">
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg font-body-medium hover:bg-secondary-100 transition-colors duration-150 ease-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
              >
                Create Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;