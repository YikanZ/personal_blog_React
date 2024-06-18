import React, { useState } from 'react';
import axios from 'axios';

const AddGoal = ({ token }) => {
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/goals', {
        goal, time, description
      }, {
        headers: { Authorization: token }
      });
      // handle response if needed
    } catch (error) {
      console.error('Error adding goal', error);
    }
  };

  return (
    <form onSubmit={addGoal}>
      <label>Goal:</label>
      <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <label>Time:</label>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default AddGoal;
