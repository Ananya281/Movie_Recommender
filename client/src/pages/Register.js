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
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="bg-white bg-opacity-10 p-8 rounded-xl w-full max-w-md text-white shadow-lg backdrop-blur-md">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Register</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition duration-200 font-semibold"
            >
              Register
            </button>
          </form>

          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          {success && <p className="mt-4 text-green-400 text-sm">{success}</p>}

          <p className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-red-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;