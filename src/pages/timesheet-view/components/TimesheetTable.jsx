import React from 'react';
import Icon from '../../../components/AppIcon';

const TimesheetTable = ({ data, selectedEntries, onSelectionChange, onEdit, onDelete }) => {
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(data.map(entry => entry.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectEntry = (entryId, checked) => {
    if (checked) {
      onSelectionChange([...selectedEntries, entryId]);
    } else {
      onSelectionChange(selectedEntries.filter(id => id !== entryId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success-50';
      case 'pending':
        return 'text-warning bg-warning-50';
      case 'draft':
        return 'text-text-secondary bg-secondary-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary-50 border-b border-border">
          <tr>
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={selectedEntries.length === data.length && data.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Date</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Project</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Task</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Time</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Hours</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Status</th>
            <th className="text-left px-4 py-3 text-sm font-heading-medium text-text-primary">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((entry) => (
            <tr key={entry.id} className="hover:bg-secondary-50 transition-colors duration-150 ease-out">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  checked={selectedEntries.includes(entry.id)}
                  onChange={(e) => handleSelectEntry(entry.id, e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-text-primary font-body-medium">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-text-primary font-body-medium">{entry.project}</div>
                <div className="text-xs text-text-secondary">{entry.client}</div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-text-primary">{entry.task}</div>
                {entry.description && (
                  <div className="text-xs text-text-secondary mt-1 max-w-xs truncate" title={entry.description}>
                    {entry.description}
                  </div>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-text-primary">
                  {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <span className="text-sm font-body-medium text-text-primary">{entry.hours}h</span>
                  {entry.billable && (
                    <Icon name="DollarSign" size={14} className="ml-2 text-success" title="Billable" />
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(entry.status)}`}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(entry)}
                    className="p-1 rounded hover:bg-secondary-100 transition-colors duration-150 ease-out"
                    title="Edit entry"
                  >
                    <Icon name="Edit2" size={16} className="text-text-secondary hover:text-primary" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="p-1 rounded hover:bg-error-50 transition-colors duration-150 ease-out"
                    title="Delete entry"
                  >
                    <Icon name="Trash2" size={16} className="text-text-secondary hover:text-error" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading-medium text-text-primary mb-2">No time entries found</h3>
          <p className="text-text-secondary">Start tracking your time to see entries here.</p>
        </div>
      )}
    </div>
  );
};

export default TimesheetTable;