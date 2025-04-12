import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/images/bg.jpeg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const res = await fetch(`${process.env.REACT_APP_NODE_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        setSuccess('Registration successful!');
        localStorage.setItem('userId', data.userId); // Save userId
        setTimeout(() => {
          navigate('/select-genres');
        }, 1000);        
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    }
  };
  

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Register</h2>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Fullname"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>
        </form>

        {error && <p className="mt-4 text-red-400">{error}</p>}
        {success && <p className="mt-4 text-green-400">{success}</p>}

        <p className="mt-6 text-sm text-white">
          Already have an account?{' '}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
