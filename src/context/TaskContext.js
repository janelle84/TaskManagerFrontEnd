import React, { createContext, useState, useEffect } from 'react';

// Create a context for tasks to be used by the TaskProvider
const TaskContext = createContext();

// Provider component for managing task state and actions
export const TaskProvider = ({ children }) => {
  // State for tasks, initialized with data from localStorage or an empty array
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // New state for active section
  const [activeSection, setActiveSection] = useState('Inbox');

  // State for task filter query, total task count, and uncompleted task count
  const [filterQuery, setFilterQuery] = useState('');
  const [totalTaskCount, setTotalTaskCount] = useState(0);
  const [uncompletedTaskCount, setUncompletedTaskCount] = useState(0);

  // Update task counts and save tasks to localStorage whenever tasks change
  useEffect(() => {
    updateTaskCounts();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Update the tasks state and persist to localStorage
  const saveTasks = (newTasks) => {
    setTasks(newTasks);
  };

  // Add a new task with the given title
  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false, isVisible: true };
    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  // Toggle the completion status of a task by its ID, with delayed visibility update
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);

    // Toggle task visibility after 800ms delay for smooth UX
    setTimeout(() => {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === id
            ? { ...task, isVisible: !task.completed }
            : task
        )
      );
    }, 800);
  };

  // Edit the title of a task by its ID
  const editTask = (id, newTitle) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    saveTasks(updatedTasks);
  };

  // Update total and uncompleted task counts based on current tasks
  const updateTaskCounts = () => {
    const total = tasks.length;
    const uncompleted = tasks.filter(task => !task.completed).length;
    setTotalTaskCount(total);
    setUncompletedTaskCount(uncompleted);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      activeSection,
      setActiveSection, // Expose function to update active section
      filterQuery,         // Filter for searching tasks
      setFilterQuery,      // Setter for task filter
      totalTaskCount,
      uncompletedTaskCount,
      addTask,
      toggleTaskCompletion,
      editTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

// Uncomment the line below to clear localStorage for tasks during development
// localStorage.clear();
