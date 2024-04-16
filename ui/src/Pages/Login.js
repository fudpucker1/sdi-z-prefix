import '../css/Login.css';
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setToken, setUserID } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      username: userName,
      password: userPassword
    }

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
    .then(async (res) => {
      if (res.status === 200) {
        const response = await res.json();
        //setToken(response.token);
        setUserID(response.userID);
        navigate('/inventory-manager');
      } else {
        const errorMessage = await res.text();
        alert(`Error: ${errorMessage}`);
        console.log(`Username: ${loginData.username}, Password: ${loginData.password}`)
      }
    });
  };

  return (
    <div className="log-form">
      <h2>Login to your account</h2>
      <form>
        <input type="text" title="username" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
        <input type="password" title="username" placeholder="password" onChange={(e) => setUserPassword(e.target.value)}/>
        <button type="submit" className="btn" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
