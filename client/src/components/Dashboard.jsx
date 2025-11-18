// client/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const fetchTasks = async () => {
    try {
      // GET /tasks fetches all tasks for the authenticated user
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (e) {
      console.error('Error fetching tasks:', e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskDescription.trim()) return;
    try {
      // POST /tasks creates a new task
      await api.post('/tasks', { description: newTaskDescription });
      setNewTaskDescription('');
      fetchTasks(); // Refresh list
    } catch (e) {
      console.error('Error creating task:', e);
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      // PATCH /tasks/:id updates a task
      await api.patch(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks(); // Refresh list
    } catch (e) {
      console.error('Error updating task:', e);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      // DELETE /tasks/:id deletes a task
      await api.delete(`/tasks/${id}`);
      fetchTasks(); // Refresh list
    } catch (e) {
      console.error('Error deleting task:', e);
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <form onSubmit={handleCreateTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          required
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ 
            padding: '10px', 
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span 
              style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                flexGrow: 1
              }}
            >
              {task.description}
            </span>
            <div>
              <button onClick={() => handleToggleCompleted(task)} style={{ marginRight: '10px' }}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button onClick={() => handleDeleteTask(task._id)} style={{ background: 'red', color: 'white' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p>You have no tasks! Start by adding one above.</p>}
    </div>
  );
};

export default Dashboard;