import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ filters, onFilterChange }) => {
  const departments = ['All Departments', 'Engineering', 'Marketing', 'Design', 'Sales', 'HR'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      employee: '',
      department: '',
      dateRange: 'all',
      hoursThreshold: '',
      search: ''
    });
  };

  const hasActiveFilters = filters.employee || filters.department || filters.dateRange !== 'all' || filters.hoursThreshold || filters.search;

  return (
    <div className="bg-surface rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <h3 className="font-heading-medium text-text-primary mb-2 lg:mb-0">Filter & Search</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            Search
          </label>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept === 'All Departments' ? '' : dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Hours Threshold Filter */}
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-1">
            Min Hours
          </label>
          <input
            type="number"
            placeholder="0"
            min="0"
            max="80"
            value={filters.hoursThreshold}
            onChange={(e) => handleFilterChange('hoursThreshold', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm text-text-secondary mr-2">Quick filters:</span>
        <button
          onClick={() => handleFilterChange('hoursThreshold', '40')}
          className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-body-medium hover:bg-secondary-200 transition-colors duration-150 ease-out"
        >
          <Icon name="Clock" size={12} className="mr-1" />
          40+ Hours
        </button>
        <button
          onClick={() => handleFilterChange('search', 'overtime')}
          className="inline-flex items-center px-3 py-1 bg-warning-100 text-warning-700 rounded-full text-xs font-body-medium hover:bg-warning-200 transition-colors duration-150 ease-out"
        >
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          Overtime
        </button>
        <button
          onClick={() => handleFilterChange('dateRange', 'week')}
          className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-body-medium hover:bg-primary-200 transition-colors duration-150 ease-out"
        >
          <Icon name="Calendar" size={12} className="mr-1" />
          This Week
        </button>
      </div>
    </div>
  );
};

export default FilterControls;