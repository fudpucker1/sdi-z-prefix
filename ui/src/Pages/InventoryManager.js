import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function InventoryManager() {
  const { userID } = useContext(AuthContext);
  const [userInventory, setUserInventory] = useState([]);
  const [newItemData, setNewItemData] = useState({ item_name: '', description: '', quantity: '', user_id: userID });

  useEffect(() => {
    if (userID) {
      console.log(userID)
      fetch(`http://localhost:3000/api/items/user/${userID}`)
        .then(response => response.json())
        .then(data => {
          setUserInventory(data);
        })
        .catch(error => console.error('Error:', error));
    }
  }, [userID, newItemData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItemData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItemData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewItemData({ item_name: '', description: '', quantity: '' });
    })
    .catch(error => {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    });
  };

  return (
    <div className="inventory-list">
      <center>
      <h1>Inventory Manager</h1>

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

        <div style={{ paddingTop: '20px' }}>
          <h3 style={{ width: '80%' }}>Create New Item</h3>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th className="item-name">Item Name</th>
                  <th className="item-desc">Description</th>
                  <th className="quantity">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="item-name">
                    <input type="text" name="item_name" placeholder="Item Name" value={newItemData.item_name} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }} />
                  </td>
                  <td className="item-desc">
                    <input type="text" name="description" placeholder="Description" value={newItemData.description} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }}/>
                  </td>
                  <td className="quantity">
                    <input type="number" name="quantity" placeholder="Quantity" value={newItemData.quantity} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Submit</button>
          </form>
        </div>
      </center>
    </div>

  );
}

export default InventoryManager;
