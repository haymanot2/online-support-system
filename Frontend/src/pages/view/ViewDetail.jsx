import React,{useState,useEffect} from 'react'
import axios from "axios"
import { useParams,Link } from 'react-router-dom'
import "./view.css"
 
function  ViewDetail() {
  const [cate,setCate]=useState({})
  const {_id}=useParams()

  useEffect(()=>{ 
    axios.get(`http://localhost:5000/api/get/${_id}`).then((resp)=>
    {
      
      setCate(resp.data)
    })
  },[_id, cate.respond])
 

  return (
    
    <div  className='view'>
     
          <p>Ticket Detail</p>
        
      <div className="ten">
      
      
          <div className='detail-text'>
        <span>
        <strong>email:</strong>
          <span>{cate.email}</span>
           <br />
           <br />
        </span>
          <span>
          <strong>phoneNumber:</strong>
          <span>{cate?.phoneNumber}</span>
           <br />
           <br />
          </span>
          <span>
          <strong>problemDescription:</strong>
          <span>{cate?.problemDescription}</span>
           <br />
           <br />
          </span>
          <span>
          <strong>respond:</strong>
          <span>{cate?.respond}</span>
           <br />
           <br />
          </span>

           </div>
           
        
      </div>
      
    </div>
    
  )
  
}

export default ViewDetail