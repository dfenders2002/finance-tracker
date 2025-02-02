export type Category =
  | "groceries"
  | "rent"
  | "income"
  | "utilities"
  | "subscriptions"
  | "car"
  | "other";

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  paidBy: "person1" | "person2";
  split: "equal" | "percentage";
  splitRatio?: number; // Used for percentage split
}

export interface SavingsConfig {
  enabled: boolean;
  percentage: number;
  vacationBuffer: number;
}

export interface Person {
  id: "person1" | "person2";
  name: string;
  balance: number;
} 