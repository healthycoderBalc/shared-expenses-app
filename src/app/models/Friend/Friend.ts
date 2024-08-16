export default interface IMUserFriend {
  id: number;
  user: {
    id: number;
    name: string;
  };
  friend: {
    id: number;
    name: string;
  };
}
