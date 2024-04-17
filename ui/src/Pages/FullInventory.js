import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function FullInventory() {
  const [userInventory, setUserInventory] = useState([]);
  const { loggedIn } = useContext(AuthContext);

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
      <center>
        <table>
          <thead>
            <tr>
              <th className="item-name">Item Name</th>
              <th className="item-desc">Description</th>
              <th className="quantity">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {userInventory.map(item => (
              <tr key={item.id}>
                <td className="item-name">
                  <Link to={`/item/${item.id}`}>{item.item_name}</Link>
                </td>
                <td className="item-desc">{item.description}</td>
                <td className="quantity">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );

};

export default FullInventory;
