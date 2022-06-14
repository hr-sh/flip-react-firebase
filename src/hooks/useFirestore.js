import { useEffect, useReducer, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { isloading: true, success: false, doc: null, error: null };
    case "SUCCESS":
      console.log("success state is dispatched");
      return {
        isloading: false,
        success: true,
        doc: action.payload,
        error: null,
      };
    case "ERROR":
      console.log("error state is dispatched");
      return {
        isloading: false,
        success: false,
        doc: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [isCancelled, setIsCancelled] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    isloading: false,
    error: null,
    success: false,
    doc: null,
  });

  // const [doc, setDoc] = useState(null);
  // const [error, setError] = useState(null);
  // const [isloading, setIsLoading] = useState(false);

  const collectionRef = projectFirestore.collection(collection);

  //TODO: change 'do' to dispatchifnotcancelled

  // doAdd
  const doAdd = async (data) => {
    dispatch({ type: "LOADING" });
    try {
      const doc = await collectionRef.add(data);

      dispatchIfNotCancelled({ type: "SUCCESS", payload: doc });
    } catch (err) {
      console.log(err);
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // doUpdate
  const doUpdate = async ({ data, id }) => {
    console.log("doUpdate called");
    dispatch({ type: "LOADING" });
    try {
      await collectionRef.doc(id).update(data);

      console.log("updated doc");
      dispatchIfNotCancelled({ type: "SUCCESS", payload: null });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // doDelete
  const doDelete = async ({ id }) => {
    dispatch({ type: "LOADING" });
    try {
      await collectionRef.doc(id).delete();

      console.log("deleted doc");
      dispatchIfNotCancelled({ type: "SUCCESS", payload: null });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  function dispatchIfNotCancelled(action) {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { doAdd, doDelete, doUpdate, ...state };
};
