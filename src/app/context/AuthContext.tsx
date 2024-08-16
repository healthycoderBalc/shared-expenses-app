"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Swal from "sweetalert2";
import { api } from "../../../services/api";
import IMUserAuth from "../models/User/UserAuth";
import { useRemoveStoragePrefix } from "../hooks/useRemoveStoragePrefix";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  access_token: string;
  user: IMUserAuth;
}

interface AuthContextType {
  user: IMUserAuth;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { removeLocalStorageItemsWithPrefix } = useRemoveStoragePrefix();

  const removeExpiredTokenAndLogout = useCallback(async () => {
    removeLocalStorageItemsWithPrefix("@HAyCE_exp");
    try {
      await api.post(`auth/logout`);
      setAuthData({} as AuthContextState);
      router.push(`/login`);
    } catch (err: any) {
      if (err.response?.status === 403) {
        // Token might have already been invalidated on the server (forbidden)
        setAuthData({} as AuthContextState);
        router.push(`/login`);
      } else {
        console.error("Logout failed:", err);
        Swal.fire({
          title: "Error",
          text: `Logout failed: ${err.response?.data?.message}`,
          icon: "error",
        });
      }
    }
  }, [removeLocalStorageItemsWithPrefix, router]);

  useEffect(() => {
    const expirationCheckInterval = 60000; // Check every minute

    const checkAndRemoveExpiredToken = () => {
      const expirationTime = localStorage.getItem("@HAyCE_exp:expiration_time");

      if (expirationTime) {
        const currentTime = Date.now();
        if (currentTime >= parseInt(expirationTime)) {
          removeExpiredTokenAndLogout();
        }
      }
    };

    // Set up a timer to periodically check and remove expired tokens
    const intervalId = setInterval(
      checkAndRemoveExpiredToken,
      expirationCheckInterval
    );

    // Clean up the interval when the component unmounts
    checkAndRemoveExpiredToken();
    return () => {
      clearInterval(intervalId);
    };
  }, [removeExpiredTokenAndLogout]);

  const [authData, setAuthData] = useState<AuthContextState>(() => {
    const access_token = localStorage.getItem("@HAyCE_exp:accessToken");
    const user = localStorage.getItem("@HAyCE_exp:user");

    if (access_token && user) {
      api.defaults.headers.authorization = `Bearer ${access_token}`;
      return { access_token, user: JSON.parse(user) };
    }

    return {} as AuthContextState;
  });

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    try {
      const response: any = await api.post(`auth/login`, {
        email,
        password,
      });

      const { access_token, expires_in, user } = response.data;
      const expirationTime = Date.now() + expires_in * 1000;

      if (access_token === undefined) {
        Swal.fire({
          title: "Error",
          text: "Los datos son incorrectos, intente nuevamente",
          icon: "error",
        });
        throw new Error("Undefined Access Token");
      }

      localStorage.setItem("@HAyCE_exp:accessToken", access_token);
      localStorage.setItem(
        "@HAyCE_exp:expiration_time",
        expirationTime.toString()
      );
      localStorage.setItem("@HAyCE_exp:user", JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${access_token}`;
      setAuthData({ access_token, user });

      Swal.fire({
        title: `Bienvenido de nuevo ${user.name}`,
        text: "Usted ha iniciado sesión exitosamente",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Los datos son incorrectos, intente nuevamente",
        icon: "error",
      });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const user = localStorage.getItem("@HAyCE_exp:user");
      removeLocalStorageItemsWithPrefix("@HAyCE_exp:");

      const response: any = await api.post(`auth/logout`);

      setAuthData({} as AuthContextState);
      if (user) {
        Swal.fire({
          title: "Adiós " + JSON.parse(user).name,
          text: response.data.message,
          icon: "success",
        });
      }
      router.push("/login");
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Usted no se ha autenticado",
        icon: "error",
      });
      router.push("/login");
    }
  }, [removeLocalStorageItemsWithPrefix, router]);

  const contextValue: AuthContextType = useMemo(() => {
    return {
      user: authData.user,
      login,
      logout,
    };
  }, [authData.user, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
