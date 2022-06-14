import "./Sidebar.css";
import HomeIcon from "../assets/dashboard_icon.svg";
import CreateIcon from "../assets/add_icon.svg";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={HomeIcon} alt="home icon" />
                <span>Home</span>
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
