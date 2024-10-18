import { User as SupabaseUser } from "@supabase/supabase-js";

export type AnimalId =
  | "Whiskerwisp"
  | "Flickerdoodle"
  | "MystiPurr"
  | "DandyPounce"
  | "Puzzlebounce";

export interface ButtonStatus {
  id: string;
  value: number;
  disabledDate?: Date;
  timeInterval: number;
}

export interface Animal {
  id: string;
  gifAvatarUrl: string;
  staticAvatarUrl: string;
  name: AnimalId;
  description: string;
  vote: number;
}

export interface User extends SupabaseUser {
  username?: string;
  money: number;
  votes: number;
  isAdvancedUser?: boolean;
  withdrawChance: number;
  voteDisabledDate?: Date | null;
}

export type Ticket = {
  order: AnimalId[];
  createdAt: Date;
};

export type Bonus = "withdraw" | "credit" | "votes";

export type SpinItem = {
  type: Bonus;
  amount: number;
};

export type Notification = {
  id: string;
  isRead: boolean;
  isNotified: boolean;
  content: string;
  createdAt: Date;
};

export type OrderDetail = {
  key: AnimalId;
  rank: number;
};

export type Stage = {
  id: string;
  prizePool: number;
  endedAt: Date;
  startedAt: Date;
  prizeForGold?: number;
  prizeForSilver?: number;
  prizeForBronze?: number;
  stageResult?: AnimalId[];
};
