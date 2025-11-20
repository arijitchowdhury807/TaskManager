import React, { useEffect, useState } from "react";
import "../styles/Tasks.css";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data.tasks || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!form.title.trim()) return alert("Title is required");

    try {
      const res = await fetch("http://localhost:4000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setTasks([data.task, ...tasks]);
        setForm({ title: "", description: "", completed: false });
        setShowForm(false); 


        
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    await fetch(`http://localhost:4000/api/v1/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !task.completed }),
    });

    setTasks(
      tasks.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="task-container">
      {/* NAVBAR */}
      <nav className="task-navbar">
        <h2>Task Manager</h2>
        <div>
          <button className="add-task-toggle" onClick={() => setShowForm(true)}>
            Add Task
          </button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="task-content">
        <h1 className="headline">Your Tasks</h1>

        {/* Task Form */}
        {showForm && (
          <div className="task-form-card">
            <h2>Add New Task</h2>

            <input
              type="text"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Task Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.completed}
                onChange={(e) =>
                  setForm({ ...form, completed: e.target.checked })
                }
              />
              <span>Mark as Completed</span>
            </label>

            <div className="form-buttons">
              <button className="add-btn" onClick={addTask}>
                Add Task
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Task Grid */}
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-tasks">No tasks added yet.</p>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-card ${task.completed ? "done" : ""}`}
              >
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-card-buttons">
                  <button onClick={() => toggleComplete(task)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
