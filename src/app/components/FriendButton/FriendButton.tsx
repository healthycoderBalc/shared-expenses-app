import React from "react";
import IMFriend from "../../models/Friend/Friend";
import Link from "next/link";
import styles from "./FriendButton.module.css";

interface IMFriendButtonProps {
  friendName: string;
}

const FriendButton: React.FC<IMFriendButtonProps> = ({ friendName }) => {
  return (
    <Link href={"/gasto"}>
      <div>{friendName}</div>
    </Link>
  );
};

export default FriendButton;
