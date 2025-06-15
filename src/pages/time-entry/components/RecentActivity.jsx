import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ timeEntries, projects }) => {
  const [editingEntry, setEditingEntry] = useState(null);

  const getProjectColor = (projectName) => {
    const project = projects.find(p => p.name === projectName);
    return project?.color || '#64748B';
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry.id);
  };

  const handleSave = (entryId) => {
    // Handle save logic here
    setEditingEntry(null);
  };

  const handleCancel = () => {
    setEditingEntry(null);
  };

  const handleDelete = (entryId) => {
    // Handle delete logic here
    console.log('Delete entry:', entryId);
  };

  const formatTime = (time) => {
    return time || '--:--';
  };

  if (timeEntries.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-medium text-text-primary">Today's Entries</h3>
          <Icon name="Activity" size={20} className="text-text-secondary" />
        </div>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Clock" size={24} className="text-text-secondary" />
          </div>
          <h4 className="text-text-primary font-body-medium mb-2">No time entries yet</h4>
          <p className="text-text-secondary text-sm">
            Start logging your time using the form above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-heading-medium text-text-primary">Today's Entries</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {timeEntries.length} {timeEntries.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
      </div>

      <div className="divide-y divide-border">
        {timeEntries.map((entry, index) => (
          <div key={entry.id} className="p-6 hover:bg-secondary-50 transition-colors duration-150 ease-out">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getProjectColor(entry.project) }}
                  />
                  <h4 className="font-body-medium text-text-primary">{entry.project}</h4>
                  <span className="text-sm text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">{entry.task}</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatTime(entry.startTime)} - {formatTime(entry.endTime)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Timer" size={14} />
                    <span className="font-data">{entry.duration}</span>
                  </div>
                  {entry.breakTime && entry.breakTime !== '0:00' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Coffee" size={14} />
                      <span>Break: {entry.breakTime}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {entry.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body-medium ${
                    entry.status === 'saved' ?'bg-success-100 text-success-700'
                      : entry.status === 'submitted' ?'bg-primary-100 text-primary-700' :'bg-secondary-100 text-text-secondary'
                  }`}>
                    <Icon
                      name={entry.status === 'saved' ? 'Save' : entry.status === 'submitted' ? 'Send' : 'Clock'}
                      size={12}
                      className="mr-1"
                    />
                    {entry.status === 'saved' ? 'Saved' : entry.status === 'submitted' ? 'Submitted' : 'Draft'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {editingEntry === entry.id ? (
                  <>
                    <button
                      onClick={() => handleSave(entry.id)}
                      className="p-2 text-success hover:bg-success-50 rounded-lg transition-colors duration-150 ease-out"
                      title="Save changes"
                    >
                      <Icon name="Check" size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-text-secondary hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
                      title="Cancel editing"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-text-secondary hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
                      title="Edit entry"
                    >
                      <Icon name="Edit2" size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-150 ease-out"
                      title="Delete entry"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {timeEntries.length > 3 && (
        <div className="p-4 border-t border-border bg-secondary-50">
          <button className="w-full text-center text-sm text-primary hover:text-primary-700 font-body-medium transition-colors duration-150 ease-out">
            View all entries for today
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;