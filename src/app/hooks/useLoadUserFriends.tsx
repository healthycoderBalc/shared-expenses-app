import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import IMFriend from "../models/Friend/Friend";

export const useLoadUserFriends = () => {
  const [userFriends, setUserFriends] = useState<IMFriend[]>();
  const loadUserFriends = useCallback(async () => {
    try {
      const response = await api.get(`user-friends/mine`);
      const friends = response.data;
      setUserFriends(friends);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUserFriends();
  }, []);

  return {
    userFriends,
  };
};
