import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Goals = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals', error);
      }
    };

    fetchGoals();
  }, []);

  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/goals', {
        goal, time, description
      }, {
        headers: { Authorization: token }
      });
      setGoals([...goals, response.data]);
      setGoal('');
      setTime('');
      setDescription('');
    } catch (error) {
      console.error('Error adding goal', error);
    }
  };

  return (
    <div>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g.goal} - {g.time} - {g.description}</li>
        ))}
      </ul>
      {token && (
        <form onSubmit={addGoal}>
          <label>Goal:</label>
          <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} />
          <label>Time:</label>
          <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Goal</button>
        </form>
      )}
    </div>
  );
};

export default Goals;
