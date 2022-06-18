import { useState, createContext } from "react";

export const ViewContext = createContext();

export const ViewContextProvider = ({ children }) => {
  const [grid, setGrid] = useState(true);

  return (
    <ViewContext.Provider value={{ grid, setGrid }}>
      {children}
    </ViewContext.Provider>
  );
};
