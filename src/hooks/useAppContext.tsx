import { collection, onSnapshot } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { PAD_BUTTONS } from "../lib/constants";
import { processVote } from "../lib/firebase/utils";
import { AnimalId, ButtonStatus } from "../lib/types";
import { useAuth } from "./useAuth";
import { firestore } from "../lib/firebase/firebase";

interface AppContextProps {
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  padStates: ButtonStatus[];
  updateDisabledDate: (name: AnimalId, isUp: boolean, id: string) => void;
  setPadStates: (padStates: ButtonStatus[]) => void;
  votes: Record<AnimalId, number>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  const openAuthModal = useCallback(() => setIsOpenAuthModal(true), []);
  const closeAuthModal = useCallback(() => setIsOpenAuthModal(false), []);

  const [padStates, setPadStates] = useState<ButtonStatus[]>(PAD_BUTTONS);
  const [votes, setVotes] = useState<Record<AnimalId, number>>({
    DandyPounce: 0,
    Flickerdoodle: 0,
    MystiPurr: 0,
    Puzzlebounce: 0,
    Whiskerwisp: 0,
  });

  const updateDisabledDate = useCallback(
    (name: AnimalId, isUp: boolean, id: string) => {
      if (user) {
        const updatedState = padStates.find((state) => state.id === id);
        const value = updatedState ? updatedState.value : 0;
        const action = isUp ? "upvoted" : "downvoted";

        if (!user.money || user.money < value * 0.1) {
          toast.error("You have insufficient funds!");
          return;
        }

        processVote(name, id, isUp)
          .then(() => {
            toast(`You ${action} **${name}** with a value of ${value}!`, {
              type: "success",
            });
            console.log("Vote processed successfully:");
          })
          .catch((error: unknown) => {
            console.error("Error processing vote:", error);
            toast("Failed to process vote. Please try again.", {
              type: "error",
            });
          });
      } else {
        openAuthModal();
        toast("Please log in to vote.", {
          type: "info",
        });
      }
    },
    [padStates]
  );

  useEffect(() => {
    user?.padStates && setPadStates(user.padStates);
  }, [user?.padStates]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "animals"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setVotes((prvVotes) => ({
            ...prvVotes,
            [change.doc.id as AnimalId]: change.doc.data().vote,
          }));
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        votes,
        isOpenAuthModal,
        openAuthModal,
        closeAuthModal,
        padStates,
        updateDisabledDate,
        setPadStates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
