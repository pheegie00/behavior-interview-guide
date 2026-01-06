import { Link } from 'react-router-dom';
import { FileText, Clock, Target, BookOpen } from 'lucide-react';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Interview Guide Generator</h1>
              <p className="hero-subtitle">
                Generate customized behavioral interview guides with role-specific questions 
                and scoring rubrics in seconds, not hours.
              </p>
              <div className="hero-actions">
                <Link to="/generate" className="btn btn-primary btn-lg">
                  Generate Interview Guide
                </Link>
                <Link to="/best-practices" className="btn btn-outline btn-lg">
                  Best Practices
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="container">
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <Target />
                </div>
                <h3>Role-Specific Questions</h3>
                <p>
                  200+ behavioral questions tailored for 12 government technology roles, 
                  from engineers to product managers to designers.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <FileText />
                </div>
                <h3>Unique Scoring Rubrics</h3>
                <p>
                  Every question includes a 4-point scoring rubric with specific 
                  evidence to look for at each level.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <Clock />
                </div>
                <h3>5-Minute Setup</h3>
                <p>
                  Go from zero to interview-ready in minutes. Select role and 
                  seniority, generate, and you're prepared.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen />
                </div>
                <h3>Seniority Calibration</h3>
                <p>
                  Questions and rubrics calibrated for Junior, Mid, Senior, 
                  and Leadership levels with appropriate expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Select Role</h4>
                <p>Choose from 12 government technology roles</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">2</div>
                <h4>Choose Level</h4>
                <p>Pick the seniority level you're hiring for</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">3</div>
                <h4>Generate</h4>
                <p>Get 10-15 tailored questions with rubrics</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">4</div>
                <h4>Interview</h4>
                <p>Use the guide to conduct structured interviews</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .home-page {
          min-height: 100vh;
        }
        
        .hero {
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%);
          padding: 6rem 0;
          text-align: center;
        }
        
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        
        .hero h1 {
          color: var(--white);
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .hero-subtitle {
          color: var(--gray-300);
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero .btn-outline {
          border-color: var(--teal);
          color: var(--teal-light);
        }
        
        .hero .btn-outline:hover {
          background: var(--teal);
          color: var(--white);
        }
        
        .features {
          padding: 5rem 0;
          background: var(--white);
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .feature-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--gray-100);
          transition: all var(--transition-base);
        }
        
        .feature-card:hover {
          border-color: var(--teal);
          box-shadow: var(--shadow-md);
        }
        
        .feature-icon {
          width: 48px;
          height: 48px;
          background: var(--teal);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          margin-bottom: 1.25rem;
        }
        
        .feature-card h3 {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
        }
        
        .feature-card p {
          color: var(--gray-600);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0;
        }
        
        .how-it-works {
          padding: 5rem 0;
          background: var(--cream);
        }
        
        .how-it-works h2 {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .steps {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        
        .step {
          text-align: center;
          padding: 1.5rem;
          max-width: 200px;
        }
        
        .step-number {
          width: 48px;
          height: 48px;
          background: var(--navy);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.25rem;
          margin: 0 auto 1rem;
        }
        
        .step h4 {
          margin-bottom: 0.5rem;
        }
        
        .step p {
          color: var(--gray-600);
          font-size: 0.875rem;
          margin: 0;
        }
        
        .step-connector {
          width: 60px;
          height: 2px;
          background: var(--gray-300);
          margin-top: 24px;
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .steps {
            flex-direction: column;
            align-items: center;
          }
          
          .step-connector {
            width: 2px;
            height: 30px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
