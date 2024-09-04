// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page as default route */}
          {/* You can define other routes here if needed */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unmatched route to home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
