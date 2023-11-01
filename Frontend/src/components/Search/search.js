import React, { useState } from 'react';
import './search.css';
import searchIcon from './search.svg';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Search = () => {
  const [query, setQuery] = useState('');
  const [isfound,setIsFound]=useState(false)
  const [search,setSearch]=useState("")
  const navigate =useNavigate()

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/api/get/${search}`).then((resp)=>
      {
        setIsFound(true)
        setSearch(resp.data)
      })
  };

  const handleCreateTicketClick = () => {
    navigate("/create")
  };

  return (
  <div> {isfound ? <>
        <div  className='view'>
     
     <p>ticket detail</p>
   
 <div className="ten">
 
 
     <div className='detail-text'>
     
      <strong>email:</strong>
     <span>{search.email}</span>
      <br />
      <br />
      <strong>phoneNumber:</strong>
     <span>{search?.phoneNumber}</span>
      <br />
      <br />
      <strong>problemDescription:</strong>
     <span>{search?.problemDescription}</span>
      <br />
      <br />
      <strong>respond:</strong>
     <span>{search?.respond}</span>
      <br />
      <br />
      </div>
      
   
 </div>
 
</div></>:<><div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          placeholder="search by job title, location, company"
          value={query}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit">
          <img src={searchIcon} alt="search icon" className="search__icon" />
        </button>
      </form>
      <button className="create__ticket" onClick={handleCreateTicketClick}>
        Create Ticket
      </button>
    </div></>}</div>
    
  );
};

export default Search;