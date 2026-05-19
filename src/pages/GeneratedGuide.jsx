import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Printer, RefreshCw, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { roles, seniorityLevels, questions, competencies, seniorityOrder, nonNegotiables } from '../data/demoData';

// Technical/craft competencies that aren't behavioral patterns. Questions can
// still be tagged with these (the questions themselves are behavioral), but we
// don't surface them as "what we're listening for" on this behavioral guide.
const NON_BEHAVIORAL_COMPETENCY_KEYS = new Set([
  'feasib',       // Technical Feasibility
  'techprob',     // Technical Problem Solving
  'codequal',     // Code Quality
  'access',       // Accessibility Compliance
  'security',     // Security Compliance
  'accessdesign', // Accessibility Design
  'procdoc',      // Process Documentation
  'dataanalysis', // Data Analysis
]);

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

  // Bucket competencies by category for the assessment overview
  const competencyBuckets = useMemo(() => {
    const buckets = { universal: [], role_specific: [], leadership: [] };
    const seen = new Set();
    guideQuestions.forEach(q => q.competencies.forEach(c => {
      if (seen.has(c)) return;
      seen.add(c);
      if (NON_BEHAVIORAL_COMPETENCY_KEYS.has(c)) return;
      const def = competencies[c];
      if (!def) return;
      const bucket = buckets[def.category];
      if (bucket) bucket.push(def.name);
    }));
    return buckets;
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
        
        {/* Why this matters at Focus */}
        <section className="assessment-intro">
          <h2>What we're listening for &mdash; and why it matters at Focus</h2>
          <p className="intro-lead">
            Focus exists to do hard, mission-driven work for clients who hire us
            because they trust us with problems they can't afford to get wrong.
            The qualities below are the ones that predict whether someone will
            actually thrive here &mdash; not just on paper, but in the messy,
            high-stakes, cross-functional environments our work lives in.
          </p>

          <div className="bucket bucket-nonneg">
            <h3>The non-negotiables</h3>
            <p>
              Every Focus hire, regardless of role or seniority, has to clear
              this bar. These are the qualities that determine whether someone
              can be trusted with a client, a teammate, or a deliverable when
              things get hard.
            </p>
            <ul className="bucket-tags">
              {nonNegotiables.map(({ name }) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          {competencyBuckets.role_specific.length > 0 && (
            <div className="bucket">
              <h3>The craft for this role</h3>
              <p>
                {role?.name} at Focus need to demonstrate specific competence
                in the areas below. We assess these because they're what the
                role actually requires day-to-day &mdash; not because they
                sound impressive on a resume.
              </p>
              <ul className="bucket-tags">
                {competencyBuckets.role_specific.map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {competencyBuckets.leadership.length > 0 && (
            <div className="bucket bucket-leadership">
              <h3>The leadership lens</h3>
              <p>
                For senior and lead roles, technical skill isn't enough. We
                assess whether someone will make the people around them more
                effective &mdash; or quietly make the team worse. These are
                the ten things we listen for, because they're the difference
                between a high performer and a multiplier.
              </p>
              <ul className="bucket-tags">
                {competencyBuckets.leadership.map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="intro-close">
            A few notes for the interviewer: probe for specifics, not slogans.
            Listen for &ldquo;I&rdquo; vs. &ldquo;we.&rdquo; Score on evidence,
            not polish. And remember the seniority calibration &mdash; we're
            assessing whether they can do <em>this</em> role, not whether
            they're impressive in the abstract.
          </p>
        </section>

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
        
        .assessment-intro {
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 2rem;
          margin: 1.5rem 0 2rem;
        }

        .assessment-intro h2 {
          font-size: 1.375rem;
          color: var(--navy);
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--teal);
        }

        .intro-lead {
          font-size: 1rem;
          color: var(--gray-700);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .bucket {
          padding: 1rem 1.25rem;
          background: var(--cream);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
        }

        .bucket-leadership {
          border-left: 4px solid var(--teal);
        }

        .bucket-nonneg {
          border-left: 4px solid var(--coral, var(--teal));
        }

        .bucket h3 {
          font-size: 1rem;
          color: var(--navy);
          margin-bottom: 0.5rem;
        }

        .bucket p {
          font-size: 0.9375rem;
          color: var(--gray-700);
          line-height: 1.6;
          margin: 0 0 0.75rem;
        }

        .bucket-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .bucket-tags li {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          color: var(--gray-700);
        }

        .intro-close {
          margin-top: 1.25rem;
          font-size: 0.9375rem;
          color: var(--gray-600);
          line-height: 1.6;
          font-style: italic;
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
