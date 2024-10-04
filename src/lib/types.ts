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
  isAdvancedUser?: boolean;
  money?: number;
  padStates?: ButtonStatus[];
  username?: string;
}
