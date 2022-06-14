import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { user, dispatch } = useAuthContext();

  const doSignOut = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // edit current user doc from 'online: true' to 'false' before logout
      await projectFirestore.collection("users").doc(user.uid).update({
        online: false,
      });

      await projectAuth.signOut();

      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { doSignOut, error, isloading };
};
