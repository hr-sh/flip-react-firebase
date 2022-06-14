import "./ProjectList.css";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.length === 0 && (
        <p style={{ marginTop: "10px" }}>No projects yet.</p>
      )}
      <div className="project-list">
        {projects.map((d) => (
          <Link className="project-card" to={`/projects/${d.id}`} key={d.id}>
            <h4>{d.title}</h4>
            <p>Due by {d.dueDate.toDate().toDateString()} </p>
            <div className="assigned-users">
              <ul>
                {d.assignedUsersList.map((user) => (
                  <li key={user.id}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
