/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './App.css'
import React, { useState } from 'react';

import Authenticate from './components/Authenticate';
import SignUpForm from './components/SignUpForm';


function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app">
      <SignUpForm setToken={setToken} />
      {token && <Authenticate token={token} />}
    </div>
  );
}

export default App;