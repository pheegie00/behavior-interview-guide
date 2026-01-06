import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-mark">F</div>
            <span className="logo-text">Focus Interview Guide</span>
          </Link>
          
          <nav className="header-nav">
            <Link 
              to="/generate" 
              className={location.pathname === '/generate' ? 'active' : ''}
            >
              Generate Guide
            </Link>
            <Link 
              to="/best-practices"
              className={location.pathname === '/best-practices' ? 'active' : ''}
            >
              Best Practices
            </Link>
          </nav>
        </div>
      </div>
      
      <style>{`
        .header-nav .active {
          color: var(--white);
          background: var(--navy-light);
        }
      `}</style>
    </header>
  );
}
