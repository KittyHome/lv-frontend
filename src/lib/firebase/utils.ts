import { httpsCallable } from "firebase/functions";

import { AnimalId, SpinItem } from "../types";
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

export const fetchDailySpinData = async () => {
  try {
    const getSpinData = httpsCallable<undefined, { spinItems: SpinItem[] }>(
      functions,
      "getSpinData"
    );
    const result = await getSpinData();
    return result.data.spinItems;
  } catch (error) {
    console.error("Error fetching daily spin data:", error);
  }
};

export const fetchDailySpinIndex = async (spinItems: SpinItem[]) => {
  try {
    const getTargetIndex = httpsCallable<
      { spinItems: SpinItem[] },
      { targetIndex: number }
    >(functions, "getTargetIndex");
    const result = await getTargetIndex({ spinItems });
    return result.data.targetIndex;
  } catch (error) {
    console.error("Error fetching daily spin index:", error);
  }
};

export const fetchPrizePool = async () => {
  try {
    const getCurrentPrizePool = httpsCallable<undefined, { prizePool: number }>(
      functions,
      "getCurrentPrizePool"
    );
    const result = await getCurrentPrizePool();
    return result.data.prizePool;
  } catch (error) {
    console.error("Error fetching prize pool:", error);
  }
};
