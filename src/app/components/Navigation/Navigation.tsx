"use client";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { useAuth } from "@/app/context/AuthContext";
import router from "next/router";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Resumen",
    route: "/resumen",
  },
];

const Navigation = () => {
  const { user, logout } = useAuth();

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
        {user ? (
          <>
            <span className={`${styles.links} ms-2`}>
              <Link onClick={logout} href={"/salir"}>
                Salir
              </Link>
            </span>
            <span className={styles.greeting}>{user.name}</span>
          </>
        ) : (
          <span className={styles.greeting}>
            <Link href="/login">Login</Link>
          </span>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
