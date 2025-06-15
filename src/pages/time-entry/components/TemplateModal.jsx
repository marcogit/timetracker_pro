import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TemplateModal = ({ isOpen, onClose, templates, onApply }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = () => {
    if (selectedTemplate) {
      onApply(selectedTemplate);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1003 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading-semibold text-text-primary">Time Entry Templates</h2>
            <p className="text-text-secondary text-sm mt-1">Select a template to quickly fill the form</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-border">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Templates List */}
        <div className="p-6 overflow-y-auto max-h-[400px]">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileTemplate" size={24} className="text-text-secondary" />
              </div>
              <h3 className="text-text-primary font-body-medium mb-2">
                {searchTerm ? 'No templates found' : 'No templates available'}
              </h3>
              <p className="text-text-secondary text-sm">
                {searchTerm ? 'Try adjusting your search terms' : 'Create templates to speed up time entry'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ease-out ${
                    selectedTemplate?.id === template.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-body-medium ${
                          selectedTemplate?.id === template.id ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {template.name}
                        </h3>
                        {selectedTemplate?.id === template.id && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-text-secondary">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="FolderOpen" size={14} />
                            <span>{template.project}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="CheckSquare" size={14} />
                            <span>{template.task}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span className="font-data">{template.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      {template.description && (
                        <p className="text-sm text-text-secondary mt-2 line-clamp-2">
                          {template.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {selectedTemplate ? `Selected: ${selectedTemplate.name}` : 'Select a template to continue'}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-out"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedTemplate}
              className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Apply Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;