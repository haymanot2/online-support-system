import React, { useState } from 'react';
import axios from 'axios';
import './create.css';
import ask_support from '../../assets/ask_support.png';
import { useParams, useNavigate } from 'react-router-dom';

function CreateTicket() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [response, setResponse] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    problemDescription: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    let formValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      phoneNumber: '',
      problemDescription: '',
    };

    if (!fullName) {
      newErrors.fullName = 'Please enter your full name.';
      formValid = false;
    }

    if (!email) {
      newErrors.email = 'Please enter your email address.';
      formValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
      formValid = false;
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Please enter your phone number.';
      formValid = false;
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
      formValid = false;
    }

    if (!problemDescription) {
      newErrors.problemDescription = 'Please enter a problem description.';
      formValid = false;
    }

    setErrors(newErrors);

    if (formValid) {
      // Submit form data
      const formData = {
        fullName,
        email,
        phoneNumber,
        problemDescription,
      };

      axios
        .post('http://localhost:5000/api/save', formData)
        .then((res) => {
          console.log(formData);
          const { id } = res.data; // Access the message and ID from the response
          setResponse(`Form submitted successfully!
             Here is your reference ID: ${id}`);
          // Reset form
          setFullName('');
          setEmail('');
          setPhoneNumber('');
          setProblemDescription('');
        })
        .catch((error) => {
          setResponse('An error occurred while submitting the form.');
          console.error(error);
        });
    }
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Basic phone number validation regex
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className="create">
      <div className="ask__header">
          <img src={ask_support} className="ask__img" alt="ask support"/>
          <span className="header__logo">Create New Ticket</span>
      </div>
     {!response ? (
      <div className="container">
        <h1> New Ticket</h1>
          <div>
            <form onSubmit={handleSubmit} className="form__container">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='enter your full name'
                />
                {errors.fullName && <span className="error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='enter your email'
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='enter your phone number'
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              </div>
              <div className="form-group">
                <label>Problem Description</label>
                <input
                  className="form-control"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder='enter your problem description'
                />
                {errors.problemDescription && <span className="error">{errors.problemDescription}</span>}
              </div>
              <button type="submit" className="createbutton">
                Submit
              </button>
            </form>
          </div>
    </div>
        ) : (
          <div className='response-container'>
            <p className="response">{response}</p>
          </div>
        )}
      </div>
  );
}

export default CreateTicket;