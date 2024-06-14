// frontend/src/pages/Contact.js
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the API call to send the form data
    axios.post('/api/contact', formData)
      .then(response => {
        console.log('Message sent:', response.data);
      })
      .catch(error => {
        console.error('There was an error sending the message!', error);
      });
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
