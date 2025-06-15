import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TaskManagement = ({ project, onProjectUpdate }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    name: '',
    estimation: '',
    category: '',
    status: 'pending'
  });

  const categories = [
    'Frontend',
    'Backend',
    'Design',
    'Development',
    'Testing',
    'Documentation',
    'Research',
    'Planning'
  ];

  const statuses = [
    { value: 'pending', label: 'Pending', color: 'text-text-secondary bg-secondary-100' },
    { value: 'in-progress', label: 'In Progress', color: 'text-warning bg-warning-50' },
    { value: 'completed', label: 'Completed', color: 'text-success bg-success-50' },
    { value: 'on-hold', label: 'On Hold', color: 'text-error bg-error-50' }
  ];

  const handleInputChange = (field, value) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTask = () => {
    if (!taskForm.name.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      name: taskForm.name,
      estimation: parseInt(taskForm.estimation) || 0,
      category: taskForm.category,
      status: taskForm.status
    };

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask]
    };

    onProjectUpdate(updatedProject);
    setTaskForm({ name: '', estimation: '', category: '', status: 'pending' });
    setShowAddTask(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setTaskForm({
      name: task.name,
      estimation: task.estimation.toString(),
      category: task.category,
      status: task.status
    });
  };

  const handleUpdateTask = () => {
    if (!taskForm.name.trim()) return;

    const updatedProject = {
      ...project,
      tasks: project.tasks.map(task =>
        task.id === editingTask
          ? {
              ...task,
              name: taskForm.name,
              estimation: parseInt(taskForm.estimation) || 0,
              category: taskForm.category,
              status: taskForm.status
            }
          : task
      )
    };

    onProjectUpdate(updatedProject);
    setEditingTask(null);
    setTaskForm({ name: '', estimation: '', category: '', status: 'pending' });
  };

  const handleDeleteTask = (taskId) => {
    const updatedProject = {
      ...project,
      tasks: project.tasks.filter(task => task.id !== taskId)
    };

    onProjectUpdate(updatedProject);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setTaskForm({ name: '', estimation: '', category: '', status: 'pending' });
  };

  const getStatusConfig = (status) => {
    return statuses.find(s => s.value === status) || statuses[0];
  };

  const getTotalEstimation = () => {
    return project.tasks.reduce((total, task) => total + task.estimation, 0);
  };

  const getCompletedEstimation = () => {
    return project.tasks
      .filter(task => task.status === 'completed')
      .reduce((total, task) => total + task.estimation, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading-medium text-text-primary">Task Management</h3>
          <p className="text-text-secondary text-sm mt-1">Manage project tasks and track progress</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Tasks</p>
              <p className="text-xl font-heading-semibold text-text-primary">{project.tasks.length}</p>
            </div>
            <Icon name="CheckSquare" size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Completed</p>
              <p className="text-xl font-heading-semibold text-text-primary">
                {project.tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Hours</p>
              <p className="text-xl font-heading-semibold text-text-primary">{getTotalEstimation()}</p>
            </div>
            <Icon name="Clock" size={20} className="text-accent" />
          </div>
        </div>
        
        <div className="bg-secondary-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Completed Hours</p>
              <p className="text-xl font-heading-semibold text-text-primary">{getCompletedEstimation()}</p>
            </div>
            <Icon name="Target" size={20} className="text-secondary" />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-secondary-50 rounded-lg">
        <div className="p-4 border-b border-border">
          <h4 className="font-body-medium text-text-primary">Tasks</h4>
        </div>
        
        <div className="divide-y divide-border">
          {project.tasks.map((task) => (
            <div key={task.id} className="p-4">
              {editingTask === task.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">Task Name</label>
                      <input
                        type="text"
                        value={taskForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter task name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">Estimation (hours)</label>
                      <input
                        type="number"
                        value={taskForm.estimation}
                        onChange={(e) => handleInputChange('estimation', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">Category</label>
                      <select
                        value={taskForm.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-1">Status</label>
                      <select
                        value={taskForm.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleUpdateTask}
                      className="px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 transition-colors duration-150 ease-out"
                    >
                      Update Task
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 border border-border text-text-secondary rounded-lg font-body-medium hover:bg-secondary-50 transition-colors duration-150 ease-out"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-body-medium text-text-primary">{task.name}</h5>
                      <span className={`px-2 py-1 text-xs font-body-medium rounded-full ${getStatusConfig(task.status).color}`}>
                        {getStatusConfig(task.status).label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span className="flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {task.estimation}h
                      </span>
                      {task.category && (
                        <span className="flex items-center">
                          <Icon name="Tag" size={14} className="mr-1" />
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-2 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
                      title="Edit task"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-150 ease-out"
                      title="Delete task"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {project.tasks.length === 0 && (
            <div className="p-8 text-center">
              <Icon name="CheckSquare" size={32} className="text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary">No tasks created yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
          <div className="bg-surface rounded-lg shadow-modal w-full max-w-lg mx-4">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading-medium text-text-primary">Add New Task</h3>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-body-medium text-text-primary mb-1">Task Name</label>
                <input
                  type="text"
                  value={taskForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter task name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">Estimation (hours)</label>
                  <input
                    type="number"
                    value={taskForm.estimation}
                    onChange={(e) => handleInputChange('estimation', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-1">Category</label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddTask(false)}
                  className="px-4 py-2 border border-border text-text-secondary rounded-lg font-body-medium hover:bg-secondary-50 transition-colors duration-150 ease-out"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 transition-colors duration-150 ease-out"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;