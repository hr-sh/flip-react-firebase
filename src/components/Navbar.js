import "./Navbar.css";
import Logo from "../assets/flip_icon.svg";
import { Link } from "react-router-dom";
import { useSignout } from "../hooks/useSignout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useHistory } from "react-router-dom";
import LoadingBtn from "./LoadingBtn";

export default function Navbar() {
  const { doSignOut, error, isloading } = useSignout();
  const { user } = useAuthContext();
  const location = useLocation();
  const history = useHistory();

  if (error) {
    console.log(error);
  }

  return (
    <div className="navbar">
      <ul>
        <li className="logo" onClick={() => history.push("/")}>
          <img src={Logo} alt="flip site logo" />
          <h1>Sample react app</h1>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login" className="btn auth">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="btn auth">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li>
            {location.pathname === "/" && !isloading && (
              <button className="btn auth" onClick={doSignOut}>
                Logout
              </button>
            )}
            {isloading && <LoadingBtn />}
          </li>
        )}
      </ul>
    </div>
  );
}
