import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function IndividualItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const [inventoryItem, setInventoryItem] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/items/${itemId}`)
      .then(response => response.json())
      .then(data => {
        setInventoryItem(data);
      })
      .catch(error => console.error('Error:', error));
  }, [itemId]);

  const handleEditModeToggle = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventoryItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    fetch(`http://localhost:3000/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inventoryItem),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setEditMode(false);
    })
    .catch(error => {
      console.error('Error updating item:', error);
      alert('Error updating item. Please try again.');
    });
  };

  const handleDelete = async () => {

    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/items/${itemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        navigate(-1)

      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      }
    }

  };

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
            {inventoryItem && (
              <tr>
                <td className="item-name">
                  {editMode ? (
                    <input
                      type="text"
                      name="item_name"
                      value={inventoryItem.item_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    inventoryItem.item_name
                  )}
                </td>
                <td className="item-desc">
                  {editMode ? (
                    <input
                      type="text"
                      name="description"
                      value={inventoryItem.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    inventoryItem.description
                  )}
                </td>
                <td className="quantity">
                  {editMode ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <input
                        type="number"
                        name="quantity"
                        value={inventoryItem.quantity}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleDelete}>Delete</button>
                    </div>
                  ) : (
                    inventoryItem.quantity
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loggedIn && (
          <>
            {!editMode ? (
              <button onClick={handleEditModeToggle}>Edit</button>
            ) : (
              <>
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleEditModeToggle}>Cancel</button>
              </>
            )}
          </>
        )}
        <button onClick={() => navigate(-1)}>Back</button>
      </center>
    </div>
  );
}

export default IndividualItem;
