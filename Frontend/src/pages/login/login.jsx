import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import login_img from '../../assets/login_img.png';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setToken}=props
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Login successful
        setError('');
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem('token', token);

        // Set the token in the component state
        setToken(token);

        console.log('Login successful!');
        navigate('/getall');
      } else {
        // Login failed, display an error message
        setError('Invalid email or password');
      }
    } catch (error) {
      // An error occurred during login
      setError('An error occurred during login');
      console.error(error);
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Set the token in the component state to null
    setToken(null);
  };

  return (
    <div className="login__wrapper">
      <div className="ask__header">
        <img src={login_img} className="login__img" alt="ask support" />
        <span className="header__logo">Login as Admin</span>
      </div>
    <div className="login__container">
      <h1 className="login-text">Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="label">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="enter your email"
          />
        </div>
        <div className="form__group">
          <label className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="enter your password"
          />
        </div>
        <div>
          <button type="submit" className="login__btn">Login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;