"use client";
import { useLoadSingleUserFriend } from "@/app/hooks/useLoadSingleUserFriend";
import IMAddPurchase from "@/app/models/Purchase/AddPurchase";
import React, { useCallback, useRef } from "react";
import { api } from "../../../../services/api";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import Swal from "sweetalert2";
import * as Yup from "yup";
import styles from "./gasto.module.css";

const GastoAmistad = ({ params }: any) => {
  const { id } = params;
  const { userFriend } = useLoadSingleUserFriend(id);
  const router = useRouter();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IMAddPurchase) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          concept: Yup.string().required(
            "Por favor escriba el concepto del gasto"
          ),
          amount: Yup.string().required("Por favor escriba el valor del gasto"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const purchaseToCreate: IMAddPurchase = {
          concept: data.concept,
          amount: data.amount,
          user_friends_id: id,
          debt_percent: 50,
        };

        await api.post(`purchases/`, purchaseToCreate);

        router.push(`/resumen/${id}`);
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: "Los datos son incorrectos, intente nuevamente",
          icon: "error",
        });
      }
    },
    [id, router]
  );

  return (
    <>
      <div className={styles["friend-info"]}>
        Agregando gasto compartido con tu amigo: {userFriend?.friend.name}
      </div>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        placeholder={undefined}
        className={styles["form-container"]}
      >
        <div className={styles["form-group"]}>
          <label htmlFor="concept">Detalle</label>
          <Input
            className={styles["form-control"]}
            type="text"
            name="concept"
            placeholder="¿Qué compraste?"
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="amount">Valor</label>
          <Input
            className={styles["form-control"]}
            type="number"
            name="amount"
            placeholder="¿Cuánto gastaste?"
          />
        </div>
        <div className={styles["text-center"]}>
          <button className={styles["btn-primary"]} type="submit">
            Añadir
          </button>
        </div>
      </Form>
    </>
  );
};

export default GastoAmistad;
