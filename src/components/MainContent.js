import React, { useContext, useState } from 'react';
import TaskList from './TaskList';
import TaskContext from '../context/TaskContext';

const MainContent = () => {
  const { addTask, activeSection } = useContext(TaskContext);
  const [showInput, setShowInput] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle('');
      setShowInput(false);
    }
  };

  return (
    <main id="mainContent">
      <h1>{activeSection}</h1>
      {activeSection === 'Inbox' && <TaskList />} {/* Render TaskList only for Inbox */}
      {activeSection === 'Upcoming' && <p>Upcoming tasks here...</p>}
      {activeSection === 'Calendar' && <p>Calendar view here...</p>}

      {activeSection === 'Inbox' && showInput ? (
        <div id="taskInputContainer">
          <input
            type="text"
            id="newTaskInput"
            placeholder="Task name"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            autoFocus
          />
          <div className="task-buttons">
            <button id="cancelButton" onClick={() => setShowInput(false)}>Cancel</button>
            <button id="addTaskButton" onClick={handleAddTask}>Add task</button>
          </div>
        </div>
      ) : activeSection === 'Inbox' && (
        <div id="addTaskContainer" onClick={() => setShowInput(true)}>
          <img src="assets/add_task_icon.png" alt="Add task" className="add-task-icon" />
          <span className="add-task-text">Add task</span>
        </div>
      )}
    </main>
  );
};

export default MainContent;
