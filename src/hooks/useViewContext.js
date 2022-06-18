import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";

export const useViewContext = () => {
  const context = useContext(ViewContext);

  if (!context) {
    throw Error("component must be inside viewcontextprovider");
  }

  return context;
};
