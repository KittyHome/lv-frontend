import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);

  const openAuthModal = () => setIsOpenAuthModal(true);
  const closeAuthModal = () => setIsOpenAuthModal(false);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isOpenAuthModal,
        openAuthModal,
        closeAuthModal,
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
