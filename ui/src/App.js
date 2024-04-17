import './App.css';
import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import InventoryManager from './Pages/InventoryManager';
import NewItem from './Pages/NewItem';
import IndividualItem from './Pages/IndividualItem';
import FullInventory from './Pages/FullInventory';
import CreateAccount from './Pages/CreateAccount';
import { AuthContext } from './Pages/AuthContext';
import HomeIcon from './Pages/images/home-icon.jpg';

function App() {
  const { loggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='App'>
      <nav>
        <div className='home-image'>
          <Link to="/">
            <img src={HomeIcon} alt="homepageicon" />
          </Link>
        </div>
        <div className='navbar'>
          {!loggedIn ? (
            <ul>
              <li className="full-inventory"><Link to="/full-inventory">Browse Items</Link></li>
              <li className="login-item"><Link to="/login">Login</Link></li>
            </ul>
          ) : (
            <ul>
              <li className="full-page"><Link to="/full-inventory">Full Inventory</Link></li>
              <li className="manager-inventory"><Link to="/inventory-manager">Your Inventory</Link></li>
              <li className="create-account"><Link to="/create-account">Create Account</Link></li>
              <li className="logout-item"><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
          )}
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/inventory-manager' element={<InventoryManager/>} />
        <Route path='/new-item' element={<NewItem/>} />
        <Route path='/item/:itemId' element={<IndividualItem/>} />
        <Route path='/full-inventory' element={<FullInventory/>} />
        <Route path='/create-account' element={<CreateAccount/>} />
      </Routes>
    </div>
  );
}

export default App;
