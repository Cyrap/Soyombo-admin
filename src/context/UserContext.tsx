"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import type { User } from "firebase/auth";

type UserContextType = {
  user: User | null;
  loading: boolean;
};


const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading state to false when user data is loaded
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
