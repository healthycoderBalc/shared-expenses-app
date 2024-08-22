"use client";
import FriendButton from "../FriendButton/FriendButton";
import styles from "./FriendButtons.module.css";
import { useLoadUserFriends } from "@/app/hooks/useLoadUserFriends";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

interface IMFriendButtonsProps {
  route: string;
}

const FriendButtons: React.FC<IMFriendButtonsProps> = ({ route }) => {
  const { userFriends } = useLoadUserFriends();
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.title}>Escoge un amigo: </div>
          {userFriends?.map((userFriend) => (
            <div key={userFriend.id}>
              <FriendButton userFriend={userFriend} route={route} />
            </div>
          ))}
          <br />
          <div className={styles.addFriend}>
            <Link href={"/amigos/nuevo"}>Añadir amigo</Link>
          </div>
        </>
      ) : (
        <Link href="/login" className={styles.title}>
          Inicia sesión
        </Link>
      )}
    </div>
  );
};

export default FriendButtons;
