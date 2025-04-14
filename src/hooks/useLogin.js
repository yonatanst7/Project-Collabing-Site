import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // dispatch login action to context
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      return user;
    } catch (err) {
      console.error("Error logging in:", err.code);
      setError(err.code);
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
}