import "./OnlineUsers.css";
import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

export default function OnlineUsers() {
  const { data, error } = useCollection("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {data &&
        data.map((u) => (
          <div className="user-list-item" key={u.id}>
            <span>{u.displayName}</span>
            <div className="wrapper">
              <Avatar src={u.photoURL} />
              {u.online && <span className="user-status" title="online"></span>}
            </div>
          </div>
        ))}
    </div>
  );
}
