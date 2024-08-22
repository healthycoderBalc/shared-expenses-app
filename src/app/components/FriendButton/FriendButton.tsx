import React from "react";
import Link from "next/link";
import IMUserFriend from "@/app/models/Friend/Friend";
import styles from "@/app/components/FriendButton/FriendButton.module.css";
import Image from "next/image";

interface IMFriendButtonProps {
  userFriend: IMUserFriend;
  route: string;
}

const FriendButton: React.FC<IMFriendButtonProps> = ({ userFriend, route }) => {
  return (
    <Link href={`${route}/${userFriend.id}`} className={styles.button}>
      <div className={styles.friendName}>{userFriend.friend.name}</div>
      <Image
        src="/apple-touch-icon.png"
        alt="img"
        className={styles.friendImage}
        width="50"
        height={50}
      />
    </Link>
  );
};

export default FriendButton;
