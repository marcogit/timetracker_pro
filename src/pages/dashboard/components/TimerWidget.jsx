import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimerWidget = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock projects data
  const projects = [
    { id: 1, name: 'Website Redesign', color: '#2563EB', client: 'TechCorp' },
    { id: 2, name: 'Mobile App Development', color: '#059669', client: 'StartupXYZ' },
    { id: 3, name: 'Database Migration', color: '#DC2626', client: 'Enterprise Inc' },
    { id: 4, name: 'API Integration', color: '#7C3AED', client: 'CloudTech' }
  ];

  const tasks = [
    { id: 1, name: 'Frontend Development', projectId: 1 },
    { id: 2, name: 'Backend Development', projectId: 1 },
    { id: 3, name: 'UI/UX Design', projectId: 2 },
    { id: 4, name: 'Testing & QA', projectId: 3 },
    { id: 5, name: 'Documentation', projectId: 4 }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentSession(seconds => seconds + 1);
      }, 1000);
    } else if (!isRunning && currentSession !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentSession]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    if (!selectedProject || !selectedTask) {
      alert('Please select a project and task before starting the timer.');
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSession(0);
  };

  const handleSaveEntry = () => {
    if (currentSession > 0) {
      // Mock save functionality
      console.log('Saving time entry:', {
        project: selectedProject,
        task: selectedTask,
        duration: currentSession,
        timestamp: new Date()
      });
      handleReset();
      alert('Time entry saved successfully!');
    }
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => task.projectId === selectedProject?.id);
  };

  const todayTotal = 27000; // 7.5 hours in seconds

  return (
    <div className="bg-surface rounded-xl border border-border p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer Section */}
        <div className="lg:col-span-2">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading-semibold text-text-primary mb-2">Time Tracker</h2>
            <p className="text-text-secondary">Track your work hours in real-time</p>
          </div>

          {/* Current Session Timer */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full mb-6 relative">
              <div className="text-4xl font-heading-bold text-primary">
                {formatTime(currentSession)}
              </div>
              {isRunning && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleStartStop}
                className={`flex items-center justify-center w-16 h-16 rounded-full font-heading-medium text-white transition-all duration-200 ease-out ${
                  isRunning 
                    ? 'bg-error hover:bg-red-600 shadow-lg' 
                    : 'bg-primary hover:bg-primary-700 shadow-lg'
                }`}
                disabled={!selectedProject || !selectedTask}
              >
                <Icon 
                  name={isRunning ? 'Pause' : 'Play'} 
                  size={24} 
                  className="text-white" 
                />
              </button>

              <button
                onClick={handleReset}
                className="flex items-center justify-center w-12 h-12 bg-secondary-100 hover:bg-secondary-200 rounded-full transition-colors duration-150 ease-out"
                disabled={currentSession === 0}
              >
                <Icon name="RotateCcw" size={20} className="text-text-secondary" />
              </button>

              <button
                onClick={handleSaveEntry}
                className="flex items-center justify-center w-12 h-12 bg-accent-100 hover:bg-accent-200 rounded-full transition-colors duration-150 ease-out"
                disabled={currentSession === 0}
              >
                <Icon name="Save" size={20} className="text-accent" />
              </button>
            </div>
          </div>

          {/* Today's Total */}
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Today's Total</p>
            <p className="text-2xl font-heading-semibold text-text-primary">{formatTime(todayTotal)}</p>
          </div>
        </div>

        {/* Project & Task Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading-medium text-text-primary mb-4">Current Activity</h3>
            
            {/* Project Selection */}
            <div className="mb-4">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Project
              </label>
              <div className="relative">
                <select
                  value={selectedProject?.id || ''}
                  onChange={(e) => {
                    const project = projects.find(p => p.id === parseInt(e.target.value));
                    setSelectedProject(project);
                    setSelectedTask(null);
                  }}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  <option value="">Select a project...</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} - {project.client}
                    </option>
                  ))}
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={20} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
                />
              </div>
            </div>

            {/* Task Selection */}
            <div className="mb-6">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Task
              </label>
              <div className="relative">
                <select
                  value={selectedTask?.id || ''}
                  onChange={(e) => {
                    const task = tasks.find(t => t.id === parseInt(e.target.value));
                    setSelectedTask(task);
                  }}
                  disabled={!selectedProject}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none disabled:bg-secondary-50 disabled:text-text-secondary"
                >
                  <option value="">Select a task...</option>
                  {getFilteredTasks().map(task => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={20} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
                />
              </div>
            </div>

            {/* Current Selection Display */}
            {selectedProject && selectedTask && (
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedProject.color }}
                  ></div>
                  <div>
                    <p className="font-body-medium text-text-primary text-sm">
                      {selectedProject.name}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {selectedTask.name} • {selectedProject.client}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Break Button */}
          <div className="pt-4 border-t border-border">
            <button className="w-full flex items-center justify-center px-4 py-3 bg-warning-50 hover:bg-warning-100 border border-warning-200 rounded-lg transition-colors duration-150 ease-out">
              <Icon name="Coffee" size={20} className="text-warning mr-2" />
              <span className="font-body-medium text-warning">Take a Break</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerWidget;