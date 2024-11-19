import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const Sidebar = () => {
  const { uncompletedTaskCount, activeSection, setActiveSection } = useContext(TaskContext);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <nav id="navbar">
      <ul>
        <li
          onClick={() => handleSectionClick('Inbox')}
          className={activeSection === 'Inbox' ? 'active' : ''}
        >
          <img src="assets/inbox_icon.png" alt="Inbox" />
          Inbox <span className="task-count">({uncompletedTaskCount})</span>
        </li>
        <li
          onClick={() => handleSectionClick('Upcoming')}
          className={activeSection === 'Upcoming' ? 'active' : ''}
        >
          <img src="assets/upcoming_icon.png" alt="Upcoming" />
          Upcoming <span className="task-count">(3)</span>
        </li>
        <li
          onClick={() => handleSectionClick('Calendar')}
          className={activeSection === 'Calendar' ? 'active' : ''}
        >
          <img src="assets/calendar_icon.png" alt="Calendar" />
          Calendar <span className="task-count">(2)</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
