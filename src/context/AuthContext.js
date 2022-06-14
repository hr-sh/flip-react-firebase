import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATUS_CHECK_DONE":
      return { user: action.payload, authStatusCheckDone: true };
    case "LOGOUT":
      return { ...state, user: null };
    case "LOGIN":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authStatusCheckDone: false,
  });

  useEffect(() => {
    // check for loggedin user object on site initial load, or refresh
    const unsub = projectAuth.onAuthStateChanged((user) => {
      // set user and authStatusCheck using dispatch
      dispatch({ type: "AUTH_STATUS_CHECK_DONE", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
