import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Printer, RefreshCw, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { roles, seniorityLevels, questions, competencies, seniorityOrder } from '../data/demoData';

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate questions for a role and seniority
function generateQuestions(roleId, seniorityId, count = 12) {
  const seniorityNum = seniorityOrder[seniorityId];
  
  // Filter questions applicable to this role and seniority
  const eligible = questions.filter(q => {
    const isRoleMatch = q.applicableRoles.includes(roleId);
    const isSeniorityMatch = seniorityOrder[q.minimumSeniority] <= seniorityNum;
    return isRoleMatch && isSeniorityMatch;
  });
  
  // Shuffle and take top N
  const shuffled = shuffleArray(eligible);
  
  // Try to get diversity of competencies
  const selected = [];
  const usedCompetencies = new Set();
  
  // First pass: prioritize diversity
  for (const q of shuffled) {
    if (selected.length >= count) break;
    
    const hasNewCompetency = q.competencies.some(c => !usedCompetencies.has(c));
    if (hasNewCompetency || selected.length < count / 2) {
      selected.push(q);
      q.competencies.forEach(c => usedCompetencies.add(c));
    }
  }
  
  // Second pass: fill remaining
  for (const q of shuffled) {
    if (selected.length >= count) break;
    if (!selected.includes(q)) {
      selected.push(q);
    }
  }
  
  return selected;
}

export default function GeneratedGuide() {
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('role');
  const seniorityId = searchParams.get('seniority') || 'mid';
  
  const [guideQuestions, setGuideQuestions] = useState([]);
  const [expandAll, setExpandAll] = useState(false);
  
  const role = roles.find(r => r.id === roleId);
  const seniority = seniorityLevels.find(s => s.id === seniorityId);
  
  useEffect(() => {
    if (roleId) {
      setGuideQuestions(generateQuestions(roleId, seniorityId));
    }
  }, [roleId, seniorityId]);
  
  const handleRegenerate = () => {
    setGuideQuestions(generateQuestions(roleId, seniorityId));
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  // Get unique competencies in this guide
  const guideCompetencies = useMemo(() => {
    const comps = new Set();
    guideQuestions.forEach(q => q.competencies.forEach(c => comps.add(c)));
    return Array.from(comps).map(c => competencies[c]?.name || c);
  }, [guideQuestions]);
  
  if (!role) {
    return (
      <div className="generator-page">
        <Header />
        <main className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>Role not found</h2>
          <p>Please select a valid role.</p>
          <Link to="/generate" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Generate New Guide
          </Link>
        </main>
      </div>
    );
  }
  
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="guide-page">
      <Header />
      
      <main className="container">
        {/* Guide Header */}
        <div className="guide-header">
          <div className="guide-header-top">
            <Link to="/generate" className="back-link">
              <ArrowLeft size={16} />
              Back to Generator
            </Link>
          </div>
          
          <div className="guide-title-section">
            <div className="guide-title-info">
              <h1>{role.name}</h1>
              <div className="guide-meta">
                <span className="seniority-badge" style={{ background: seniority?.color }}>
                  {seniority?.name}
                </span>
                <span className="date">{today}</span>
                <span className="question-count">{guideQuestions.length} questions</span>
              </div>
            </div>
            
            <div className="guide-actions no-print">
              <button className="btn btn-secondary btn-sm" onClick={handleRegenerate}>
                <RefreshCw size={16} />
                Regenerate
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
                <Printer size={16} />
                Print
              </button>
              <button 
                className="btn btn-ghost btn-sm" 
                onClick={() => setExpandAll(!expandAll)}
              >
                {expandAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {expandAll ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>
          
          {/* Competency Coverage */}
          <div className="competency-coverage">
            <span className="coverage-label">Competencies covered:</span>
            <div className="coverage-tags">
              {guideCompetencies.map(comp => (
                <span key={comp} className="coverage-tag">{comp}</span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Questions */}
        <div className="questions-list">
          {guideQuestions.map((question, index) => (
            <QuestionCard 
              key={question.id} 
              question={question} 
              number={index + 1}
              forceExpand={expandAll}
            />
          ))}
        </div>
        
        {/* Footer */}
        <div className="guide-footer no-print">
          <p>
            Not quite right? <button className="link-button" onClick={handleRegenerate}>Regenerate</button> for a different set of questions.
          </p>
        </div>
      </main>

      <style>{`
        .guide-page {
          min-height: 100vh;
          background: var(--cream);
        }
        
        .guide-header {
          padding: 2rem 0;
        }
        
        .guide-header-top {
          margin-bottom: 1.5rem;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-500);
          font-size: 0.875rem;
          text-decoration: none;
        }
        
        .back-link:hover {
          color: var(--teal-dark);
        }
        
        .guide-title-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .guide-title-info h1 {
          margin-bottom: 0.75rem;
        }
        
        .guide-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .seniority-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .date, .question-count {
          color: var(--gray-500);
          font-size: 0.875rem;
        }
        
        .guide-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .competency-coverage {
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .coverage-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray-500);
          white-space: nowrap;
          padding-top: 0.25rem;
        }
        
        .coverage-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .coverage-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: var(--gray-100);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--gray-600);
        }
        
        .questions-list {
          padding: 1rem 0 3rem;
        }
        
        .guide-footer {
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid var(--gray-200);
          color: var(--gray-500);
        }
        
        .link-button {
          background: none;
          border: none;
          color: var(--teal-dark);
          font: inherit;
          cursor: pointer;
          text-decoration: underline;
        }
        
        .link-button:hover {
          color: var(--teal);
        }
        
        @media (max-width: 768px) {
          .guide-title-section {
            flex-direction: column;
          }
          
          .guide-actions {
            width: 100%;
          }
          
          .guide-actions .btn {
            flex: 1;
          }
        }
        
        @media print {
          .guide-header {
            padding: 0 0 1rem;
          }
          
          .competency-coverage {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
