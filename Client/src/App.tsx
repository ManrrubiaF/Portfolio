import Home from './Components/Home/Home'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css';
import Skills from './Components/Skills/Skills';
import Contact from './Components/Contact/Contact';
import Projects from './Components/Projects/Projects';
import About from './Components/About/Abouts';

function App() {
  useEffect(() => {
    document.title = 'Favio Manrrubia Portfolio';
  }, []);
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} Component={Home} />
        <Route path="/About" element={<About />} Component={About} />
        <Route path='/Skills' element={<Skills />} Component={Skills} />
        <Route path='/Contact' element={<Contact />} Component={Contact} />
        <Route path='/Projects' element={<Projects />} Component={Projects} />
      </Routes>
    </div>
  );
}

export default App;
