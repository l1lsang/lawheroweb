import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }

      setLoading(false);

    });

    return unsubscribe;

  }, []);

  const value = {
    user,
    uid: user?.uid || null,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}