import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "react-toastify";

import { ButtonStatus } from "../lib/types";
import { PAD_BUTTONS } from "../lib/constants";

interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  padStates: ButtonStatus[];
  updateDisabledDate: (name: string, isUp: boolean, id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  const openAuthModal = () => setIsOpenAuthModal(true);
  const closeAuthModal = () => setIsOpenAuthModal(false);

  const [padStates, setPadStates] = useState<ButtonStatus[]>(PAD_BUTTONS);

  const updateDisabledDate = useCallback(
    (name: string, isUp: boolean, id: string) => {
      setPadStates((prevStates) => {
        const updatedState = prevStates.find((state) => state.id === id);
        const value = updatedState ? updatedState.value : "";
        const action = isUp ? "upvoted" : "downvoted";
        toast(`You ${action} **${name}** with a value of ${value}!`, {
          type: "success",
        });
        return prevStates.map((state) =>
          state.id === id
            ? {
                ...state,
                disabledDate: new Date(Date.now() + state.timeInterval * 1000),
              }
            : state
        );
      });
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isOpenAuthModal,
        openAuthModal,
        closeAuthModal,
        padStates,
        updateDisabledDate,
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
