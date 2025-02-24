import React, { useEffect, useState } from 'react';

import { getTasks, deleteTask, updateTask } from '../../services/taskService';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState<any>(null);

  useEffect(() => {
    async function fetchTasks() {
      const response = await getTasks();
      setTasks(response.data);
    }
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  const handleEdit = (task: any) => {
    setEditingTask(task);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(editingTask.id, editingTask.title, editingTask.description, editingTask.iscomplete);
    setEditingTask(null);
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingTask((prev: any) => ({
      ...prev,
      [name]: name === 'iscomplete' ? value === 'true' : value,
    }));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task: any) => (
          console.log(task),
          <li key={task.id}>
            {task.title} - {task.description} - {task.iscomplete ? 'Completed' : 'Not Completed'}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleEdit(task)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingTask && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Title</label>
            <input type="text" name="title" value={editingTask.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" value={editingTask.description} onChange={handleChange} />
          </div>
          <div>
            <label>Status</label>
            <select name="iscomplete" value={editingTask.iscomplete} onChange={handleChange}>
              <option value="true">Completed</option>
              <option value="false">Not Completed</option>
            </select>
          </div>
          <button type="submit">Update Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskList;