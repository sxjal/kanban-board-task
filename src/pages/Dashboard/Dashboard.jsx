import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import DisplayDropdown from "../../components/DisplayDropdown/DisplayDropdown";
import CardsList from "../../components/CardsList/CardsList";
import MenuIcon from "/icons/3 dot menu.svg";
import AddIcon from "/icons/add.svg";
import BacklogIcon from "/icons/Backlog.svg";
import CancelledIcon from "/icons/Cancelled.svg";
import DoneIcon from "/icons/Done.svg";
import HighPriorityIcon from "/icons/Img - High Priority.svg";
import LowPriorityIcon from "/icons/Img - Low Priority.svg";
import MediumPriorityIcon from "/icons/Img - Medium Priority.svg";
import InProgressIcon from "/icons/in-progress.svg";
import NoPriorityIcon from "/icons/No-priority.svg";
import UrgentPriorityColorIcon from "/icons/SVG - Urgent Priority colour.svg";
// import UrgentPriorityGreyIcon from "/icons/SVG - Urgent Priority grey.svg";
import TodoIcon from "/icons/To-do.svg";
import "./Dashboard.css";

const URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const groupIconMap = {
  Backlog: BacklogIcon,
  Cancelled: CancelledIcon,
  Done: DoneIcon,
  High: HighPriorityIcon,
  Low: LowPriorityIcon,
  Medium: MediumPriorityIcon,
  "In progress": InProgressIcon,
  "No priority": NoPriorityIcon,
  Urgent: UrgentPriorityColorIcon,
  Todo: TodoIcon,
};

function Dashboard() {
  const [data, isLoading, error] = useFetchData(URL);
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("priority");

  const users = data?.users;
  const tickets = data?.tickets;

  const handleGroupingChange = (group) =>
    setSelectedGrouping(group.toLowerCase());
  const handleOrderingChange = (order) =>
    setSelectedOrdering(order.toLowerCase());

  const groupedTickets = groupTickets(tickets, users, selectedGrouping);
  const orderedTickets = orderTickets(groupedTickets, selectedOrdering);

  return (
    <div>
      <header>
        <nav className="navigation">
          <DisplayDropdown
            selectedGrouping={selectedGrouping}
            selectedOrdering={selectedOrdering}
            onGroupingChange={handleGroupingChange}
            onOrderingChange={handleOrderingChange}
          />
        </nav>
      </header>

      <div className="kanban-board">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data...</p>}
        {!isLoading && !error && (
          <div className="kanban-columns">
            {Object.keys(orderedTickets).map((group) => (
              <div key={group} className="kanban-column">
                <div className="kanban-column-header">
                  <div className="kanban-column-header-left">
                    {groupIconMap[group] && (
                      <img
                        src={groupIconMap[group]}
                        alt={group}
                        className="kanban-icon"
                      />
                    )}
                    <span className="kanban-column-title">{group}</span>
                    <span className="text-gray">
                      {orderedTickets[group].length}
                    </span>
                  </div>
                  <div className="kanban-column-header-right">
                    <img src={AddIcon} className="icon" alt="add" />
                    <img src={MenuIcon} className="icon" alt="dots" />
                  </div>
                </div>
                <CardsList tickets={orderedTickets[group]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const groupTickets = (tickets, users, grouping) => {
  if (!tickets) return {};

  const groups = {};
  tickets.forEach((ticket) => {
    let groupKey = "";

    if (grouping === "status") {
      groupKey = ticket.status || "No Status";
    } else if (grouping === "user") {
      const user = users?.find((u) => u.id === ticket.userId);
      groupKey = user ? user.name : "No User";
    } else if (grouping === "priority") {
      switch (ticket.priority) {
        case 0:
          groupKey = "No Priority";
          break;
        case 1:
          groupKey = "Urgent";
          break;
        case 2:
          groupKey = "High";
          break;
        case 3:
          groupKey = "Medium";
          break;
        case 4:
          groupKey = "Low";
          break;
        default:
          groupKey = "No priority";
      }
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }

    groups[groupKey].push(ticket);
  });

  return groups;
};

const orderTickets = (groupedTickets, ordering) => {
  if (!groupedTickets) return {};

  const orderedGroups = {};
  Object.keys(groupedTickets).forEach((group) => {
    orderedGroups[group] = [...groupedTickets[group]].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority; // Sort by descending priority
      } else if (ordering === "title") {
        return a.title.localeCompare(b.title); // Sort alphabetically by title
      }
      return 0;
    });
  });

  return orderedGroups;
};

export default Dashboard;
