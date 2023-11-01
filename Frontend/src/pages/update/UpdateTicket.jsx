import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './update.css';
import ViewDetail from '../view/ViewDetail';
const initialState = {

  response:""
};

function AddEditCategory() {
  const [state, setState] = useState(initialState);
  const [loading,setLoading]=useState('')
  const { respond } = state;
  const navigate = useNavigate();
  const {_id}=useParams()
console.log(_id)
useEffect(() => {
  axios.get(`http://localhost:5000/api/get/${_id}`)
    .then((resp) => {
      const data = resp.data[0];
      if (data) {
        setState({ ...data });
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
    });
}, [_id]);

// ...

if (loading) {
  return <div>Loading...</div>;
}
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!respond ) {
      alert('Please provide a value for each input field.');
    } else {
      if (!_id) {
        // Perform validation
        if (!respond) {
          alert('Please fill in all fields.');
        
        } else {
          // Submit form data
          const formData = {
          
            respond
          };

          axios
            .post('http://localhost:5000/api/save', formData)
            .then(() => {
              alert('Form submitted successfully!');
              // Reset form
              setState(initialState);
            })
            .catch((error) => {
              alert('An error occurred while submitting the form.');
              console.error(error);
            });
        }
      } else {
        axios
          .put(`http://localhost:5000/api/update/${_id}`, {
           
            respond
          })
          .then(() => {
            setState(initialState);
          })
          .catch((err) => {
            alert(err.response.data);
          });
      }

      setTimeout(() => {
        
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

 

  return (
    <div className="update">
      <div className='ticketDetail' >
      <ViewDetail/>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <div className='respond-update'>
          <p>response</p>
          <input
            className='update-input'
            type="text"
            id="respond"
            name="respond"
            placeholder="respond..."
            value={respond || ''}
            onChange={handleInputChange}
          />
          
        

        
          <input className='updatebutton' type="submit" value={_id ? 'Reply' : 'Save'} />
          
          </div>
      </form>
    </div>
    
    
  );
}

export default AddEditCategory;