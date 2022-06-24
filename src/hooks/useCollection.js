// hook for subscribing to a firestore collection eg. users

import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, where, orderby) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // collection is not reference type so wont trigger useeffect
  // where and orderby are refrence types [arrays or objects]
  // useRef().current is useful for stopping this
  // const w = useMemo(() => where, [where]);
  // const o = useMemo(() => orderby, [orderby]);

  useEffect(() => {
    let collectionRef = projectFirestore.collection(collection);

    if (where) {
      const w = where.split(",");
      collectionRef = collectionRef.where(...w);
    }

    if (orderby) {
      const o = orderby.split(",");
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
  }, [collection, where, orderby]);

  return { data, error };
};
