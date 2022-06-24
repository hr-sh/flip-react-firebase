import "./Sidebar.css";
import HomeIcon from "../assets/dashboard_icon.svg";
import CreateIcon from "../assets/add_icon.svg";
import { Link, NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Link to={`/user/${user.uid}`} className="user">
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={HomeIcon} alt="home icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={CreateIcon} alt="create project icon" />
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
