"use client";
import { useLoadUserFriendPurchases } from "@/app/hooks/useLoadUserFriendPurchases";
import React from "react";
import styles from "./FriendPurchasesSummary.module.css";

const FriendPurchasesSummary = ({ params }: any) => {
  const { id } = params;
  const {
    purchasesUserFriend,
    purchasesInvertedUserFriend,
    totalDebtInvertedUserFriend,
    totalDebtUserFriend,
  } = useLoadUserFriendPurchases(id);

  //   const totalDebtUserFriend = purchasesUserFriend?.reduce(
  //     (acc, purchase) => acc + (purchase.amount * purchase.debt_percent) / 100,
  //     0
  //   );

  //   const totalDebtInvertedUserFriend = purchasesInvertedUserFriend?.reduce(
  //     (acc, purchase) => acc + (purchase.amount * purchase.debt_percent) / 100,
  //     0
  //   );

  const balance =
    totalDebtUserFriend &&
    totalDebtInvertedUserFriend &&
    totalDebtUserFriend - totalDebtInvertedUserFriend;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Tus compras:</div>
        {purchasesUserFriend?.map((purchase) => (
          <div key={purchase.id} className={styles.purchaseItem}>
            <span className={styles.purchaseConcept}>{purchase.concept}</span>
            <span className={styles.purchaseAmount}>{purchase.amount}</span>
            <span className={styles.debtAmountGreen}>
              {((purchase.amount * purchase.debt_percent) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <div className={`${styles.purchaseItem} ${styles.totalRow}`}>
          <span className={styles.purchaseConcept}>Total</span>
          <span></span>
          <span className={styles.debtAmountGreen}>
            {totalDebtUserFriend?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Las compras de tu amigo:</div>
        {Array.isArray(purchasesInvertedUserFriend) &&
          purchasesInvertedUserFriend?.map((purchase) => (
            <div key={purchase.id} className={styles.purchaseItem}>
              <span className={styles.purchaseConcept}>{purchase.concept}</span>
              <span className={styles.purchaseAmount}>{purchase.amount}</span>
              <span className={styles.debtAmountRed}>
                {((purchase.amount * purchase.debt_percent) / 100).toFixed(2)}
              </span>
            </div>
          ))}
        <div className={`${styles.purchaseItem} ${styles.totalRow}`}>
          <span className={styles.purchaseConcept}>Total</span>
          <span></span>
          <span className={styles.debtAmountRed}>
            {totalDebtInvertedUserFriend?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>SALDO:</div>

        <div className={styles.purchaseItem}>
          <span className={styles.purchaseConcept}>
            Balance {balance && balance < 0 ? "negativo" : "positivo"}
          </span>
          <span></span>
          <span
            className={
              balance && balance < 0
                ? styles.debtAmountRed
                : styles.debtAmountGreen
            }
          >
            {balance}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FriendPurchasesSummary;
