import { useDocument } from "../../hooks/useDocument";
import "./Project.css";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectComments from "./ProjectComments";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  const { data, error } = useDocument("projects", id);
  const { user } = useAuthContext();
  const { doDelete, isloading, error: deleteError } = useFirestore("projects");

  const history = useHistory();

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div className="loading">loading...</div>;
  }

  const handleDelete = () => {
    doDelete({ id: data.id });
    history.push("/");
  };

  return (
    <div className="project">
      {/* details */}
      <div className="project-details">
        <h2 className="page-title">{data.title}</h2>
        <p className="author">created by {data.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {data.dueDate.toDate().toDateString()}
        </p>
        <div className="details">{data.details}</div>
        <h4>Project is assigned to:</h4>
        <div className="assigned">
          {data.assignedUsersList.map((u) => {
            return (
              <div key={u.id} className="wrapper">
                <Avatar src={u.photoURL} />
                <span className="assignee-name">
                  {u.id === user.uid ? "me" : u.displayName}
                </span>
              </div>
            );
          })}
        </div>
        {user.uid === data.createdBy.id && (
          <>
            {!isloading && (
              <button onClick={handleDelete} className="btn delete">
                Delete project
              </button>
            )}
            {isloading && (
              <button className="btn" disabled>
                deleting..
              </button>
            )}
          </>
        )}

        {deleteError && <p className="error">{deleteError}</p>}
      </div>

      {/* comments */}
      <ProjectComments project={data} user={user} />
    </div>
  );
}
