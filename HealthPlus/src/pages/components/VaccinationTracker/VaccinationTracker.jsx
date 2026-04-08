import React, { useState, useEffect } from 'react';
import './VaccinationTracker.css';

const VaccinationTracker = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: ''
  });
  const [activeTab, setActiveTab] = useState('upcoming');
  const [notifications, setNotifications] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced vaccination schedule
  const vaccinationSchedule = {
    '0-2months': [
      { 
        name: 'BCG', 
        description: 'Bacillus Calmette-Guérin (Tuberculosis Prevention)', 
        dueAt: 'At Birth', 
        status: 'completed',
        importance: 'critical',
        sideEffects: 'Mild swelling, small scar formation',
        nextDose: null
      },
      { 
        name: 'Hepatitis B (1st Dose)', 
        description: 'Hepatitis B Vaccine - First Immunization', 
        dueAt: 'Within 24 hours of birth', 
        status: 'completed',
        importance: 'critical',
        sideEffects: 'Soreness at injection site',
        nextDose: '6 weeks'
      },
      { 
        name: 'OPV-0', 
        description: 'Oral Polio Vaccine - Birth Dose', 
        dueAt: 'At Birth', 
        status: 'completed',
        importance: 'critical',
        sideEffects: 'Very rare side effects',
        nextDose: '6 weeks'
      }
    ],
    '2-6months': [
      { 
        name: 'DPT-1', 
        description: 'Diphtheria, Pertussis, Tetanus - First Dose', 
        dueAt: '6 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Fever, fussiness, mild swelling',
        nextDose: '10 weeks'
      },
      { 
        name: 'IPV-1', 
        description: 'Inactivated Polio Vaccine - First Dose', 
        dueAt: '6 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Soreness, mild fever',
        nextDose: '10 weeks'
      },
      { 
        name: 'Hepatitis B (2nd Dose)', 
        description: 'Hepatitis B Vaccine - Second Immunization', 
        dueAt: '6 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Soreness at injection site',
        nextDose: '10 weeks'
      },
      { 
        name: 'Hib-1', 
        description: 'Haemophilus Influenzae Type B - First Dose', 
        dueAt: '6 weeks', 
        status: 'upcoming',
        importance: 'high',
        sideEffects: 'Mild fever, irritability',
        nextDose: '10 weeks'
      }
    ],
    '6-12months': [
      { 
        name: 'DPT-2', 
        description: 'Diphtheria, Pertussis, Tetanus - Second Dose', 
        dueAt: '10 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Fever, fussiness, mild swelling',
        nextDose: '14 weeks'
      },
      { 
        name: 'IPV-2', 
        description: 'Inactivated Polio Vaccine - Second Dose', 
        dueAt: '10 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Soreness, mild fever',
        nextDose: '14 weeks'
      },
      { 
        name: 'Rotavirus-1', 
        description: 'Rotavirus Vaccine - First Dose', 
        dueAt: '10 weeks', 
        status: 'upcoming',
        importance: 'high',
        sideEffects: 'Mild diarrhea, vomiting',
        nextDose: '14 weeks'
      },
      { 
        name: 'PCV-1', 
        description: 'Pneumococcal Conjugate Vaccine - First Dose', 
        dueAt: '10 weeks', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Fever, redness at injection site',
        nextDose: '14 weeks'
      }
    ],
    '12-24months': [
      { 
        name: 'MMR-1', 
        description: 'Measles, Mumps, Rubella - First Dose', 
        dueAt: '12-15 months', 
        status: 'upcoming',
        importance: 'critical',
        sideEffects: 'Mild fever, rash after 7-12 days',
        nextDose: '4-6 years'
      },
      { 
        name: 'Varicella', 
        description: 'Chickenpox Vaccine - First Dose', 
        dueAt: '12-15 months', 
        status: 'upcoming',
        importance: 'high',
        sideEffects: 'Soreness, mild fever',
        nextDose: '4-6 years'
      },
      { 
        name: 'Hepatitis A-1', 
        description: 'Hepatitis A Vaccine - First Dose', 
        dueAt: '12-23 months', 
        status: 'upcoming',
        importance: 'recommended',
        sideEffects: 'Soreness, mild fatigue',
        nextDose: '6-12 months later'
      }
    ]
  };

  useEffect(() => {
    const savedChildren = localStorage.getItem('vaccinationChildren');
    if (savedChildren) {
      try {
        const parsedChildren = JSON.parse(savedChildren);
        setChildren(parsedChildren);
        if (parsedChildren.length > 0) {
          setSelectedChild(parsedChildren[0]);
        }
      } catch (error) {
        console.error('Error parsing saved children:', error);
        localStorage.removeItem('vaccinationChildren');
      }
    }
  }, []);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Unknown';
    
    try {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                         (today.getMonth() - birthDate.getMonth());
      
      if (ageInMonths < 0) return 'Invalid date';
      
      if (ageInMonths < 12) {
        return `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''}`;
      } else {
        const years = Math.floor(ageInMonths / 12);
        const months = ageInMonths % 12;
        return `${years} year${years !== 1 ? 's' : ''}${months > 0 ? ` ${months} month${months !== 1 ? 's' : ''}` : ''}`;
      }
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getAgeGroup = (dateOfBirth) => {
    const ageInMonths = calculateAgeInMonths(dateOfBirth);
    
    if (ageInMonths <= 2) return '0-2months';
    if (ageInMonths <= 6) return '2-6months';
    if (ageInMonths <= 12) return '6-12months';
    return '12-24months';
  };

  const calculateAgeInMonths = (dateOfBirth) => {
    if (!dateOfBirth) return 0;
    
    try {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      return Math.max(0, (today.getFullYear() - birthDate.getFullYear()) * 12 + 
             (today.getMonth() - birthDate.getMonth()));
    } catch (error) {
      return 0;
    }
  };

  const addChild = (e) => {
    e.preventDefault();
    
    if (!newChild.name.trim() || !newChild.dateOfBirth) {
      alert('Please fill in all required fields');
      return;
    }

    const childWithId = {
      ...newChild,
      id: Date.now().toString(),
      addedDate: new Date().toISOString()
    };
    
    const updatedChildren = [...children, childWithId];
    setChildren(updatedChildren);
    
    try {
      localStorage.setItem('vaccinationChildren', JSON.stringify(updatedChildren));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    setSelectedChild(childWithId);
    setShowAddChild(false);
    setNewChild({ name: '', dateOfBirth: '', gender: '', bloodGroup: '' });
  };

  const getVaccinesForChild = () => {
    if (!selectedChild) return { completed: [], upcoming: [], overdue: [] };
    
    const allVaccines = Object.values(vaccinationSchedule).flat();
    
    return {
      completed: allVaccines.filter(v => v.status === 'completed'),
      upcoming: allVaccines.filter(v => v.status === 'upcoming'),
      overdue: allVaccines.filter(v => v.status === 'overdue')
    };
  };

  const getUpcomingCount = () => {
    const vaccines = getVaccinesForChild();
    return vaccines.upcoming.length + vaccines.overdue.length;
  };

  const getNextVaccination = () => {
    const vaccines = getVaccinesForChild();
    return vaccines.upcoming[0] || vaccines.overdue[0];
  };

  const getCompletionPercentage = () => {
    const vaccines = getVaccinesForChild();
    const total = vaccines.completed.length + vaccines.upcoming.length + vaccines.overdue.length;
    if (total === 0) return 0;
    return Math.round((vaccines.completed.length / total) * 100);
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'recommended': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredChildren = children.filter(child =>
    child && child.name && child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle modal close with Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showAddChild) {
        setShowAddChild(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [showAddChild]);

  return (
    <div className="vaccination-tracker">
      {/* Modern Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="m2 17 10 5 10-5"/>
                <path d="m2 12 10 5 10-5"/>
              </svg>
            </div>
            <div className="brand-text">
              <h1>Vaccination Tracker</h1>
              <p>Keep track of your child's vaccination schedule and never miss an important shot</p>
            </div>
          </div>
          
          <div className="header-actions">
            {children.length > 0 && selectedChild && (
              <div className="quick-stats">
                <div className="stat-item">
                  <div className="stat-number">{getCompletionPercentage()}%</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{getUpcomingCount()}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setShowAddChild(true)}
              className="add-child-button"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add Child
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Child Selection Cards */}
        {children.length > 0 && (
          <section className="children-section">
            <div className="section-title">
              <h2>Select Child</h2>
              <span className="child-count">{children.length} profile{children.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="children-grid">
              {filteredChildren.map(child => (
                <div
                  key={child.id}
                  className={`child-profile-card ${selectedChild?.id === child.id ? 'active' : ''}`}
                  onClick={() => setSelectedChild(child)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedChild(child);
                    }
                  }}
                >
                  <div className="profile-header">
                    <div className="avatar">
                      <span>{child.name?.charAt(0)?.toUpperCase() || '?'}</span>
                    </div>
                    <div className="profile-info">
                      <h3>{child.name || 'Unknown'}</h3>
                      <p className="age">{calculateAge(child.dateOfBirth)}</p>
                    </div>
                  </div>
                  
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span className="percentage">{getCompletionPercentage()}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${getCompletionPercentage()}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="stats-row">
                    <div className="stat completed">
                      <span className="number">{getVaccinesForChild().completed.length}</span>
                      <span className="label">Completed</span>
                    </div>
                    <div className="stat pending">
                      <span className="number">{getUpcomingCount()}</span>
                      <span className="label">Pending</span>
                    </div>
                  </div>
                  
                  {getNextVaccination() && (
                    <div className="next-vaccine">
                      <div className="next-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                        </svg>
                      </div>
                      <div className="next-info">
                        <span className="next-label">Next Due</span>
                        <span className="next-vaccine-name">{getNextVaccination().name}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vaccination Dashboard */}
        {selectedChild && (
          <section className="dashboard-section">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <h2>{selectedChild.name}'s Vaccination Record</h2>
                <div className="child-meta">
                  <span>Age: {calculateAge(selectedChild.dateOfBirth)}</span>
                  <span>Gender: {selectedChild.gender || 'Not specified'}</span>
                  {selectedChild.bloodGroup && <span>Blood: {selectedChild.bloodGroup}</span>}
                </div>
              </div>
              
              <div className="dashboard-controls">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Notifications</span>
                </label>
              </div>
            </div>

            {/* Modern Tabs */}
            <div className="tab-navigation">
              <button
                className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
                type="button"
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                  </svg>
                </div>
                <div className="tab-info">
                  <span className="tab-title">Upcoming</span>
                  <span className="tab-badge">{getVaccinesForChild().upcoming.length}</span>
                </div>
              </button>
              
              <button
                className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('completed')}
                type="button"
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="tab-info">
                  <span className="tab-title">Completed</span>
                  <span className="tab-badge">{getVaccinesForChild().completed.length}</span>
                </div>
              </button>
              
              <button
                className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
                onClick={() => setActiveTab('schedule')}
                type="button"
              >
                <div className="tab-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div className="tab-info">
                  <span className="tab-title">Full Schedule</span>
                  <span className="tab-badge">Timeline</span>
                </div>
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'upcoming' && (
                <div className="vaccines-section">
                  <div className="section-header">
                    <h3>Upcoming Vaccinations</h3>
                    <p>Don't miss these important vaccinations for your child's health</p>
                  </div>
                  
                  {getVaccinesForChild().upcoming.length > 0 ? (
                    <div className="vaccines-grid">
                      {getVaccinesForChild().upcoming.map((vaccine, index) => (
                        <div key={`upcoming-${index}`} className="vaccine-card upcoming">
                          <div className="card-header">
                            <div className="priority-badge" style={{ backgroundColor: getImportanceColor(vaccine.importance) }}>
                              {vaccine.importance.toUpperCase()}
                            </div>
                            <div className="status-badge upcoming">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                              </svg>
                              Upcoming
                            </div>
                          </div>
                          
                          <div className="card-content">
                            <h4>{vaccine.name}</h4>
                            <p className="description">{vaccine.description}</p>
                            
                            <div className="vaccine-details">
                              <div className="detail-row">
                                <span className="label">Due:</span>
                                <span className="value">{vaccine.dueAt}</span>
                              </div>
                              <div className="detail-row">
                                <span className="label">Side Effects:</span>
                                <span className="value">{vaccine.sideEffects}</span>
                              </div>
                              {vaccine.nextDose && (
                                <div className="detail-row">
                                  <span className="label">Next Dose:</span>
                                  <span className="value">{vaccine.nextDose}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="card-actions">
                            <button className="btn btn-primary" type="button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                              </svg>
                              Schedule
                            </button>
                            <button className="btn btn-secondary" type="button">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                              </svg>
                              Remind
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <h3>All Caught Up!</h3>
                      <p>No upcoming vaccinations at this time. Great job keeping up with the schedule!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="vaccines-section">
                  <div className="section-header">
                    <h3>Completed Vaccinations</h3>
                    <p>Vaccinations your child has already received</p>
                  </div>
                  
                  <div className="vaccines-grid">
                    {getVaccinesForChild().completed.map((vaccine, index) => (
                      <div key={`completed-${index}`} className="vaccine-card completed">
                        <div className="card-header">
                          <div className="priority-badge" style={{ backgroundColor: getImportanceColor(vaccine.importance) }}>
                            {vaccine.importance.toUpperCase()}
                          </div>
                          <div className="status-badge completed">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Completed
                          </div>
                        </div>
                        
                        <div className="card-content">
                          <h4>{vaccine.name}</h4>
                          <p className="description">{vaccine.description}</p>
                          
                          <div className="vaccine-details">
                            <div className="detail-row">
                              <span className="label">Given:</span>
                              <span className="value">{vaccine.dueAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="schedule-section">
                  <div className="section-header">
                    <h3>Complete Vaccination Schedule</h3>
                    <p>Recommended vaccination timeline from birth to 24 months</p>
                  </div>
                  
                  <div className="timeline">
                    {Object.entries(vaccinationSchedule).map(([ageGroup, vaccines]) => (
                      <div key={ageGroup} className="timeline-group">
                        <div className="timeline-header">
                          <div className="timeline-marker"></div>
                          <div className="timeline-info">
                            <h4>{ageGroup.replace('-', ' - ').replace('months', ' Months')}</h4>
                            <span className="vaccine-count">{vaccines.length} vaccines</span>
                          </div>
                        </div>
                        
                        <div className="timeline-content">
                          {vaccines.map((vaccine, index) => (
                            <div key={`${ageGroup}-${index}`} className={`timeline-item ${vaccine.status}`}>
                              <div className="timeline-item-header">
                                <div className="vaccine-info">
                                  <h5>{vaccine.name}</h5>
                                  <div className="importance-indicator">
                                    <div 
                                      className="dot" 
                                      style={{ backgroundColor: getImportanceColor(vaccine.importance) }}
                                    />
                                    <span>{vaccine.importance}</span>
                                  </div>
                                </div>
                                <div className={`status-icon ${vaccine.status}`}>
                                  {vaccine.status === 'completed' ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                    </svg>
                                  ) : (
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <p className="timeline-description">{vaccine.description}</p>
                              <div className="timeline-meta">
                                <span>Due: {vaccine.dueAt}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Empty State */}
        {children.length === 0 && (
          <section className="empty-state-section">
            <div className="empty-content">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
              </div>
              <h2>No Children Added Yet</h2>
              <p>Add your child's information to start tracking their vaccination schedule and never miss an important immunization.</p>
              <button 
                onClick={() => setShowAddChild(true)}
                className="get-started-button"
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add Your First Child
              </button>
            </div>
          </section>
        )}

        {/* Add Child Modal */}
        {showAddChild && (
          <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddChild(false);
            }
          }}>
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">
                  <h3>Add New Child Profile</h3>
                  <p>Create a comprehensive vaccination tracking profile</p>
                </div>
                <button 
                  onClick={() => setShowAddChild(false)} 
                  className="close-button"
                  type="button"
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={addChild} className="modal-form">
                <div className="form-section">
                  <h4>Basic Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="childName">Full Name *</label>
                      <input
                        id="childName"
                        type="text"
                        value={newChild.name}
                        onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                        required
                        placeholder="Enter child's complete name"
                        autoComplete="name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="childDob">Date of Birth *</label>
                      <input
                        id="childDob"
                        type="date"
                        value={newChild.dateOfBirth}
                        onChange={(e) => setNewChild({...newChild, dateOfBirth: e.target.value})}
                        required
                        max={new Date().toISOString().split('T')[0]}
                        autoComplete="bday"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-section">
                  <h4>Additional Details</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="childGender">Gender</label>
                      <select
                        id="childGender"
                        value={newChild.gender}
                        onChange={(e) => setNewChild({...newChild, gender: e.target.value})}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="childBloodGroup">Blood Group</label>
                      <select
                        id="childBloodGroup"
                        value={newChild.bloodGroup}
                        onChange={(e) => setNewChild({...newChild, bloodGroup: e.target.value})}
                      >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowAddChild(false)} 
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VaccinationTracker;
