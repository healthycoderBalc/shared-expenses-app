import IMUserFriend from "../Friend/Friend";

export default interface IMPurchase {
  id: number;
  concept: string;
  amount: number;
  user_friends_id: number;
  debt_percent: number;
  friend: IMUserFriend;
}
