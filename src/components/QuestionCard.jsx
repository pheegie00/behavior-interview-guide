import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { competencies } from '../data/demoData';

const scoreLabels = {
  1: 'Below Bar',
  2: 'Approaching Bar',
  3: 'Meets Bar',
  4: 'Exceeds Bar'
};

const typeLabels = {
  star: 'STAR',
  hypothetical: 'Hypothetical',
  values: 'Values'
};

export default function QuestionCard({ question, number, forceExpand = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  
  useEffect(() => {
    if (forceExpand) {
      setIsExpanded(true);
    }
  }, [forceExpand]);
  
  const competencyNames = question.competencies
    .map(c => competencies[c]?.name || c)
    .slice(0, 2); // Show max 2 competencies

  return (
    <div className="question-card">
      <div 
        className="question-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
      >
        <div className="question-number">{number}</div>
        
        <div className="question-content">
          <div className="question-text">{question.text}</div>
          <div className="question-meta">
            {competencyNames.map(comp => (
              <span key={comp} className="competency-tag">{comp}</span>
            ))}
            <span className="type-tag">{typeLabels[question.questionType]}</span>
          </div>
        </div>
        
        <div className={`question-expand ${isExpanded ? 'expanded' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="question-details">
          {/* Follow-up Probes */}
          <div className="follow-up-section">
            <h4 className="section-title">Follow-up Probes</h4>
            <ul className="follow-up-list">
              {question.followUpProbes.map((probe, idx) => (
                <li key={idx}>{probe}</li>
              ))}
            </ul>
          </div>
          
          {/* Scoring Rubric */}
          <div className="rubric-section">
            <h4 className="section-title">Scoring Rubric</h4>
            <div className="rubric-grid">
              {[1, 2, 3, 4].map(score => (
                <div key={score} className="rubric-item" data-score={score}>
                  <div className="rubric-score">
                    <span className="score-badge" data-score={score}>{score}</span>
                    <span className="score-label">{scoreLabels[score]}</span>
                  </div>
                  <p className="rubric-text">
                    {question.rubric[`score${score}`]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="notes-section no-print">
            <h4 className="section-title">Interview Notes</h4>
            <textarea
              className="notes-textarea"
              placeholder="Capture key quotes and observations here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}

      <style>{`
        .rubric-section {
          margin-top: 1.5rem;
        }
        
        @media print {
          .question-card {
            break-inside: avoid;
            page-break-inside: avoid;
            margin-bottom: 1.5rem;
          }
          
          .question-details {
            display: block !important;
          }
          
          .question-expand {
            display: none;
          }
          
          .rubric-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
