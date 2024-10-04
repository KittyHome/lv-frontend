import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "../lib/firebase/firebase";
import { User } from "../lib/types";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(false);

      if (firebaseUser) {
        setUser((prvUser) => ({ ...(prvUser || {}), ...firebaseUser }));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user?.uid) {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);

      unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const { isAdvancedUser, money, padStates, username } =
            docSnapshot.data();

          setUser((prvUser) => ({
            ...(prvUser as User),
            isAdvancedUser,
            money,
            padStates: padStates.map((padState: any) => ({
              ...padState,
              disabledDate: padState.disabledDate
                ? new Date(padState.disabledDate)
                : undefined,
            })),
            username,
          }));
        }
      });
    } else {
      unsubscribe && unsubscribe();
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
