
// import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exactt path="/signup" element={<Signup />}></Route>
            <Route eaxct path="/Dashboard" element={<Dashboard/>}></Route>  
          </Routes>
        </div>
      </Router>

</>
  );
}

export default App;
