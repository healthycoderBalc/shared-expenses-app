import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import IMPurchase from "../models/Purchase/Purchase";

export const useLoadUserFriendPurchases = (id: number) => {
  const [purchasesUserFriend, setPurchasesUserFriend] = useState<
    IMPurchase[] | null
  >();
  const [totalDebtUserFriend, setTotalDebtUserFriend] = useState<number>();
  const [purchasesInvertedUserFriend, setPurchasesInvertedUserFriend] =
    useState<IMPurchase[] | null>();
  const [totalDebtInvertedUserFriend, setTotalDebtInvertedUserFriend] =
    useState<number>();

  const loadUserFriendPurchases = useCallback(async () => {
    try {
      const response = await api.get(`purchases/user-friends/${id}`);
      const purchases: IMPurchase[] = response.data;
      const totalDebt = purchases.reduce(
        (acc, purchase) =>
          acc + (purchase.amount * purchase.debt_percent) / 100,
        0
      );
      setPurchasesUserFriend(purchases || (null as unknown as IMPurchase));
      setTotalDebtUserFriend(totalDebt);
    } catch (err: any) {
      console.log(err);
    }
  }, [id]);

  const loadInvertedUserFriendPurchases = useCallback(async () => {
    try {
      const response = await api.get(`purchases/user-friends/${id}/inverted`);
      const purchases: IMPurchase[] = response.data;
      const totalDebtInverted = purchases?.reduce(
        (acc, purchase) =>
          acc + (purchase.amount * purchase.debt_percent) / 100,
        0
      );
      setPurchasesInvertedUserFriend(
        purchases || (null as unknown as IMPurchase)
      );
      setTotalDebtInvertedUserFriend(totalDebtInverted);
    } catch (err: any) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    loadUserFriendPurchases();
    loadInvertedUserFriendPurchases();
  }, [loadInvertedUserFriendPurchases, loadUserFriendPurchases]);

  return {
    purchasesUserFriend,
    purchasesInvertedUserFriend,
    totalDebtUserFriend,
    totalDebtInvertedUserFriend,
  };
};
