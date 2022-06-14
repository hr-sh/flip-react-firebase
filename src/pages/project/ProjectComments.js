import { useState, useEffect } from "react";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({ project, user }) {
  const { isloading, error, success, doUpdate } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const c = {
      id: Math.random(),
      text: newComment,
      createdAt: timestamp.fromDate(new Date()),
      createdBy: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };
    doUpdate({
      data: {
        comments: [...project.comments, c],
      },
      id: project.id,
    });

    // console.log("current user: ", user);
    // console.log("created comment: ", c);
    // console.log("project:", project);
    // console.log("project id: " + project.id);
  };

  useEffect(() => {
    if (success) {
      // clear the form
      setNewComment("");
    }
  }, [success]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-comments-form">
        <h4>{project.comments.length} Comments</h4>
        <label>
          <span>Add new comment</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        {!isloading && <button className="btn">Add comment</button>}
        {isloading && (
          <button className="btn" disabled>
            saving..
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((c) => {
            return (
              <li className="comment" key={c.id}>
                <div className="author">
                  <Avatar src={c.createdBy.photoURL} />
                  <span>{c.createdBy.displayName}</span>
                  <span className="date">
                    {formatDistanceToNow(c.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <div className="text">{c.text}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
