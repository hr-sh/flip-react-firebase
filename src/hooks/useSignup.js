import { useState, useEffect } from "react";
import {
  projectFirestore,
  projectAuth,
  projectStorage,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const doSignUp = async (email, password, displayName, file) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `profilepics/${res.user.uid}/${file.name}`;
      const image = await projectStorage.ref(uploadPath).put(file);
      const photoURL = await image.ref.getDownloadURL();

      await res.user.updateProfile({ displayName, photoURL });

      // add user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        displayName,
        online: true,
        photoURL,
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

  return { doSignUp, error, isloading };
};
