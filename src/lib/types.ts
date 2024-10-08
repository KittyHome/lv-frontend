import { User as FirebaseUser } from "firebase/auth";

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
  avatar: string;
  name: AnimalId;
  description: string;
}

export interface User extends FirebaseUser {
  username?: string;
  money: number;
  votes: number;
  isAdvancedUser?: boolean;
  isSpinAvailable?: boolean;
  padStates?: ButtonStatus[];
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
