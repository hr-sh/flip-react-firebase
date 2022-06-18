import "./ProjectList.css";
import { Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  return (
    <div className="list-view">
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Due date</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>
                  <Link
                    className="project-link"
                    to={`/projects/${p.id}`}
                    key={p.id}
                  >
                    {p.title}
                  </Link>
                </td>
                <td>{p.dueDate.toDate().toDateString()}</td>
                <td>{p.assignedUsersList.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
