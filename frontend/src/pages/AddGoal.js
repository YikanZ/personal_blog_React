import React, { useState } from 'react';
import axios from 'axios';
import './AddGoal.css';



const AddGoal = ({ token }) => {
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/goals', 
        { goal, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Goal added successfully!');
      setGoal('');
      setTime('');

    } catch (error) {
      console.error('Error adding goal:', error.response ? error.response.data : error.message);
      setMessage('Error adding goal');
    }
  };

  return (
    <div className="add-goal-container">
      <form onSubmit={handleSubmit} className="add-goal-form">
        <label htmlFor="goal">Goal:</label>
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Add Goal</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddGoal;
