import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { EasterEggProvider } from './context/EasterEggContext';
import Home from './pages/Home';

export default function App() {
  return (
    <AudioProvider>
      <EasterEggProvider>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </EasterEggProvider>
    </AudioProvider>
  );
}
