import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EntireInventory() {
  const [userInventory, setUserInventory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/items`)
      .then(response => response.json())
      .then(data => {
        setUserInventory(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

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

export default EntireInventory;
