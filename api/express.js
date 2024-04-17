const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors());

// User Registration
app.post('/api/register', async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex('users').insert({ first_name, last_name, username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex('users').where({ username }).first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ userID: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Creation
app.post('/api/items', async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;
  try {
    await knex('items').insert({ user_id, item_name, description, quantity });
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Retrieval (Multiple Items)
app.get('/api/items', async (req, res) => {
  try {
    const items = await knex('items').select('id', 'item_name', 'description', 'quantity');
    items.forEach(item => {
      item.description = item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description;
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Retrieval (Multiple Items for a User)
app.get('/api/items/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const items = await knex('items').where({ user_id: userId }).select('id', 'item_name', 'description', 'quantity');
    items.forEach(item => {
      item.description = item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description;
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Retrieval (Single Item)
app.get('/api/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await knex('items').where({ id: itemId }).first();
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Editing
app.put('/api/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const { item_name, description, quantity } = req.body;
  try {
    await knex('items').where({ id: itemId }).update({ item_name, description, quantity });
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Item Deletion
app.delete('/api/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  try {
    await knex('items').where({ id: itemId }).del();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Retrieval (For Testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await knex('users').select('id', 'first_name', 'last_name', 'username');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root Route (For Testing)
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});