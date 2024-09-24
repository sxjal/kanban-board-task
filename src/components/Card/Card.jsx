import "./Card.css";
import BacklogIcon from "/icons/Backlog.svg";
import CancelledIcon from "/icons/Cancelled.svg";
import DoneIcon from "/icons/Done.svg";
import HighPriorityIcon from "/icons/Img - High Priority.svg";
import LowPriorityIcon from "/icons/Img - Low Priority.svg";
import MediumPriorityIcon from "/icons/Img - Medium Priority.svg";
import InProgressIcon from "/icons/in-progress.svg";
import NoPriorityIcon from "/icons/No-priority.svg";
import UrgentPriorityColorIcon from "/icons/SVG - Urgent Priority colour.svg";
import TodoIcon from "/icons/To-do.svg";

// Mapping of status to icons
const statusIconMap = {
  Backlog: BacklogIcon,
  Cancelled: CancelledIcon,
  Done: DoneIcon,
  High: HighPriorityIcon,
  Low: LowPriorityIcon,
  Medium: MediumPriorityIcon,
  "In Progress": InProgressIcon,
  "No Priority": NoPriorityIcon,
  Urgent: UrgentPriorityColorIcon,
  Todo: TodoIcon,
};

function Card({ id, title, tags, status }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-header">
          <span className="card-id text-gray">{id}</span>
          {/* Avatar goes here - not given */}
        </div>
        <div className="card-title">
          <img
            src={statusIconMap[status] || TodoIcon}
            alt={status}
            className="status-icon"
          />
          {title}
        </div>
      </div>
      <div className="card-tags text-gray">
        {tags &&
          tags.map((tag, index) => (
            <span className="tag" key={index}>
              <span className="circle"></span>
              <span>{tag}</span>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Card;
