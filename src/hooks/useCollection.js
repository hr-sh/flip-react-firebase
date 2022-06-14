// hook for subscribing to a firestore collection eg. users

import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, orderby, where) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // collection is not reference type so wont trigger useeffect
  // where and orderby are refrence types [arrays or objects]
  // useRef().current is useful for stopping this
  const w = useRef(where).current;
  const o = useRef(orderby).current;

  //getData on Component load
  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

    if (w) {
      collectionRef = collectionRef.where(...w);
    }

    if (o) {
      collectionRef = collectionRef.orderBy(...o);
    }

    const unsub = collectionRef.onSnapshot(
      (res) => {
        // console.log(res);
        const r = res.docs.map((d) => ({ ...d.data(), id: d.id }));
        setData(r);
        setError(null);
      },
      (err) => {
        console.log("useCollection Error: ", err);
        setError(err.message);
      }
    );

    return () => unsub();
  }, [collection, w, o]);

  return { data, error };
};
