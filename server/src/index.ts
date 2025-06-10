import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Task } from '../src/Task';

const app = express();
app.use(cors({
    origin: ['http://localhost:8080', 'http://192.168.0.89:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.use(express.json());

const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// Initialize database
async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);
}

initializeDatabase();

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const db = await dbPromise;
    const users = await db.all(`
      SELECT 
        users.*,
        COUNT(tasks.id) as task_count
      FROM users
      LEFT JOIN tasks ON users.id = tasks.user_id
      GROUP BY users.id
    `);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const db = await dbPromise;
    const { name, email } = req.body;
    const result = await db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users/:userId/tasks', async (req, res) => {
  try {
    const db = await dbPromise;
    const tasks = await db.all(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/users/:userId/tasks', async (req, res) => {
  try {
    const db = await dbPromise;
    const userId = parseInt(req.params.userId);
    const { title, description } = req.body;
    
    const result = await db.run(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [userId, title, description]
    );

    const task: Task = {
      id: result.lastID!,
        user_id: userId,
      completed: false,
      title,
      description,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.put('/api/tasks/:taskId/toggle', async (req, res) => {
  try {
    const db = await dbPromise;
    const taskId = parseInt(req.params.taskId);
    
    const task = await db.get('SELECT status FROM tasks WHERE id = ?', [taskId]);
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    
    await db.run(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [newStatus, taskId]
    );
    
    res.json({ status: newStatus });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle task status' });
  }
});

app.put('/api/tasks/:taskId/status', async (req, res) => {
  try {
    const db = await dbPromise;
    const taskId = parseInt(req.params.taskId);
    const { status } = req.body;
    
    await db.run(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, taskId]
    );
    
    res.json({ status });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});