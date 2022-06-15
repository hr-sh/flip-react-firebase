import "./Navbar.css";
import Logo from "../assets/flip_icon.svg";
import { Link } from "react-router-dom";
import { useSignout } from "../hooks/useSignout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useHistory } from "react-router-dom";

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
          <span>Flip</span>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <li>
            {location.pathname === "/" && !isloading ? (
              <button className="btn" onClick={doSignOut}>
                Logout
              </button>
            ) : (
              isloading && (
                <button className="btn" disabled>
                  Logging out..
                </button>
              )
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
