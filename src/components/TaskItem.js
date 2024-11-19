import React, { useContext, useState } from 'react';
import TaskContext from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { toggleTaskCompletion, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const handleToggle = () => {
    toggleTaskCompletion(task.id);
  };

  const handleBlur = () => {
    if (taskTitle.trim() !== task.title) {
      editTask(task.id, taskTitle);
    }
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="radio"
        checked={task.completed}
        onChange={handleToggle}
      />
      {isEditing ? (
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          autoFocus
          className="task-edit-input"
        />
      ) : (
        <label
          className="task-label"
          onClick={() => setIsEditing(true)}
        >
          {task.title}
        </label>
      )}
    </li>
  );
};

export default TaskItem;
