import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';

const Header = () => {
  const { tasks, uncompletedTaskCount, filterQuery, setFilterQuery } = useContext(TaskContext);

  // Toggle sidebar and shift main content
  const handleMenuToggle = () => {
    const navbar = document.getElementById("navbar");
    const mainContent = document.getElementById("mainContent");

    // Toggle sidebar display
    if (navbar.style.display === "none") {
      navbar.style.display = "block";
      mainContent.classList.remove("full-width");
    } else {
      navbar.style.display = "none";
      mainContent.classList.add("full-width");
    }
  };

  return (
    <header>
      <img
        src="assets/menu_icon.png"
        alt="Menu"
        className="menu-icon"
        onClick={handleMenuToggle}
      />
      <div className="quick-find">
        <input
          type="text"
          placeholder="Quick find"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      <img src="assets/search_icon.png" alt="Search" className="search-icon" />
      <img src="assets/check_icon.png" alt="Check" className="check-icon" />
      <div className="task-count-display">
        {tasks.length}/{uncompletedTaskCount}
      </div>
    </header>
  );
};

export default Header;
