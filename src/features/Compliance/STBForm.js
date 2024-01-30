// src/components/Form.js
import React, { useState } from 'react';

const STBForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    onSubmit(formData);
    // setFormData({ name: '', age: '', email: '' });
  };

  return (
    <form className="p-4 bg-gray-200">
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-4">
        Submit
      </button>
    </form>
  );
};

export default STBForm;
