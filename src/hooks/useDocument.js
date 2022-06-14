import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  //getData on Component load
  useEffect(() => {
    let documentRef = projectFirestore.collection(collection).doc(id);

    const unsub = documentRef.onSnapshot(
      (res) => {
        if (res.data()) {
          const r = { ...res.data(), id: res.id };

          setData(r);
          setError(null);
        } else {
          setError("project doesnot exist");
        }
      },
      (err) => {
        console.log("useDocument Error: ", err);
        setError(err.message);
      }
    );

    return () => unsub();
  }, [collection, id]);

  return { data, error };
};
