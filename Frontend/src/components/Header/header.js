import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const {token,setToken}=props
    const navigate = useNavigate();
const handleLogin=()=>{
navigate("login")
}
    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
    navigate("/")
        // Set the token in the component state to null
        setToken(null);
      };
    return (
        <div className="header">
            <Link to="/" className="header__logo">ONLINE SUPPORT SYSTEM</Link>
            {token ?<>
            <button onClick={handleLogout} className="login">logout</button>
            </>:<>
            <button onClick={handleLogin} className="login">Login as Admin</button>
            </>}
        </div>
    )
}

export default Header