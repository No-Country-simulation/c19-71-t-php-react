import { useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../FormRow";
import Button from "../Button";
import UserAvatarEdit from "./UserAvatarEdit";

import { updateUserProfile } from "../../service/apiUser";

const inputStyle =
  "px-4 py-2 rounded-xl bg-[#eaeaeada] outline-none border-2 border-[transparent] focus:border-[#2c48d1] focus:border-2";

function UpdateUserDataForm({ user, setUser }) {
  const [photo, setPhoto] = useState();

  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      description: user.description,
      // you can add other default values here if needed
    },
  });
  const { errors } = formState;

  function onSubmit(value) {
    const data = { ...value, avatar: photo };

    updateUserProfile({ userId: user._id, data, setUser });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-y-5 min-[500px]:grid-cols-2 min-[500px]:gap-x-8"
    >
      <UserAvatarEdit setPhoto={setPhoto} />

      <FormRow label="Nombre" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          placeholder="Ingrese su nombre"
          className={inputStyle}
          defaultValue={user.name}
          {...register("name", {
            required: "Este campo es obligatorio",
          })}
        />
      </FormRow>

      <FormRow label="Usuario" error={errors?.username?.message}>
        <input
          type="text"
          id="username"
          placeholder="Ingrese su usuario"
          className={inputStyle}
          defaultValue={user.username}
          {...register("username", {
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
          defaultValue={user.lastName}
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
          defaultValue={user.email}
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, ingrese un correo electrónico válido.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Contraseña" error={errors?.password?.message}>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su contraseña"
          className={inputStyle}
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
          defaultValue={user.description}
          {...register("description")}
        ></textarea>
      </FormRow>

      <div className="col-[2/-1] flex justify-end my-7">
        <Button isForm={true}>Enviar</Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
