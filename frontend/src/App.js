
// import React from 'react';


// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';


import { AuthProvider } from "./context/AuthContext";
import LayOut from './pages/LayOut/LayOut';
import './App.css';


function App() {
  return (
    
    <>
      <AuthProvider>
        <LayOut />
        </AuthProvider>

      </>
  );
}

export default App;
