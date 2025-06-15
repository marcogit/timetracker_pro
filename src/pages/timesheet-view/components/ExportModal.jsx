import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, data }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('current');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock export logic
    const exportData = {
      format: exportFormat,
      dateRange,
      includeDetails,
      entries: data.length,
      totalHours: data.reduce((sum, entry) => sum + entry.hours, 0)
    };
    
    console.log('Exporting timesheet:', exportData);
    
    // Create mock download
    const filename = `timesheet_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    alert(`Timesheet exported as ${filename}`);
    
    setIsExporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003 p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-heading-medium text-text-primary">Export Timesheet</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-3">Export Format</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">PDF Document</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="xlsx"
                  checked={exportFormat === 'xlsx'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">Excel Spreadsheet</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">CSV File</span>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-3">Date Range</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="current"
                  checked={dateRange === 'current'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">Current Period</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="month"
                  checked={dateRange === 'month'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">Current Month</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="dateRange"
                  value="custom"
                  checked={dateRange === 'custom'}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">Custom Range</span>
              </label>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-3">Options</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-primary">Include task descriptions</span>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="font-body-medium text-text-primary mb-2">Export Summary</h4>
            <div className="text-sm text-text-secondary space-y-1">
              <div>Entries: {data.length}</div>
              <div>Total Hours: {data.reduce((sum, entry) => sum + entry.hours, 0).toFixed(1)}h</div>
              <div>Format: {exportFormat.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;