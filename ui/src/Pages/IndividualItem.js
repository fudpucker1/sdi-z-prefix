import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function IndividualItem() {
  const { loggedIn } = useContext(AuthContext);

  const { itemId } = useParams();
  const [inventoryItem, setInventoryItem] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${itemId}`)
      .then(response => response.json())
      .then(data => {
        setInventoryItem(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Individual Item</h1>
      <div className="header">
        <div className="header-item">Item Name</div>
        <div className="header-item">Description</div>
        <div className="header-item">Quantity</div>
      </div>
      <div className="item-details">
        <p>Item Name: {inventoryItem.item_name}</p>
        <p>Description: {inventoryItem.description}</p>
        <p>Quantity: {inventoryItem.quantity}</p>
      </div>
      {loggedIn ? <Link to="/inventory-manager">Back</Link> : <Link to="/full-inventory">Back</Link>}
    </div>
  );
}

export default IndividualItem;