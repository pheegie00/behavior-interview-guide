import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Info } from 'lucide-react';
import Header from '../components/Header';
import { roles, seniorityLevels } from '../data/demoData';

export default function GuideGenerator() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSeniority, setSelectedSeniority] = useState('mid');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!selectedRole) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate to guide with params
    navigate(`/guide?role=${selectedRole}&seniority=${selectedSeniority}`);
  };

  const selectedRoleData = roles.find(r => r.id === selectedRole);

  return (
    <div className="generator-page">
      <Header />
      
      <main className="container">
        <div className="generator-wrapper">
          <div className="generator-header">
            <h1>Generate Interview Guide</h1>
            <p>Select a role and seniority level to create a customized interview guide.</p>
          </div>

          <div className="generator-form">
            {/* Role Selection */}
            <div className="form-group">
              <label className="form-label">Select Role</label>
              <select 
                value={selectedRole} 
                onChange={(e) => setSelectedRole(e.target.value)}
                className="role-select"
              >
                <option value="">Choose a role...</option>
                <optgroup label="Program & Product">
                  {roles.filter(r => ['tpm', 'tprm'].includes(r.id)).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Engineering">
                  {roles.filter(r => r.id.includes('fullstack') || r.id.includes('infra') || r.id.includes('frontend') || r.id.includes('data') || r.id.includes('ml')).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Design">
                  {roles.filter(r => ['service', 'ux', 'content'].includes(r.id)).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Operations">
                  {roles.filter(r => ['ba', 'tw'].includes(r.id)).map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </optgroup>
              </select>
              {selectedRoleData && (
                <p className="form-hint">
                  <Info size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {selectedRoleData.description}
                </p>
              )}
            </div>

            {/* Seniority Selection */}
            <div className="form-group">
              <label className="form-label">Seniority Level</label>
              <div className="seniority-options">
                {seniorityLevels.map(level => (
                  <button
                    key={level.id}
                    type="button"
                    className={`seniority-option ${selectedSeniority === level.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSeniority(level.id)}
                  >
                    <span className="seniority-name">{level.name}</span>
                    <span className="seniority-desc">{level.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="form-actions">
              <button 
                className="btn btn-primary btn-lg generate-btn"
                onClick={handleGenerate}
                disabled={!selectedRole || isGenerating}
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Interview Guide
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="info-card">
            <h3>What you'll get</h3>
            <ul>
              <li><strong>10-15 behavioral questions</strong> tailored to the role and level</li>
              <li><strong>Follow-up probes</strong> to dig deeper into candidate responses</li>
              <li><strong>Unique scoring rubrics</strong> with specific evidence for each score</li>
              <li><strong>Competency coverage</strong> across universal and role-specific skills</li>
              <li><strong>Print-ready format</strong> for in-person interviews</li>
            </ul>
          </div>
        </div>
      </main>

      <style>{`
        .generator-page {
          min-height: 100vh;
          background: var(--cream);
        }
        
        .generator-wrapper {
          max-width: 700px;
          margin: 0 auto;
          padding: 3rem 0;
        }
        
        .generator-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .generator-header h1 {
          margin-bottom: 0.75rem;
        }
        
        .generator-header p {
          color: var(--gray-600);
          font-size: 1.1rem;
        }
        
        .generator-form {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          margin-bottom: 2rem;
        }
        
        .role-select {
          font-size: 1rem;
        }
        
        .seniority-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        .seniority-option {
          padding: 1rem;
          border: 2px solid var(--gray-200);
          border-radius: var(--radius-md);
          background: var(--white);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
        }
        
        .seniority-option:hover {
          border-color: var(--teal);
        }
        
        .seniority-option.selected {
          border-color: var(--teal);
          background: rgba(20, 184, 166, 0.05);
        }
        
        .seniority-name {
          display: block;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 0.25rem;
        }
        
        .seniority-desc {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-500);
        }
        
        .form-actions {
          margin-top: 2rem;
          text-align: center;
        }
        
        .generate-btn {
          width: 100%;
          max-width: 320px;
        }
        
        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .info-card {
          background: var(--white);
          border-radius: var(--radius-lg);
          padding: 2rem;
          border: 1px solid var(--gray-100);
        }
        
        .info-card h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
          color: var(--gray-700);
        }
        
        .info-card ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .info-card li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: var(--gray-600);
          font-size: 0.9375rem;
        }
        
        .info-card li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--teal);
          font-weight: 600;
        }
        
        .info-card li strong {
          color: var(--navy);
        }
        
        @media (max-width: 640px) {
          .seniority-options {
            grid-template-columns: 1fr;
          }
          
          .generator-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
