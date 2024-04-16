import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function InventoryManager() {
  const { userID } = useContext(AuthContext);
  const [userInventory, setUserInventory] = useState([]);

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:3000/api/items/user/${userID}`)
        .then(response => response.json())
        .then(data => {
          setUserInventory(data);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [userID]);

  return (
    <div className="inventory-list">
      <h1>Inventory Manager</h1>
      <div className="header">
        <div className="header-item">Item Name</div>
        <div className="header-item">Description</div>
        <div className="header-item">Quantity</div>
      </div>
      <ul>
        {userInventory.map(item => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>
              {item.item_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;
