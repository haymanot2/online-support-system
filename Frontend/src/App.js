import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/login/login';
import CreateTicket from './pages/create/CreateTicket';
import TicketList from './pages/ticketList/TicketList';
import UpdateTicket from './pages/update/UpdateTicket';
import Home from "./pages/Home/home";
import ViewDetail from './pages/view/ViewDetail';
import Header from './components/Header/header'
import axios from "axios";


import "./App.css";

function App() {
  const [token, setToken] = useState(null);


  return (
    <Router>
      <div className="wrapper">
        <Header  token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login token={token} setToken={setToken}  />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/getall" element={<TicketList />} />
          <Route path="/updateticket/:_id" element={<UpdateTicket />} />
          <Route path="/getall/:_id" element={<ViewDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;