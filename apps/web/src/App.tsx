import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Waitlist from './components/Waitlist/Waitlist';
import Waitlisted from './pages/Waitlisted/Waitlisted';
import Favicon from "react-favicon";
import light from './assets/collideFavicon.svg';
import dark from './assets/FaviconDark.png';


function App() {


  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  const darkTheme = darkThemeMq.matches;


  return (
    <>
     <Favicon url={darkTheme ? light : dark}/>
    <Router>
      <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route path="/waitlisted" element={<Waitlisted />} />
        <Route path="*" element={<Waitlist/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;