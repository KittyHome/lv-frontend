import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import supabase from "../lib/supabase/client";
import {
  createUserRealtimeChannel,
  getUserDataById,
} from "../lib/supabase/utils";
import { SupabaseUser, User } from "../lib/types";

interface AuthContextProps {
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const handleAuthChange = async (_event: string, session: any) => {
      const user = session?.user as SupabaseUser | undefined;
      user
        ? setUser((prvUser) => ({
            ...user,
            withdrawChance: 0,
            money: 0,
            votes: 0,
            ...(prvUser || {}),
          }))
        : setUser(null);
    };

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => authListener.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    getUserDataById(user.id).then(
      (fetchedUserData) =>
        fetchedUserData &&
        setUser((prvUser) => ({ ...(prvUser as User), ...fetchedUserData }))
    );

    const userRealtimeChannel = createUserRealtimeChannel(
      user.id,
      (payload) => {
        const updatedUser = payload.new as any;
        setUser((prevUser) => ({
          ...(prevUser as User),
          username: updatedUser.username,
          money: updatedUser.credit,
          votes: updatedUser.free_votes,
          isAdvancedUser: updatedUser.is_advanced,
          withdrawChance: Number(updatedUser.withdraw_chance),
          voteDisabledDate:
            updatedUser.vote_disabled_date !== null
              ? new Date(updatedUser.vote_disabled_date)
              : null,
        }));
      }
    );

    return () => {
      userRealtimeChannel.unsubscribe();
    };
  }, [user?.id]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
