import React, { useContext } from 'react';
import TaskItem from './TaskItem';
import TaskContext from '../context/TaskContext';

const TaskList = () => {
  const { tasks, filterQuery } = useContext(TaskContext);

  return (
    <ul className="tasks">
      {tasks
        .filter(task => 
          task.isVisible && 
          task.title.toLowerCase().includes(filterQuery.toLowerCase())
        )
        .map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
    </ul>
  );
};

export default TaskList;
