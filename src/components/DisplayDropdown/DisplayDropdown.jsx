import React, { useState } from "react";
import displayIcon from "/icons/Display.svg";
import downArrowIcon from "/icons/down.svg";
import "./DisplayDropdown.css";

function DisplayDropdown({
  selectedGrouping,
  selectedOrdering,
  onGroupingChange,
  onOrderingChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img src={displayIcon} alt="Display" />
        <span>Display</span>
        <img src={downArrowIcon} alt="Dropdown Arrow" />
      </button>

      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="dropdown-grouping">
            <label>Grouping</label>
            <select
              value={selectedGrouping}
              onChange={(e) => {
                onGroupingChange(e.target.value);
                toggleDropdown();
              }}
            >
              <option value="status">By Status</option>
              <option value="user">By User</option>
              <option value="priority">By Priority</option>
            </select>
          </div>

          <div className="dropdown-ordering">
            <label>Ordering</label>
            <select
              value={selectedOrdering}
              onChange={(e) => {
                onOrderingChange(e.target.value);
                toggleDropdown();
              }}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayDropdown;
