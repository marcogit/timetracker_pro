import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const WeeklyHoursChart = () => {
  // Mock weekly hours data
  const weeklyData = [
    { day: 'Mon', hours: 8.5, target: 8, overtime: 0.5 },
    { day: 'Tue', hours: 7.2, target: 8, overtime: 0 },
    { day: 'Wed', hours: 9.1, target: 8, overtime: 1.1 },
    { day: 'Thu', hours: 8.0, target: 8, overtime: 0 },
    { day: 'Fri', hours: 7.5, target: 8, overtime: 0 },
    { day: 'Sat', hours: 0, target: 0, overtime: 0 },
    { day: 'Sun', hours: 0, target: 0, overtime: 0 }
  ];

  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const targetHours = 40;
  const overtimeHours = weeklyData.reduce((sum, day) => sum + day.overtime, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
          <p className="font-body-medium text-text-primary text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-text-secondary text-xs">Hours:</span>
              <span className="font-data text-primary text-sm">{data.hours}h</span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-text-secondary text-xs">Target:</span>
              <span className="font-data text-text-secondary text-sm">{data.target}h</span>
            </div>
            {data.overtime > 0 && (
              <div className="flex items-center justify-between space-x-4">
                <span className="text-text-secondary text-xs">Overtime:</span>
                <span className="font-data text-warning text-sm">+{data.overtime}h</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { fill, payload, ...rest } = props;
    const hasOvertime = payload.overtime > 0;
    return (
      <Bar
        {...rest}
        fill={hasOvertime ? '#F59E0B' : '#2563EB'}
        radius={[4, 4, 0, 0]}
      />
    );
  };

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading-medium text-text-primary">Weekly Hours</h3>
            <p className="text-text-secondary text-sm mt-1">Your daily hour distribution</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150 ease-out">
              <Icon name="Calendar" size={16} />
            </button>
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-150 ease-out">
              <Icon name="Download" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-64 w-full" aria-label="Weekly Hours Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                domain={[0, 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-text-secondary text-xs">Regular Hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-text-secondary text-xs">Overtime</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-6 border-t border-border bg-secondary-50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-heading-semibold text-text-primary">{totalHours}h</p>
            <p className="text-text-secondary text-xs mt-1">Total Hours</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading-semibold text-text-primary">{targetHours}h</p>
            <p className="text-text-secondary text-xs mt-1">Target</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading-semibold text-warning">{overtimeHours}h</p>
            <p className="text-text-secondary text-xs mt-1">Overtime</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-xs">Weekly Progress</span>
            <span className="text-text-primary text-xs font-body-medium">
              {Math.round((totalHours / targetHours) * 100)}%
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min((totalHours / targetHours) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyHoursChart;