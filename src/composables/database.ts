import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, CollectionReference, DocumentData,
  setDoc, doc, getDoc, updateDoc, deleteDoc, where, query, getDocs,
} from 'firebase/firestore';

/**
 * Firestore database
 * @see https://firebase.google.com/docs/firestore
 */
export function useDatabase() {
  /**
   * Firebase configuration
   */
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  /**
   * Firebase and Firestore instances
   */
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  /**
   * Creates a collection reference with type safety
   * If the collection does not exist, it will be created
   * @param collectionName - The name of the collection
   * @param pathSegments - The path segments
   */
  const createCollection = <T = DocumentData>(collectionName: string, ...pathSegments: string[]) => collection(
    firestore,
    collectionName,
    ...pathSegments,
  ) as CollectionReference<T>;

  /**
   * Creates a collection reference with prebuilt CRUD operations
   * Wraps the Firestore API to make it easier to use
   * @param collectionName - The name of the collection
   * @param pathSegments - The path segments
   */
  const initializeCollection = <T = DocumentData>(collectionName: string, ...pathSegments: string[]) => {
    /**
     * Collection reference
     */
    const collectionReference = createCollection<T>(collectionName, ...pathSegments);

    /**
     * Creates a document
     * @param data - The data to create the document with
     * @param documentId - The document ID (optional)
     */
    const setDocument = async (data: T, documentId?: string) => {
      const document = documentId !== undefined ? doc(collectionReference, documentId) : doc(collectionReference);
      return setDoc(document, data);
    };

    /**
     * Reads a document
     * @param documentId - The document ID
     */
    const getDocument = async (documentId: string) => {
      const document = doc(collectionReference, documentId);
      return getDoc(document);
    };

    /**
     * Read documents by a field
     * @param field - The field to query
     * @param value - The value of the field
     */
    const getDocumentsByField = async (field: string, value: string) => {
      const queryOperation = query(collectionReference, where(field, '==', value));
      const querySnapshot = await getDocs(queryOperation);
      return querySnapshot.docs.map((document) => document.data() as T);
    };

    /**
     * Updates a document
     * @param data - The data to update the document with
     * @param documentId - The document ID
     */
    const updateDocument = async (data: Partial<T>, documentId: string) => {
      const document = doc(collectionReference, documentId);
      return updateDoc(document, <never>data);
    };

    /**
     * Delete a document
     * @param documentId - The document ID
     */
    const deleteDocument = async (documentId: string) => {
      const document = doc(collectionReference, documentId);
      return deleteDoc(document);
    };

    /**
     * Delete documents by a field
     * @param field - The field to query
     * @param value - The value of the field
     */
    const deleteDocumentsByField = async (field: string, value: string) => {
      const queryOperation = query(collectionReference, where(field, '==', value));
      const querySnapshot = await getDocs(queryOperation);
      querySnapshot.forEach((document) => {
        deleteDoc(document.ref);
      });
    };

    /**
     * Checks if a document exists
     * @param documentId - The document ID
     */
    const exists = async (documentId: string) => {
      const document = doc(collectionReference, documentId);
      const documentSnapshot = await getDoc(document);
      return documentSnapshot.exists();
    };

    /**
     * Checks if a document exists by a field and value
     * @param field - The field to query
     * @param value - The value of the field
     */
    const existsByField = async (field: string, value: string) => {
      const queryOperation = query(collectionReference, where(field, '==', value));
      const querySnapshot = await getDocs(queryOperation);
      return querySnapshot.size > 0;
    };

    /**
     * Checks if a document contains a field with a value
     * @param documentId - The document ID
     * @param field - The field to query
     * @param value - The value of the field
     */
    const contains = async (documentId: string, field: string, value: string) => {
      const document = doc(collectionReference, documentId);
      const documentSnapshot = await getDoc(document);
      return documentSnapshot.exists() && documentSnapshot.get(field) === value;
    };

    /**
     * Return the CRUD operations
     */
    return {
      setDocument,
      getDocument,
      getDocumentsByField,
      updateDocument,
      deleteDocument,
      deleteDocumentsByField,
      exists,
      existsByField,
      contains,
    };
  };

  return {
    firebaseApp, firestore, createCollection, initializeCollection,
  };
}
