/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import '../App.css'

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null); 
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        if (result.message === 'No authorization token was found') {
          throw new Error('Please sign up before trying to authenticate.');
        } else {
          throw new Error(result.message);
        }
      }

      const result = await response.json();
      setSuccessMessage(result.message);
      setUsername(result.data.username); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Authenticate</h2>
      {username && <p>Welcome, {username}!</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
