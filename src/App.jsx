import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuideGenerator from './pages/GuideGenerator';
import GeneratedGuide from './pages/GeneratedGuide';
import BestPractices from './pages/BestPractices';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<GuideGenerator />} />
          <Route path="/guide" element={<GeneratedGuide />} />
          <Route path="/best-practices" element={<BestPractices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
