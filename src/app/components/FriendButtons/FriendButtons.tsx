"use client";
import Link from "next/link";
import FriendButton from "../FriendButton/FriendButton";
import styles from "./FriendButtons.module.css";
import { useLoadUserFriends } from "@/app/hooks/useLoadUserFriends";

const FriendButtons = () => {
  const { userFriends } = useLoadUserFriends();

  return (
    <>
      <div>Escoge un amigo para añadir un gasto compartido: </div>
      {userFriends?.map((userFriend) => (
        <div key={userFriend.id} className={styles.button}>
          <FriendButton friendName={userFriend.friend.name} />
        </div>
      ))}
      <br />
      <div className={styles.addFriend}>
        <Link href={"/amigos/nuevo"}>Añadir amigo</Link>
      </div>
    </>
  );
};

export default FriendButtons;
