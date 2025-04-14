import { useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await signOut(auth);
      // dispatch logout action to context
      dispatch({ type: "LOGOUT" });
      setIsLoading(false);
    } catch (err) {
      console.error("Error signing out:", err.code);
      setError(err.code);
      setIsLoading(false);
    }
  };

  return { logout, error, isLoading };
}
