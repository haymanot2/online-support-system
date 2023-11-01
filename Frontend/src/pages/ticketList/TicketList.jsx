import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/Pagination';
import './ticketlist.css';

function TicketList() {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketPerPage = 5;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false); // New state variable
  const [selectedStatus, setSelectedStatus] = useState(''); // New state variable

  const totalTicket = data.length;
  console.log(totalTicket);
  const indexOfLastTicket = currentPage * ticketPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketPerPage;
  const currentTicket = data.slice(indexOfFirstTicket, indexOfLastTicket);

  const loadData = async () => {
    const response = await axios.get('http://localhost:5000/api/get');
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteTicket = async (_id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      await axios.delete(`http://localhost:5000/api/delete/${_id}`);
      alert('Deleted successfully');
      setTimeout(() => loadData(), 500);
    }
  };

  const filteredData = data.filter((item) =>
    item.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='ticket-list-container'>
      <div className='ticketlist' style={{ marginTop: '50px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={() => setIsInputFocused(true)} // Set the isInputFocused state to true when the input is focused
          onBlur={() => setIsInputFocused(false)} // Set the isInputFocused state to false when the input loses focus
        />

        <table className="one">
          <thead className="two">
            <tr>
              <th style={{ textAlign: 'center' }}>No</th>
              <th style={{ textAlign: 'center' }}>Fullname</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>PhoneNumber</th>
              <th style={{ textAlign: 'center' }}>Problem Description</th>
              <th style={{ textAlign: 'center' }}>Status</th> {/* Added a table header for status */}
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody className="three">
            {(search !== '' && isInputFocused ? filteredData : currentTicket).map((item, index) => { // Use filteredData when the search input is not empty and focused, otherwise use currentTicket
              return (
                <tr key={item.categoryID}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.problemDescription}</td>
                  <td>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td className="six">
                    <Link className="five" to={`/updateticket/${item._id}`}>
                      Reply
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ticketPerPage={ticketPerPage}
        totalTicket={totalTicket}
      />
    </div>
  );
}

export default TicketList;