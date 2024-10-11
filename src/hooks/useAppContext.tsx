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
import {
  fetchNextGameTime,
  fetchPrizePool,
  processVote,
} from "../lib/firebase/utils";
import { AnimalId, ButtonStatus, Ticket } from "../lib/types";
import { useAuth } from "./useAuth";
import { firestore } from "../lib/firebase/firebase";

type OrderDetail = {
  key: AnimalId;
  rank: number;
};

interface AppContextProps {
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  padStates: ButtonStatus[];
  updateDisabledDate: (name: AnimalId, isUp: boolean, id: string) => void;
  setPadStates: (padStates: ButtonStatus[]) => void;
  votes: Record<AnimalId, number>;
  myTickets: Ticket[];
  updateNextGameTime: () => void;
  nextGameTime: Date | null;
  prizePool: number;
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
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [nextGameTime, setNextGameTime] = useState<Date | null>(null);
  const [prizePool, setPrizePool] = useState<number>(0);

  const updateDisabledDate = useCallback(
    (name: AnimalId, isUp: boolean, id: string) => {
      if (user) {
        const updatedState = padStates.find((state) => state.id === id);
        const value = updatedState ? updatedState.value : 0;
        const action = isUp ? "upvoted" : "downvoted";

        const voteDeficit = value - user.votes;
        if (voteDeficit > 0) {
          const deductionAmount = 0.1 * voteDeficit;
          if (user.money < deductionAmount) {
            toast.error("You have insufficient funds to complete the vote!");
            return;
          }
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
    [user?.money, padStates, openAuthModal]
  );

  const updateNextGameTime = useCallback(() => {
    fetchNextGameTime().then((nt?: Date) => {
      if (!nt) return;
      setNextGameTime(nt);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateNextGameTime, 300000);
    return () => clearInterval(intervalId);
  }, [updateNextGameTime]);

  useEffect(() => {
    const userId = user?.uid;
    if (userId && nextGameTime) {
      // Init ticket list
      setMyTickets([]);

      const nextGameTimeId = nextGameTime
        .toISOString()
        .replace(/[-:]/g, "_")
        .split(".")[0];

      const unsubscribe = onSnapshot(
        collection(firestore, "tickets", nextGameTimeId, userId),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const data = change.doc.data();
              setMyTickets((prv) => {
                const newCreatedAt = new Date(data.createdAt);
                if (
                  prv.some(
                    (ticket) =>
                      ticket.createdAt.getTime() === newCreatedAt.getTime()
                  )
                ) {
                  return prv;
                }
                return [
                  ...prv,
                  {
                    order: data.orders
                      .sort((a: OrderDetail, b: OrderDetail) => a.rank - b.rank)
                      .map((item: OrderDetail) => item.key),
                    createdAt: newCreatedAt,
                  },
                ];
              });
            }
          });
        }
      );

      return () => unsubscribe();
    }
  }, [user?.uid, nextGameTime?.toISOString()]);

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

  useEffect(() => {
    const fetchAndSetPrizePool = () => {
      fetchPrizePool().then((gamePrizePool?: number) =>
        setPrizePool(gamePrizePool || 0)
      );
    };

    fetchAndSetPrizePool();

    const intervalId = setInterval(fetchAndSetPrizePool, 60000);

    return () => clearInterval(intervalId);
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
        myTickets,
        updateNextGameTime,
        nextGameTime,
        prizePool,
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
