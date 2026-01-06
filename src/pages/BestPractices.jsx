import Header from '../components/Header';

export default function BestPractices() {
  return (
    <div className="practices-page">
      <Header />
      
      <main className="container container-narrow">
        <article className="practices-content">
          <h1>Behavioral Interviewing Best Practices</h1>
          <p className="lead">
            Structured behavioral interviewing helps predict job performance better than 
            unstructured conversations. Here's how to get the most out of your interview guides.
          </p>

          <section>
            <h2>The STAR Framework</h2>
            <p>
              Behavioral questions ask candidates to describe past experiences. Listen for 
              the STAR components in their responses:
            </p>
            <div className="star-grid">
              <div className="star-item">
                <div className="star-letter">S</div>
                <div>
                  <strong>Situation</strong>
                  <p>Context and background. When, where, who was involved?</p>
                </div>
              </div>
              <div className="star-item">
                <div className="star-letter">T</div>
                <div>
                  <strong>Task</strong>
                  <p>The challenge or objective they faced.</p>
                </div>
              </div>
              <div className="star-item">
                <div className="star-letter">A</div>
                <div>
                  <strong>Action</strong>
                  <p>Specific steps they took. Watch for "we" vs "I".</p>
                </div>
              </div>
              <div className="star-item">
                <div className="star-letter">R</div>
                <div>
                  <strong>Result</strong>
                  <p>Measurable outcomes and lessons learned.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>Effective Probing</h2>
            <p>Use follow-up questions to get specifics:</p>
            <ul>
              <li><strong>Depth probes:</strong> "Tell me more about that decision." "Walk me through your thinking."</li>
              <li><strong>Role clarity:</strong> "What specifically was your role?" "Who else was involved?"</li>
              <li><strong>Outcome focus:</strong> "What was the impact?" "How did you measure success?"</li>
              <li><strong>Reflection:</strong> "What would you do differently?" "What did you learn?"</li>
            </ul>
          </section>

          <section>
            <h2>Interviewing Principles</h2>
            <div className="principles-grid">
              <div className="principle-card">
                <h4>Depth Over Breadth</h4>
                <p>Better to probe deeply on 3-4 questions than superficially cover 15. The rubrics help you know when you have enough evidence.</p>
              </div>
              <div className="principle-card">
                <h4>Evidence-Based Scoring</h4>
                <p>Score on concrete examples, not likability or communication polish. Use the rubric descriptions to calibrate.</p>
              </div>
              <div className="principle-card">
                <h4>Pause Tolerance</h4>
                <p>Allow silence. The best answers often come after candidate reflection. Don't rush to fill the gap.</p>
              </div>
              <div className="principle-card">
                <h4>Note-Taking</h4>
                <p>Capture verbatim quotes to support your scoring. This helps in calibration and debrief discussions.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Red Flags to Watch For</h2>
            <ul className="red-flags">
              <li>Can't provide specific examples (vague "we usually..." responses)</li>
              <li>Takes credit for team work without acknowledging others</li>
              <li>Blames others without self-reflection</li>
              <li>Can't articulate learning or growth from experiences</li>
              <li>Inconsistent stories across different questions</li>
              <li>Lack of mission alignment or purely mercenary motivations</li>
            </ul>
          </section>

          <section>
            <h2>Seniority Calibration</h2>
            <div className="calibration-table">
              <div className="calibration-row">
                <div className="calibration-level">Junior</div>
                <div className="calibration-desc">
                  Clear examples with guidance/mentorship. Learning mindset and growth trajectory. 
                  Basic competency demonstration. <strong>Potential over proven track record.</strong>
                </div>
              </div>
              <div className="calibration-row">
                <div className="calibration-level">Mid</div>
                <div className="calibration-desc">
                  Independent execution with measurable impact. Some mentorship of others. 
                  Navigating ambiguity with less guidance. <strong>Established patterns of success.</strong>
                </div>
              </div>
              <div className="calibration-row">
                <div className="calibration-level">Senior</div>
                <div className="calibration-desc">
                  Strategic thinking and organizational influence. Technical/design leadership. 
                  Complex problem-solving. <strong>Creating leverage through process/tools/culture.</strong>
                </div>
              </div>
              <div className="calibration-row">
                <div className="calibration-level">Leadership</div>
                <div className="calibration-desc">
                  Vision-setting and organizational transformation. Executive stakeholder management. 
                  Building teams and practices. <strong>Multi-project impact with measurable outcomes.</strong>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>Scoring Guide</h2>
            <div className="scoring-guide">
              <div className="score-row" data-score="1">
                <div className="score-num">1</div>
                <div>
                  <strong>Below Bar</strong>
                  <p>Red flags or concerning patterns. Cannot provide examples. Evidence suggests they would struggle in this role.</p>
                </div>
              </div>
              <div className="score-row" data-score="2">
                <div className="score-num">2</div>
                <div>
                  <strong>Approaching Bar</strong>
                  <p>Adequate but gaps in key areas. Shows some competency but with concerning limitations or inconsistency.</p>
                </div>
              </div>
              <div className="score-row" data-score="3">
                <div className="score-num">3</div>
                <div>
                  <strong>Meets Bar</strong>
                  <p>Solid evidence of competency. Clear examples that demonstrate the skill at the expected level for this role.</p>
                </div>
              </div>
              <div className="score-row" data-score="4">
                <div className="score-num">4</div>
                <div>
                  <strong>Exceeds Bar</strong>
                  <p>Exceptional demonstration with notable insights. Would raise the bar for the team. Clear multiplier potential.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2>After the Interview</h2>
            <ul>
              <li>Complete your scoring immediately while details are fresh</li>
              <li>Include specific quotes and examples to support each score</li>
              <li>Note any areas where you'd want other panelists to probe</li>
              <li>Flag any potential red flags for discussion</li>
              <li>Reserve final hiring recommendation for calibration session</li>
            </ul>
          </section>
        </article>
      </main>

      <style>{`
        .practices-page {
          min-height: 100vh;
          background: var(--white);
        }
        
        .practices-content {
          padding: 3rem 0 5rem;
        }
        
        .practices-content h1 {
          margin-bottom: 1.5rem;
        }
        
        .lead {
          font-size: 1.25rem;
          color: var(--gray-600);
          line-height: 1.7;
          margin-bottom: 3rem;
        }
        
        section {
          margin-bottom: 3rem;
        }
        
        section h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--teal);
        }
        
        section p {
          color: var(--gray-700);
          line-height: 1.7;
        }
        
        section ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        
        section li {
          margin-bottom: 0.75rem;
          color: var(--gray-700);
          line-height: 1.6;
        }
        
        .star-grid {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .star-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: var(--cream);
          border-radius: var(--radius-md);
        }
        
        .star-letter {
          width: 40px;
          height: 40px;
          background: var(--teal);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        
        .star-item strong {
          display: block;
          color: var(--navy);
          margin-bottom: 0.25rem;
        }
        
        .star-item p {
          margin: 0;
          font-size: 0.9375rem;
          color: var(--gray-600);
        }
        
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .principle-card {
          padding: 1.25rem;
          background: var(--cream);
          border-radius: var(--radius-md);
        }
        
        .principle-card h4 {
          color: var(--navy);
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        
        .principle-card p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--gray-600);
        }
        
        .red-flags li {
          color: var(--gray-700);
        }
        
        .red-flags li::marker {
          color: var(--coral);
        }
        
        .calibration-table {
          margin-top: 1.5rem;
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        
        .calibration-row {
          display: flex;
          border-bottom: 1px solid var(--gray-200);
        }
        
        .calibration-row:last-child {
          border-bottom: none;
        }
        
        .calibration-level {
          width: 120px;
          padding: 1rem;
          background: var(--navy);
          color: var(--white);
          font-weight: 600;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        
        .calibration-desc {
          padding: 1rem;
          font-size: 0.9375rem;
          color: var(--gray-700);
          line-height: 1.6;
        }
        
        .calibration-desc strong {
          color: var(--navy);
        }
        
        .scoring-guide {
          margin-top: 1.5rem;
        }
        
        .score-row {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-left: 4px solid;
          margin-bottom: 1rem;
          background: var(--gray-50);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        
        .score-row[data-score="1"] { border-color: var(--score-1); }
        .score-row[data-score="2"] { border-color: var(--score-2); }
        .score-row[data-score="3"] { border-color: var(--score-3); }
        .score-row[data-score="4"] { border-color: var(--score-4); }
        
        .score-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--white);
          flex-shrink: 0;
        }
        
        .score-row[data-score="1"] .score-num { background: var(--score-1); }
        .score-row[data-score="2"] .score-num { background: var(--score-2); }
        .score-row[data-score="3"] .score-num { background: var(--score-3); }
        .score-row[data-score="4"] .score-num { background: var(--score-4); }
        
        .score-row strong {
          display: block;
          color: var(--navy);
          margin-bottom: 0.25rem;
        }
        
        .score-row p {
          margin: 0;
          font-size: 0.9375rem;
          color: var(--gray-600);
        }
        
        @media (max-width: 768px) {
          .principles-grid {
            grid-template-columns: 1fr;
          }
          
          .calibration-row {
            flex-direction: column;
          }
          
          .calibration-level {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
