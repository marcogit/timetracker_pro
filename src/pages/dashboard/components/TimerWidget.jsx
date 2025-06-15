import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimerWidget = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [description, setDescription] = useState('');

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
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSession(0);
    setDescription('');
  };

  const handleSaveEntry = () => {
    if (currentSession > 0) {
      // Mock save functionality
      console.log('Saving time entry:', {
        duration: currentSession,
        description,
        timestamp: new Date()
      });
      handleReset();
      alert('Time entry saved successfully!');
    }
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

        {/* Description Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-heading-medium text-text-primary mb-4">Current Activity</h3>
            
            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you working on?"
                rows={4}
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

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