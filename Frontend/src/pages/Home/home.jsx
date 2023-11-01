import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../components/Search/search';
// import JobList from '../JobList/jobList';
import header_image from '../../assets/header_image.png';
import './home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome">
        <img src={header_image} className="welcome__img" alt="header image" />
        <h1 className="welcome__text">Customer Care Corner</h1>
      </div>
      <Search />
    </div>
  );
}

export default Home;