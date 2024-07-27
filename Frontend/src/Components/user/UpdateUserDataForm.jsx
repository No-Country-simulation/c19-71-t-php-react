import { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../FormRow";
import Button from "../Button";
import UserAvatarEdit from "./UserAvatarEdit";

import { updateUserProfile } from "../../service/apiUser";

const inputStyle =
  "px-4 py-2 rounded-xl bg-[#eaeaeada] outline-none border-2 border-[transparent] focus:border-[#2c48d1] focus:border-2";

function UpdateUserDataForm() {
  const [photo, setPhoto] = useState();

  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  function onSubmit(value) {
    const data = { ...value, avatar: photo };

    updateUserProfile({ userId: 1, data });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" grid gap-y-5 min-[500px]:grid-cols-2 min-[500px]:gap-x-8"
    >
      <UserAvatarEdit setPhoto={setPhoto} />

      <FormRow label="Nombre" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          placeholder="Ingrese su nombre"
          className={inputStyle}
          // disabled={isLoading}
          {...register("name", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Usuario" error={errors?.usuario?.message}>
        <input
          type="text"
          id="usuario"
          placeholder="Confirma tu contraseña"
          className={inputStyle}
          //disabled={isLoading}
          {...register("usuario", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Apellido" error={errors?.lastName?.message}>
        <input
          type="text"
          id="lastName"
          placeholder="Ingrese su apellido"
          className={inputStyle}
          // disabled={isLoading}
          {...register("lastName", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Correo electrónico" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          placeholder="Ingrese su correo electrónico"
          className={inputStyle}
          //disabled={isLoading}
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, ingrese un correo electrónico válido.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Constraseña" error={errors?.password?.message}>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su constraseña"
          className={inputStyle}
          //disabled={isLoading}
          {...register("password", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow
        label="Confirmar contraseña"
        error={errors?.passwordConfirm?.message}
      >
        <input
          type="password"
          id="passwordConfirm"
          placeholder="Confirma tu contraseña"
          className={inputStyle}
          //disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este campo es obligatorio",
            validate: (value) =>
              value === getValues().password ||
              "Las contraseñas deben coincidir",
          })}
        />
      </FormRow>

      <FormRow
        label="Descripción"
        error={errors?.description?.message}
        expand={true}
      >
        <textarea
          id="description"
          name="description"
          className={`h-[100px] ${inputStyle}`}
          {...register("description")}
        ></textarea>
      </FormRow>

      <div className="col-[2/-1] flex justify-end my-7">
        <Button isForm={true}>Enviar</Button>
      </div>
    </form>
  );
}

// #D9D9D9

export default UpdateUserDataForm;
