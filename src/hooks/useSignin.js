import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const doSignIn = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error("Could not complete signin");
      }

      // change online status to true afer login.
      await projectFirestore.collection("users").doc(res.user.uid).update({
        online: true,
      });

      dispatch({ type: "LOGIN", payload: res.user });

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

  return { doSignIn, error, isloading };
};
