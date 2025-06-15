import React from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyGrid = ({ data, selectedDate, onEdit }) => {
  // Get start of week (Sunday)
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  // Group data by project and date
  const projects = [...new Set(data.map(entry => entry.project))];
  const groupedData = {};

  projects.forEach(project => {
    groupedData[project] = {};
    weekDays.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      groupedData[project][dateStr] = data.filter(
        entry => entry.project === project && entry.date === dateStr
      );
    });
  });

  const getTotalHoursForDay = (day) => {
    const dateStr = day.toISOString().split('T')[0];
    return data
      .filter(entry => entry.date === dateStr)
      .reduce((sum, entry) => sum + entry.hours, 0);
  };

  const getTotalHoursForProject = (project) => {
    return data
      .filter(entry => entry.project === project)
      .reduce((sum, entry) => sum + entry.hours, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success-100 border-success-200';
      case 'pending':
        return 'bg-warning-100 border-warning-200';
      case 'draft':
        return 'bg-secondary-100 border-secondary-200';
      default:
        return 'bg-secondary-100 border-secondary-200';
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-heading-medium text-text-primary w-48">Project</th>
              {weekDays.map((day, index) => (
                <th key={index} className="text-center py-3 px-2 font-heading-medium text-text-primary min-w-32">
                  <div className="text-sm">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-xs text-text-secondary">
                    {day.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                  </div>
                </th>
              ))}
              <th className="text-center py-3 px-4 font-heading-medium text-text-primary w-20">Total</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, projectIndex) => (
              <tr key={projectIndex} className="border-b border-border hover:bg-secondary-50 transition-colors duration-150 ease-out">
                <td className="py-4 px-4">
                  <div className="font-body-medium text-text-primary">{project}</div>
                  <div className="text-xs text-text-secondary">
                    {data.find(entry => entry.project === project)?.client}
                  </div>
                </td>
                {weekDays.map((day, dayIndex) => {
                  const dateStr = day.toISOString().split('T')[0];
                  const dayEntries = groupedData[project][dateStr] || [];
                  const dayTotal = dayEntries.reduce((sum, entry) => sum + entry.hours, 0);

                  return (
                    <td key={dayIndex} className="py-2 px-2 text-center">
                      {dayEntries.length > 0 ? (
                        <div className="space-y-1">
                          {dayEntries.map((entry, entryIndex) => (
                            <div
                              key={entryIndex}
                              className={`p-2 rounded border cursor-pointer hover:shadow-sm transition-all duration-150 ease-out ${getStatusColor(entry.status)}`}
                              onClick={() => onEdit(entry)}
                              title={`${entry.task} - ${entry.hours}h (${entry.status})`}
                            >
                              <div className="text-xs font-body-medium">{entry.hours}h</div>
                              <div className="text-xs text-text-secondary truncate">{entry.task}</div>
                            </div>
                          ))}
                          {dayEntries.length > 1 && (
                            <div className="text-xs font-body-medium text-primary border-t border-primary-200 pt-1">
                              {dayTotal}h total
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-12 flex items-center justify-center text-text-secondary">
                          <Icon name="Plus" size={16} className="opacity-50" />
                        </div>
                      )}
                    </td>
                  );
                })}
                <td className="py-4 px-4 text-center">
                  <div className="font-body-medium text-text-primary">
                    {getTotalHoursForProject(project).toFixed(1)}h
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Daily Totals Row */}
            <tr className="bg-secondary-50 border-t-2 border-border">
              <td className="py-3 px-4 font-heading-medium text-text-primary">Daily Totals</td>
              {weekDays.map((day, index) => (
                <td key={index} className="py-3 px-2 text-center">
                  <div className="font-body-medium text-text-primary">
                    {getTotalHoursForDay(day).toFixed(1)}h
                  </div>
                </td>
              ))}
              <td className="py-3 px-4 text-center">
                <div className="font-heading-medium text-primary">
                  {data.reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}h
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-heading-medium text-text-primary mb-2">No time entries for this week</h3>
          <p className="text-text-secondary">Start tracking your time to see entries in the weekly grid.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyGrid;