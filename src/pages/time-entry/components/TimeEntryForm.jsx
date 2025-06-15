import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimeEntryForm = ({ selectedDate, onDateChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: selectedDate,
    startTime: '',
    endTime: '',
    duration: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isTimerMode, setIsTimerMode] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStart, setTimerStart] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setFormData(prev => ({ ...prev, date: selectedDate }));
  }, [selectedDate]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timerStart) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - timerStart);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerStart]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate duration when start/end times change
      if (field === 'startTime' || field === 'endTime') {
        updated.duration = calculateDuration(
          field === 'startTime' ? value : prev.startTime,
          field === 'endTime' ? value : prev.endTime
        );
      }
      
      return updated;
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTimerToggle = () => {
    if (!isTimerRunning) {
      // Start timer
      setTimerStart(Date.now());
      setIsTimerRunning(true);
      setElapsedTime(0);
    } else {
      // Stop timer
      setIsTimerRunning(false);
      const totalSeconds = Math.floor(elapsedTime / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const duration = `${hours}:${minutes.toString().padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, duration }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isTimerMode && !formData.startTime) newErrors.startTime = 'Start time is required';
    if (!isTimerMode && !formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Validate time logic
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}:00`);
      const end = new Date(`2000-01-01T${formData.endTime}:00`);
      if (end <= start) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (action) => {
    if (!validateForm()) return;
    
    const entryData = {
      ...formData,
      action // 'save' or 'submit'
    };
    
    onSubmit(entryData);
    
    // Reset form
    setFormData({
      date: selectedDate,
      startTime: '',
      endTime: '',
      duration: '',
      description: ''
    });
    setErrors({});
    setIsTimerRunning(false);
    setElapsedTime(0);
  };

  return (
    <form className="space-y-6">
      {/* Date and Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, date: e.target.value }));
              onDateChange(e.target.value);
            }}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            Entry Mode
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsTimerMode(false)}
              className={`px-3 py-2 rounded-lg text-sm font-body-medium transition-colors duration-150 ease-out ${
                !isTimerMode
                  ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              Manual Entry
            </button>
            <button
              type="button"
              onClick={() => setIsTimerMode(true)}
              className={`px-3 py-2 rounded-lg text-sm font-body-medium transition-colors duration-150 ease-out ${
                isTimerMode
                  ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              Timer Mode
            </button>
          </div>
        </div>
      </div>

      {/* Time Entry Section */}
      {isTimerMode ? (
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="text-center">
            <div className="text-4xl font-data text-text-primary mb-4">
              {formatTime(elapsedTime)}
            </div>
            <button
              type="button"
              onClick={handleTimerToggle}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-body-medium transition-colors duration-150 ease-out ${
                isTimerRunning
                  ? 'bg-error text-white hover:bg-red-600' :'bg-accent text-white hover:bg-emerald-700'
              }`}
            >
              <Icon
                name={isTimerRunning ? 'Square' : 'Play'}
                size={20}
                className="mr-2"
              />
              {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Start Time *
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.startTime ? 'border-error' : 'border-border'
              }`}
            />
            {errors.startTime && (
              <p className="text-error text-sm mt-1">{errors.startTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              End Time *
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.endTime ? 'border-error' : 'border-border'
              }`}
            />
            {errors.endTime && (
              <p className="text-error text-sm mt-1">{errors.endTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Duration *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              placeholder="0:00"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.duration ? 'border-error' : 'border-border'
              }`}
            />
            {errors.duration && (
              <p className="text-error text-sm mt-1">{errors.duration}</p>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-body-medium text-text-primary mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your work or add notes..."
          rows={4}
          maxLength={500}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
            errors.description ? 'border-error' : 'border-border'
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && (
            <p className="text-error text-sm">{errors.description}</p>
          )}
          <p className="text-text-secondary text-sm ml-auto">
            {formData.description.length}/500
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => handleSubmit('save')}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-surface text-text-primary border border-border rounded-lg font-body-medium hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors duration-150 ease-out"
        >
          <Icon name="Save" size={16} className="mr-2" />
          Save & New
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('submit')}
          className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
        >
          <Icon name="Send" size={16} className="mr-2" />
          Save & Submit
        </button>
      </div>
    </form>
  );
};

export default TimeEntryForm;