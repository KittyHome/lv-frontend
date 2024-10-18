import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { DEFAULT_ANIMALS } from "../lib/constants";
import {
  createAnimalRealtimeChannel,
  createNotificationRealtimeChannel,
  createSpinRealtimeChannel,
  createStageRealtimeChannel,
  createTicketRealtimeChannel,
  getActiveTicketData,
  getAnimalData,
  getNotificationData,
  getSpinData,
  getStageData,
  updateNotification,
} from "../lib/supabase/utils";
import {
  Animal,
  AnimalId,
  Bonus,
  Notification,
  SpinItem,
  Stage,
  Ticket,
} from "../lib/types";
import { useAuth } from "./useAuth";

interface AppContextProps {
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  animals: Animal[];
  myTickets: Ticket[];
  notifications: Notification[];
  selectedAnimal?: Animal;
  setSelectedAnimal: (value: Animal) => void;
  stage?: Stage;
  spin?: SpinItem;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [animals, setAnimals] = useState<Animal[]>(DEFAULT_ANIMALS);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>();
  const [stage, setStage] = useState<Stage>();
  const [spin, setSpin] = useState<SpinItem>();

  const openAuthModal = useCallback(() => setIsOpenAuthModal(true), []);
  const closeAuthModal = useCallback(() => setIsOpenAuthModal(false), []);

  // Initialize animal data on component mount and establish a real-time subscription
  useEffect(() => {
    getAnimalData().then(
      (animalData) =>
        animalData &&
        setAnimals((prevAnimals) =>
          prevAnimals.map((prevAnimal) => {
            const updatedAnimal = animalData.find(
              (animal) => animal.name === prevAnimal.name
            );
            return updatedAnimal
              ? { ...prevAnimal, ...updatedAnimal }
              : prevAnimal;
          })
        )
    );

    const animalRealtimeChannel = createAnimalRealtimeChannel((payload) => {
      const updatedAnimal = payload.new as any;
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) =>
          animal.id === updatedAnimal.id
            ? { ...animal, ...updatedAnimal }
            : animal
        )
      );
    });

    return () => {
      animalRealtimeChannel.unsubscribe();
    };
  }, []);

  // Initialize stage data on component mount and establish a real-time subscription
  useEffect(() => {
    getStageData().then((stageData) => stageData && setStage(stageData));

    const stageRealtimeChannel = createStageRealtimeChannel((payload) => {
      const updatedStage = payload.new as any;
      updatedStage.is_active &&
        setStage({
          id: updatedStage.id,
          prizePool: updatedStage.prize_pool,
          endedAt: new Date(updatedStage.ended_at),
          startedAt: new Date(updatedStage.created_at),
        });
    });

    return () => {
      stageRealtimeChannel.unsubscribe();
    };
  }, []);

  // Initialize spin data on component mount and establish a real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    getSpinData(user.id).then((spinData) => spinData && setSpin(spinData));

    const spinRealtimeChannel = createSpinRealtimeChannel((payload) => {
      const updatedSpin = payload.new as any;
      !updatedSpin.is_used
        ? setSpin({
            type: updatedSpin.type as Bonus,
            amount: Number(updatedSpin.amount),
          })
        : setSpin(undefined);
    }, user.id);

    return () => {
      spinRealtimeChannel.unsubscribe();
    };
  }, [user?.id]);

  // Initialize ticket data on component mount and establish a real-time subscription
  useEffect(() => {
    if (!stage?.id || !user?.id) return;

    getActiveTicketData(stage.id, user.id).then(
      (ticketData) => ticketData && setMyTickets(ticketData)
    );

    const ticketRealtimeChannel = createTicketRealtimeChannel((payload) => {
      const updatedTicket = payload.new as any;
      setMyTickets((prvTickets) => [
        ...prvTickets,
        {
          order: updatedTicket.order as AnimalId[],
          createdAt: new Date(updatedTicket.created_at),
        },
      ]);
    }, user.id);

    return () => {
      ticketRealtimeChannel.unsubscribe();
    };
  }, [stage?.id, user?.id]);

  // Initialize notification data on component mount and establish a real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    getNotificationData(user.id).then(
      (notificationData) =>
        notificationData &&
        setNotifications(
          notificationData.map((notification) => {
            if (!notification.isNotified) {
              updateNotification(user.id, notification.id, {
                isNotified: true,
              });
              toast.info(notification.content);
            }
            return { ...notification, isNotified: true };
          })
        )
    );

    const notificationRealtimeChannel = createNotificationRealtimeChannel(
      (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const updatedNotification = payload.new;
          if (updatedNotification.is_deleted) {
            setNotifications((prevNotifications) =>
              prevNotifications.filter(
                (notification) => notification.id !== updatedNotification.id
              )
            );
          } else {
            setNotifications((prevNotifications) => {
              const updatedNotificationObj = {
                id: updatedNotification.id,
                content: updatedNotification.content,
                isRead: updatedNotification.is_read,
                isNotified: updatedNotification.is_notified,
                createdAt: new Date(updatedNotification.created_at),
              };

              if (!updatedNotificationObj.isNotified) {
                updateNotification(user.id, updatedNotificationObj.id, {
                  isNotified: true,
                });
                toast.info(updatedNotificationObj.content);
                updatedNotificationObj.isNotified = true;
              }

              const notificationIndex = prevNotifications.findIndex(
                (notification) => notification.id === updatedNotification.id
              );

              if (notificationIndex !== -1) {
                return prevNotifications.map((notification, index) =>
                  index === notificationIndex
                    ? updatedNotificationObj
                    : notification
                );
              } else {
                return [...prevNotifications, updatedNotificationObj];
              }
            });
          }
        }
      },
      user.id
    );

    return () => {
      notificationRealtimeChannel.unsubscribe();
    };
  }, [user?.id]);

  return (
    <AppContext.Provider
      value={{
        animals,
        isOpenAuthModal,
        openAuthModal,
        closeAuthModal,
        myTickets,
        notifications,
        selectedAnimal,
        setSelectedAnimal,
        stage,
        spin,
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
