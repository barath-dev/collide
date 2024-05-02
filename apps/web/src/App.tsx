import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Waitlist from './components/Waitlist/Waitlist';
import Waitlisted from './pages/Waitlisted/Waitlisted';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/waitlisted" element={<Waitlisted />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;