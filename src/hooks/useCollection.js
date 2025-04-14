import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";

export const useCollection = ({collectionName, _query, _orderBy}) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const queryParams = useRef(_query).current;
  const orderParams = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (queryParams) {
      ref = query(ref, where(...queryParams));
    }
    if (orderParams) {
      ref = query(ref, orderBy(...orderParams));
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
      setError(null);
    }, (error) => {
      console.error("Firestore error:", error);
      setError("Could not fetch the documents");
    });

    return () => unsubscribe();
  }, [collectionName, orderParams, queryParams]);

  return { documents, error };
}