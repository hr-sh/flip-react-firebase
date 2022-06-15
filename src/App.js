import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { user, authStatusCheckDone } = useAuthContext();

  return (
    <div className="App">
      {authStatusCheckDone && (
        <Router>
          {/* maybe a navbar in here */}
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {!user ? <Redirect to="/login" /> : <Home />}
              </Route>
              <Route path="/login">
                {user ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/signup">
                {user ? <Redirect to="/" /> : <Signup />}
              </Route>
              <Route path="/create">
                {!user ? <Redirect to="/login" /> : <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user ? <Redirect to="/login" /> : <Project />}
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          {/* container ends */}
          {user && <OnlineUsers />}
        </Router>
      )}
    </div>
  );
}

export default App;

// Pages:
// 1. home
// 2. login
// 3. signup
// 4. create project
// 5. project details page
