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
  let photoURL =
    "https://firebasestorage.googleapis.com/v0/b/flip-site-45ca9.appspot.com/o/profilepics%2Fdefault%2Fdownload.png?alt=media&token=1b869d8a-5361-4df7-a67e-326799e203f7";

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

      if (file) {
        const uploadPath = `profilepics/${res.user.uid}/${file.name}`;
        const image = await projectStorage.ref(uploadPath).put(file);
        photoURL = await image.ref.getDownloadURL();
      }

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
