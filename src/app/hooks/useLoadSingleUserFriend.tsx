import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import IMFriend from "../models/Friend/Friend";

export const useLoadSingleUserFriend = (id: number) => {
  const [userFriend, setUserFriend] = useState<IMFriend | null>();
  const loadUserFriend = useCallback(async () => {
    try {
      const response = await api.get(`user-friends/${id}`);
      const friend = response.data;
      setUserFriend(friend);
    } catch (err: any) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadUserFriend();
  }, [loadUserFriend]);

  return {
    userFriend,
  };
};
