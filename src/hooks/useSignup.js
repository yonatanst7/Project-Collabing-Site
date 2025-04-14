import { useState } from "react";
import { auth } from "../firebase/config"; // Adjust the path as needed
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // Add displayName to the user profile for firebase v11.6.0
      await updateProfile(user, { displayName });
      // dispatch login action to context
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      return user;
    } catch (err) {
      console.error("Error signing up:", err.code);
      setError(err.code);
      setIsLoading(false);
    }

  };

  return { signup, error, isLoading };
};