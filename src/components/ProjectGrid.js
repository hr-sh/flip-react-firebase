import "./ProjectGrid.css";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProjectGrid({ projects }) {
  const { user } = useAuthContext();
  return (
    <div>
      {projects.length === 0 && (
        <p style={{ marginTop: "10px" }}>No projects yet.</p>
      )}
      <div className="project-list">
        {projects.map((d) => (
          <div className="project-card" key={d.id}>
            <Link to={`/projects/${d.id}`} style={{ textDecoration: "none" }}>
              <h4>{d.title}</h4>

              <p>Due by {d.dueDate.toDate().toDateString()} </p>
            </Link>
            <div className="assigned-users">
              <ul>
                {d.assignedUsersList.map((user) => (
                  <li key={user.id}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
            {user.uid === d.createdBy.id && (
              <Link to={`/projects/edit/${d.id}`} className="edit-project">
                edit
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
