import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TeamAssignment = ({ project, teamMembers, onProjectUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  const roles = [
    'Project Manager',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'UI/UX Designer',
    'Data Analyst',
    'QA Engineer',
    'DevOps Engineer'
  ];

  const availableMembers = teamMembers.filter(member => 
    !project.teamMembers.some(projectMember => projectMember.id === member.id)
  );

  const filteredAvailableMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (member, role) => {
    const newTeamMember = {
      ...member,
      role: role || member.role,
      active: true
    };
    
    const updatedProject = {
      ...project,
      teamMembers: [...project.teamMembers, newTeamMember]
    };
    
    onProjectUpdate(updatedProject);
    setShowAddMember(false);
    setSearchTerm('');
    setSelectedRole('');
  };

  const handleRemoveMember = (memberId) => {
    const updatedProject = {
      ...project,
      teamMembers: project.teamMembers.filter(member => member.id !== memberId)
    };
    
    onProjectUpdate(updatedProject);
  };

  const handleToggleMemberStatus = (memberId) => {
    const updatedProject = {
      ...project,
      teamMembers: project.teamMembers.map(member =>
        member.id === memberId ? { ...member, active: !member.active } : member
      )
    };
    
    onProjectUpdate(updatedProject);
  };

  const handleRoleChange = (memberId, newRole) => {
    const updatedProject = {
      ...project,
      teamMembers: project.teamMembers.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    };
    
    onProjectUpdate(updatedProject);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading-medium text-text-primary">Team Members</h3>
          <p className="text-text-secondary text-sm mt-1">Manage project team assignments and roles</p>
        </div>
        <button
          onClick={() => setShowAddMember(true)}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-body-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-out"
        >
          <Icon name="UserPlus" size={16} className="mr-2" />
          Add Member
        </button>
      </div>

      {/* Current Team Members */}
      <div className="bg-secondary-50 rounded-lg">
        <div className="p-4 border-b border-border">
          <h4 className="font-body-medium text-text-primary">Current Team ({project.teamMembers.length})</h4>
        </div>
        <div className="divide-y divide-border">
          {project.teamMembers.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-heading-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h5 className="font-body-medium text-text-primary">{member.name}</h5>
                  <p className="text-text-secondary text-sm">{member.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  className="px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleMemberStatus(member.id)}
                    className={`px-3 py-1 text-xs font-body-medium rounded-full transition-colors duration-150 ease-out ${
                      member.active
                        ? 'bg-success-100 text-success hover:bg-success-200' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                    }`}
                  >
                    {member.active ? 'Active' : 'Inactive'}
                  </button>
                  
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="p-1.5 text-error hover:bg-error-50 rounded-lg transition-colors duration-150 ease-out"
                    title="Remove from project"
                  >
                    <Icon name="UserMinus" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {project.teamMembers.length === 0 && (
            <div className="p-8 text-center">
              <Icon name="Users" size={32} className="text-text-secondary mx-auto mb-3" />
              <p className="text-text-secondary">No team members assigned yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1003">
          <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-heading-medium text-text-primary">Add Team Member</h3>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-colors duration-150 ease-out"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Available Members */}
              <div className="max-h-96 overflow-y-auto">
                {filteredAvailableMembers.length > 0 ? (
                  <div className="space-y-2">
                    {filteredAvailableMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-150 ease-out">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-heading-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-body-medium text-text-primary">{member.name}</h5>
                            <p className="text-text-secondary text-sm">{member.email}</p>
                            <p className="text-text-secondary text-xs">{member.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="">Use Default Role</option>
                            {roles.map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                          
                          <button
                            onClick={() => handleAddMember(member, selectedRole)}
                            className="px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-150 ease-out"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Users" size={32} className="text-text-secondary mx-auto mb-3" />
                    <p className="text-text-secondary">
                      {availableMembers.length === 0 
                        ? 'All team members are already assigned to this project' :'No members found matching your search'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAssignment;