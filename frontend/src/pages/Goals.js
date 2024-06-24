import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Goals.css';

const Goals = ({ token }) => {
  const [goals, setGoals] = useState([]);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalTime, setNewGoalTime] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:5001/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals', error);
      }
    };

    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    const completedTime = newStatus === 'completed' ? new Date().toLocaleString() : '';
    try {
      const response = await axios.put(`http://localhost:5001/goals/${id}`, { status: newStatus, completedTime }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(goals.map(goal => goal._id === id ? response.data : goal));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingGoalId(id);
    const goalToEdit = goals.find(goal => goal._id === id);
    setNewGoalText(goalToEdit.goal);
    setNewGoalTime(goalToEdit.time);
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/goals/${id}`, 
        { goal: newGoalText, time: newGoalTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals(goals.map(goal => goal._id === id ? response.data : goal));
      setEditingGoalId(null);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  return (
    
    
    <div className="goals-container"
    >
      <div className="goals-header">
        <h2>Yikan's Goals</h2>
        {token && (
          <div className="add-goal-button-container">
            <Link to="/add-goal" className="add-goal-button">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        )}
      </div>
      

      <ul>
        <li className="goal-item header">
          <span className="goal-text">Goal</span>
          <span className="goal-time">Time</span>
          <div className="status-legend">
      <div>
          <span className="status-dot ongoing"></span> In Progress
        </div>
        <div>
          <span className="status-dot completed"></span> Completed
        </div>
      </div>
      
    
        </li>
        {goals.map((goal) => (
          <li key={goal._id} className="goal-item">
            <span className="goal-text">
              {editingGoalId === goal._id ? (
                <input
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                />
              ) : (
                <span>{goal.goal}</span>
              )}
            </span>
            <span className="goal-time">
              {editingGoalId === goal._id ? (
                <input
                  type="text"
                  value={newGoalTime}
                  onChange={(e) => setNewGoalTime(e.target.value)}
                />
              ) : (
                <span>{goal.time}</span>
              )}
            </span>
            <span className="goal-status">
              <input 
                type="radio" 
                checked={goal.status === 'ongoing'} 
                onChange={() => handleStatusToggle(goal._id, 'ongoing')}
                disabled={!token}
                className="red-radio"
              />
              <input 
                type="radio" 
                checked={goal.status === 'completed'} 
                onChange={() => handleStatusToggle(goal._id, 'completed')}
                disabled={!token}
                className="green-radio"
              />
            </span>
            {token && (
              editingGoalId === goal._id ? (
                <button onClick={() => handleEditSubmit(goal._id)} className="edit-button">
                  Save
                </button>
              ) : (
                <button onClick={() => handleEdit(goal._id)} className="edit-button">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )
            )}
            {token && (
              <button onClick={() => handleDelete(goal._id)} className="delete-button">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
