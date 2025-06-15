import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkEntryModal = ({ isOpen, onClose, projects, tasks, onSubmit }) => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      project: '',
      task: '',
      startTime: '',
      endTime: '',
      duration: '',
      description: ''
    }
  ]);

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);
    const diff = endTime - startTime;
    if (diff <= 0) return '';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleEntryChange = (id, field, value) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        
        // Auto-calculate duration when start/end times change
        if (field === 'startTime' || field === 'endTime') {
          updated.duration = calculateDuration(
            field === 'startTime' ? value : entry.startTime,
            field === 'endTime' ? value : entry.endTime
          );
        }
        
        return updated;
      }
      return entry;
    }));
  };

  const addEntry = () => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      project: '',
      task: '',
      startTime: '',
      endTime: '',
      duration: '',
      description: ''
    };
    setEntries(prev => [...prev, newEntry]);
  };

  const removeEntry = (id) => {
    if (entries.length > 1) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleSubmit = () => {
    const validEntries = entries.filter(entry => 
      entry.project && entry.task && entry.duration && entry.description.trim()
    );
    
    if (validEntries.length === 0) {
      alert('Please fill in at least one complete entry');
      return;
    }
    
    const formattedEntries = validEntries.map(entry => {
      const selectedProject = projects.find(p => p.id === parseInt(entry.project));
      return {
        ...entry,
        project: selectedProject?.name || '',
        projectId: entry.project
      };
    });
    
    onSubmit(formattedEntries);
  };

  const getAvailableTasks = (projectId) => {
    return projectId ? tasks[projectId] || [] : [];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1003 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading-semibold text-text-primary">Bulk Time Entry</h2>
            <p className="text-text-secondary text-sm mt-1">Add multiple time entries at once</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="bg-secondary-50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-body-medium text-text-primary">Entry #{index + 1}</h3>
                  {entries.length > 1 && (
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="p-1 text-error hover:bg-error-50 rounded transition-colors duration-150 ease-out"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={entry.date}
                      onChange={(e) => handleEntryChange(entry.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      Project
                    </label>
                    <select
                      value={entry.project}
                      onChange={(e) => handleEntryChange(entry.id, 'project', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      Task
                    </label>
                    <select
                      value={entry.task}
                      onChange={(e) => handleEntryChange(entry.id, 'task', e.target.value)}
                      disabled={!entry.project}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-secondary-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select task</option>
                      {getAvailableTasks(entry.project).map(task => (
                        <option key={task} value={task}>
                          {task}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={entry.duration}
                      onChange={(e) => handleEntryChange(entry.id, 'duration', e.target.value)}
                      placeholder="0:00"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={entry.startTime}
                      onChange={(e) => handleEntryChange(entry.id, 'startTime', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={entry.endTime}
                      onChange={(e) => handleEntryChange(entry.id, 'endTime', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">
                    Description
                  </label>
                  <textarea
                    value={entry.description}
                    onChange={(e) => handleEntryChange(entry.id, 'description', e.target.value)}
                    placeholder="Describe the work performed..."
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addEntry}
            className="w-full mt-4 p-4 border-2 border-dashed border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-50 transition-all duration-150 ease-out"
          >
            <Icon name="Plus" size={20} className="mx-auto mb-2" />
            <span className="block text-sm font-body-medium">Add Another Entry</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} ready to submit
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Save All Entries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEntryModal;