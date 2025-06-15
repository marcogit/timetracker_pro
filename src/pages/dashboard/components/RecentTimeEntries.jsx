import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentTimeEntries = () => {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editDuration, setEditDuration] = useState('');

  // Mock recent time entries data
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      project: 'Website Redesign',
      task: 'Frontend Development',
      duration: '2:30:00',
      durationSeconds: 9000,
      status: 'approved',
      date: '2024-01-15',
      client: 'TechCorp',
      color: '#2563EB'
    },
    {
      id: 2,
      project: 'Mobile App Development',
      task: 'UI/UX Design',
      duration: '1:45:00',
      durationSeconds: 6300,
      status: 'pending',
      date: '2024-01-15',
      client: 'StartupXYZ',
      color: '#059669'
    },
    {
      id: 3,
      project: 'Database Migration',
      task: 'Testing & QA',
      duration: '3:15:00',
      durationSeconds: 11700,
      status: 'approved',
      date: '2024-01-14',
      client: 'Enterprise Inc',
      color: '#DC2626'
    },
    {
      id: 4,
      project: 'API Integration',
      task: 'Backend Development',
      duration: '2:00:00',
      durationSeconds: 7200,
      status: 'rejected',
      date: '2024-01-14',
      client: 'CloudTech',
      color: '#7C3AED'
    },
    {
      id: 5,
      project: 'Website Redesign',
      task: 'Documentation',
      duration: '1:20:00',
      durationSeconds: 4800,
      status: 'pending',
      date: '2024-01-13',
      client: 'TechCorp',
      color: '#2563EB'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'pending':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'rejected':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-text-secondary" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleEditClick = (entry) => {
    setEditingEntry(entry.id);
    setEditDuration(entry.duration);
  };

  const handleSaveEdit = (entryId) => {
    // Mock save functionality
    setTimeEntries(entries => 
      entries.map(entry => 
        entry.id === entryId 
          ? { ...entry, duration: editDuration, status: 'pending' }
          : entry
      )
    );
    setEditingEntry(null);
    setEditDuration('');
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setEditDuration('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading-medium text-text-primary">Recent Time Entries</h3>
            <p className="text-text-secondary text-sm mt-1">Your latest logged hours</p>
          </div>
          <button className="flex items-center px-3 py-2 text-sm font-body-medium text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150 ease-out">
            <Icon name="Plus" size={16} className="mr-1" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="divide-y divide-border">
        {timeEntries.map((entry) => (
          <div key={entry.id} className="p-4 hover:bg-secondary-50 transition-colors duration-150 ease-out">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {/* Project Color Indicator */}
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                ></div>

                {/* Project & Task Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-body-medium text-text-primary text-sm truncate">
                      {entry.project}
                    </h4>
                    <span className="text-text-secondary text-xs">•</span>
                    <span className="text-text-secondary text-xs truncate">
                      {entry.client}
                    </span>
                  </div>
                  <p className="text-text-secondary text-xs mt-1 truncate">
                    {entry.task}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center space-x-2">
                  {editingEntry === entry.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editDuration}
                        onChange={(e) => setEditDuration(e.target.value)}
                        className="w-20 px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="0:00:00"
                      />
                      <button
                        onClick={() => handleSaveEdit(entry.id)}
                        className="p-1 text-success hover:bg-success-50 rounded"
                      >
                        <Icon name="Check" size={14} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 text-error hover:bg-error-50 rounded"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-data text-text-primary text-sm">
                        {entry.duration}
                      </span>
                      <button
                        onClick={() => handleEditClick(entry)}
                        className="p-1 text-text-secondary hover:text-primary hover:bg-primary-50 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"
                      >
                        <Icon name="Edit2" size={14} />
                      </button>
                    </>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  {getStatusIcon(entry.status)}
                  <span className="text-xs font-body-medium text-text-secondary">
                    {getStatusText(entry.status)}
                  </span>
                </div>

                {/* Date */}
                <div className="text-text-secondary text-xs">
                  {formatDate(entry.date)}
                </div>
              </div>

              {/* Actions Menu */}
              <div className="ml-4">
                <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150 ease-out">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-secondary-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {timeEntries.length} recent entries
          </div>
          <button className="text-sm font-body-medium text-primary hover:text-primary-700 transition-colors duration-150 ease-out">
            View All Entries
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTimeEntries;