import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperationsModal = ({ isOpen, onClose, selectedProjects, onBulkOperation }) => {
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operationData, setOperationData] = useState({});
  const [confirmationText, setConfirmationText] = useState('');

  const operations = [
    {
      id: 'archive',
      name: 'Archive Projects',
      description: 'Move selected projects to archived status',
      icon: 'Archive',
      color: 'text-warning',
      requiresConfirmation: true,
      confirmationMessage: 'This will archive the selected projects. They will no longer appear in active project lists.'
    },
    {
      id: 'change-status',
      name: 'Change Status',
      description: 'Update the status of selected projects',
      icon: 'RefreshCw',
      color: 'text-primary',
      requiresConfirmation: false,
      fields: [
        {
          name: 'status',
          label: 'New Status',
          type: 'select',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'on-hold', label: 'On Hold' },
            { value: 'cancelled', label: 'Cancelled' }
          ]
        }
      ]
    },
    {
      id: 'update-billing',
      name: 'Update Billing Rates',
      description: 'Apply new billing rates to selected projects',
      icon: 'DollarSign',
      color: 'text-accent',
      requiresConfirmation: false,
      fields: [
        {
          name: 'billingRate',
          label: 'New Billing Rate',
          type: 'number',
          placeholder: '0.00',
          step: '0.01',
          min: '0'
        },
        {
          name: 'currency',
          label: 'Currency',
          type: 'select',
          options: [
            { value: 'USD', label: 'USD' },
            { value: 'EUR', label: 'EUR' },
            { value: 'GBP', label: 'GBP' }
          ]
        }
      ]
    },
    {
      id: 'reassign-team',
      name: 'Team Reassignment',
      description: 'Add or remove team members from selected projects',
      icon: 'Users',
      color: 'text-secondary',
      requiresConfirmation: false,
      fields: [
        {
          name: 'action',
          label: 'Action',
          type: 'select',
          options: [
            { value: 'add', label: 'Add Team Members' },
            { value: 'remove', label: 'Remove Team Members' }
          ]
        }
      ]
    },
    {
      id: 'delete',
      name: 'Delete Projects',
      description: 'Permanently delete selected projects and all associated data',
      icon: 'Trash2',
      color: 'text-error',
      requiresConfirmation: true,
      confirmationMessage: 'This action cannot be undone. All project data, time entries, and associated records will be permanently deleted.',
      dangerousOperation: true
    }
  ];

  const handleOperationChange = (operationId) => {
    setSelectedOperation(operationId);
    setOperationData({});
    setConfirmationText('');
  };

  const handleFieldChange = (fieldName, value) => {
    setOperationData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleExecute = () => {
    const operation = operations.find(op => op.id === selectedOperation);
    
    if (operation?.requiresConfirmation && operation.dangerousOperation) {
      if (confirmationText !== 'DELETE') {
        return;
      }
    }

    onBulkOperation(selectedOperation, selectedProjects, operationData);
  };

  const getSelectedOperation = () => {
    return operations.find(op => op.id === selectedOperation);
  };

  const canExecute = () => {
    const operation = getSelectedOperation();
    if (!operation) return false;

    if (operation.requiresConfirmation && operation.dangerousOperation) {
      return confirmationText === 'DELETE';
    }

    if (operation.fields) {
      return operation.fields.every(field => {
        if (field.required !== false) {
          return operationData[field.name] && operationData[field.name].toString().trim() !== '';
        }
        return true;
      });
    }

    return true;
  };

  if (!isOpen) return null;

  const selectedOp = getSelectedOperation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading-semibold text-text-primary">Bulk Operations</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Performing bulk operation on {selectedProjects.length} selected project(s)
          </p>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-8rem)]">
          {/* Operation Selection */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-3">
              Select Operation
            </label>
            <div className="space-y-2">
              {operations.map((operation) => (
                <div
                  key={operation.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors duration-150 ease-out ${
                    selectedOperation === operation.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                  onClick={() => handleOperationChange(operation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedOperation === operation.id ? 'bg-primary text-white' : 'bg-secondary-100'
                    }`}>
                      <Icon name={operation.icon} size={16} className={selectedOperation === operation.id ? 'text-white' : operation.color} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-body-medium text-text-primary">{operation.name}</h4>
                      <p className="text-text-secondary text-sm mt-1">{operation.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Configuration */}
          {selectedOp && selectedOp.fields && (
            <div className="space-y-4">
              <h4 className="font-body-medium text-text-primary">Configuration</h4>
              {selectedOp.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={operationData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select {field.label.toLowerCase()}</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={operationData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={field.placeholder}
                      step={field.step}
                      min={field.min}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Confirmation */}
          {selectedOp && selectedOp.requiresConfirmation && (
            <div className={`p-4 rounded-lg border ${
              selectedOp.dangerousOperation 
                ? 'bg-error-50 border-error-100' :'bg-warning-50 border-warning-100'
            }`}>
              <div className="flex items-start space-x-3">
                <Icon 
                  name={selectedOp.dangerousOperation ? "AlertTriangle" : "AlertCircle"} 
                  size={20} 
                  className={selectedOp.dangerousOperation ? "text-error" : "text-warning"} 
                />
                <div className="flex-1">
                  <h4 className={`font-body-medium ${
                    selectedOp.dangerousOperation ? 'text-error' : 'text-warning'
                  }`}>
                    {selectedOp.dangerousOperation ? 'Dangerous Operation' : 'Confirmation Required'}
                  </h4>
                  <p className="text-text-secondary text-sm mt-1">
                    {selectedOp.confirmationMessage}
                  </p>
                  
                  {selectedOp.dangerousOperation && (
                    <div className="mt-3">
                      <label className="block text-sm font-body-medium text-text-primary mb-1">
                        Type "DELETE" to confirm
                      </label>
                      <input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-error focus:border-transparent"
                        placeholder="DELETE"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary-50">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border text-text-secondary rounded-lg font-body-medium hover:bg-secondary-100 transition-colors duration-150 ease-out"
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              disabled={!canExecute()}
              className={`px-4 py-2 rounded-lg font-body-medium transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                canExecute()
                  ? selectedOp?.dangerousOperation
                    ? 'bg-error text-white hover:bg-red-600 focus:ring-error' :'bg-primary text-white hover:bg-primary-700 focus:ring-primary' :'bg-secondary-200 text-text-secondary cursor-not-allowed'
              }`}
            >
              {selectedOp?.dangerousOperation ? 'Delete Projects' : 'Execute Operation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsModal;