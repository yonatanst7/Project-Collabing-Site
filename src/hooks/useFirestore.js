import { useReducer } from 'react';
import { db, timestamp } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

let initialState = {
  isLoading: false,
  error: null,
  document: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { isLoading: true, error: null, document: null, success: null };
    case 'ADDED_DOCUMENT':
      return { isLoading: false, error: null, document: action.payload, success: true };
    case 'DELETED_DOCUMENT':
      return { isLoading: false, error: null, document: action.payload, success: true };
    case 'UPDATED_DOCUMENT':
      return { isLoading: false, error: null, document: action.payload, success: true };
    case 'ERROR':
      return { isLoading: false, error: action.payload, document: null, success: false };
    default:
      return state;
  }
};


export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // collection reference
  const ref = collection(db, collectionName);

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      doc.createdAt = timestamp.fromDate(new Date());
      const newDoc = await addDoc(ref, doc);
      dispatch({ type: 'ADDED_DOCUMENT', payload: newDoc });
    } catch (error) {
      console.error('Firestore error:', error);
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const docRef = doc(ref, id);
      const updatedDocument = await updateDoc(docRef, updates);
      dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const docRef = doc(ref, id);
      const deletedDocument = await deleteDoc(docRef);
      dispatch({ type: 'DELETED_DOCUMENT', payload: deletedDocument });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  }
  
  return { addDocument, updateDocument, deleteDocument, response };
}