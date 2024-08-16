"use client";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { useAuth } from "@/app/context/AuthContext";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Gasto",
    route: "/gasto",
  },
  {
    label: "Resumen",
    route: "/resumen",
  },
];

const Navigation = () => {
  const { user } = useAuth();
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div className={styles.links}>
          {links.map(({ label, route }) => (
            <span key={route}>
              <Link href={route}>{label}</Link>{" "}
            </span>
          ))}
        </div>
        <span className={styles.greeting}>¡Hola {user.name}!</span>
      </nav>
    </header>
  );
};

export default Navigation;
