/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../App.css'

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if username or password is empty
    if (!username || !password) {
      setError('Please fill in both fields before submitting.');
      return;
    }

    // Check if username is less than eight characters long
    if (username.length < 8) {
      setError('Username must be at least eight characters long.');
      return;
    }

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
