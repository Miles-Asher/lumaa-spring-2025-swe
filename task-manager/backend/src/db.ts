import pg from 'pg';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_management',
  password: 'postgres',
  port: 5432,
});

export async function addUser(username: string, password: string) {
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, password];
  await pool.query(query, values);
}

export async function getUser(username: string) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function getTasksByUserId(userId: string) {
  const query = 'SELECT * FROM tasks WHERE userId = $1';
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows;
}

export async function getAllTasks() {
  const query = 'SELECT * FROM tasks';
  const result = await pool.query(query);
  return result.rows;
}

export async function addTask(username: string, title: string, description: string) {
  const query = 'INSERT INTO tasks (userId, title, description) VALUES ($1, $2, $3)';
  const values = [username, title, description];
  await pool.query(query, values);
}

export async function updateTask(id: string, title: string, description: string, isComplete: boolean) {
  let query = 'UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4';
  const values = [title, description, isComplete, id];
  query += ' RETURNING *';
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function deleteTask(id: string) {
  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export default pool;
