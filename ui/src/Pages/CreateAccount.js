import React, { useState,  } from 'react';


function CreateAccount() {
  const [newAccountData, setNewAccountData] = useState({first_name: '', last_name: '', username: '', password: ''});

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccountData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert(`Account with username: ${newAccountData.username} has been created.`)
      setNewAccountData({first_name: '', last_name: '', username: '', password: ''});
    })
    .catch(error => {
      console.error('Error creating account:', error);
      alert('Error creating account. Please try again.');
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAccountData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
  <div className="new-account-container">
    <center>
      <h1>Account Creation</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th className="first-name">First Name</th>
              <th className="last-name">Last Name</th>
              <th className="username">Username</th>
              <th className="password">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="first-name">
                <input type="text" name="first_name" placeholder="First Name" value={newAccountData.first_name} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }} />
              </td>
              <td className="last-name">
                <input type="text" name="last_name" placeholder="Last Name" value={newAccountData.last_name} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }}/>
              </td>
              <td className="username">
                <input type="text" name="username" placeholder="Username Ex.(first.last)" value={newAccountData.username} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }} />
              </td>
              <td className="password">
                <input type="text" name="password" placeholder="Password" value={newAccountData.password} onChange={handleInputChange} style={{ backgroundColor: '#f0f0f0' }} />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </center>
  </div>
  );
}

export default CreateAccount;