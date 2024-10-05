import { httpsCallable } from "firebase/functions";

import { AnimalId } from "../types";
import { functions } from "./firebase";

export const fetchNextGameTime = async () => {
  try {
    const getNextGameTime = httpsCallable<undefined, { nextGameTime: string }>(
      functions,
      "getNextGameTime"
    );
    const result = await getNextGameTime();
    return new Date(result.data.nextGameTime);
  } catch (error) {
    console.error("Error fetching next game time:", error);
  }
};

export const createTicket = async (
  order: { key: AnimalId; rank: number }[]
) => {
  try {
    const createTicketFunction = httpsCallable(functions, "createTicket");
    await createTicketFunction({ order });
  } catch (error) {
    throw error;
  }
};

export const processVote = async (
  animalId: AnimalId,
  padId: string,
  isUp: boolean
) => {
  try {
    const processVoteFunction = httpsCallable(functions, "processVote");
    await processVoteFunction({ animalId, padId, isUp });
  } catch (error) {
    throw error;
  }
};
