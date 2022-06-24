import "./ProjectList.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProjectList({ projects }) {
  const { user } = useAuthContext();
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.title}</td>
                <td>{p.dueDate.toDate().toDateString()}</td>
                <td>{p.assignedUsersList.length}</td>
                <td>
                  <>
                    <Link
                      className="edit-project"
                      to={`/projects/${p.id}`}
                      style={{
                        position: "unset",
                      }}
                    >
                      view
                    </Link>
                    {user.uid === p.createdBy.id && (
                      <Link
                        to={`/projects/edit/${p.id}`}
                        className="edit-project"
                        style={{
                          position: "unset",
                        }}
                      >
                        edit
                      </Link>
                    )}
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
