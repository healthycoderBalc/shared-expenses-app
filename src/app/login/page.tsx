"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";
import styles from "./login.module.css";
import { Form } from "@unform/web";
import Link from "next/link";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";

interface ILogin {
  id?: number;
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

const Login = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const { login } = useAuth();

  const handleSubmit = useCallback(
    async (data: ILogin) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required("Por favor escriba el correo"),
          password: Yup.string().required("Por favor escriba la contraseña"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = {
          email: data.email,
          password: data.password,
        };

        await login({
          email: email,
          password: password,
        });
        router.push("/");
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Los datos son incorrectos, intente nuevamente",
          icon: "error",
        });
      }
    },
    [login, router]
  );
  return (
    <Form
      ref={formRef}
      onSubmit={handleSubmit}
      placeholder={undefined}
      className={styles["form-container"]}
    >
      <h2 className="text-center">Iniciar Sesión</h2>
      <div className={styles["form-group"]}>
        <label htmlFor="email">Email:</label>
        <Input
          className={styles["form-control"]}
          type="text"
          name="email"
          placeholder="Escriba el email"
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="password">Contraseña:</label>
        <Input
          className={styles["form-control"]}
          type="password"
          name="password"
          placeholder="Escriba la contraseña"
        />
      </div>
      <div className={styles["text-center"]}>
        <button className={styles["btn-primary"]} type="submit">
          Iniciar Sesión
        </button>
      </div>
      <p className={styles["link-container"]}>
        ¿No tienes una cuenta? <Link href="/registro">Regístrate aquí</Link>
      </p>
    </Form>
  );
};

export default Login;
