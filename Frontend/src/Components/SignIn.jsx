import React, { useRef } from "react";
import Swal from "sweetalert2";
export default function SignIn({ setOpenModal }) {
  const formRef = useRef(null);

  function getFormData() {
    const data = {};
    const formElements = formRef.current.elements;
    const keys = ["name", "lastName", "email", "password", "username"];
    keys.forEach((key) => {
      data[key] = formElements[key].value;
    });

    return data;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const apiUrl = "http://localhost:3000/users/signup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getFormData()),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      Swal.fire({
        title: "Cuenta creada",

        icon: "success",
      });

      formRef.current.reset();
      setOpenModal(false);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Oops",
        text: `Error ${error.message}`,
        icon: "error",
      });
    }
  }

  const inputStyle = "border-2 p-4 rounded-xl  ";

  return (
    <form
      ref={formRef}
      className="w-[700px] p-10  bg-white  border-2 shadow-md  flex flex-col items-center gap-10 rounded-3xl "
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-2xl">Registrate en</h2>
      <div className="flex flex-wrap gap-10 justify-center  ">
        <input
          className={inputStyle}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="NOMBRE"
          required
        />

        <input
          className={inputStyle}
          type="text"
          name="lastName"
          autoComplete="family-name"
          placeholder="APELLIDO"
          required
        />

        <input
          className={inputStyle}
          type="text"
          name="username"
          autoComplete="username"
          placeholder="USUARIO"
          required
        />

        <input
          className={inputStyle}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="EMAIL"
          required
        />

        <input
          className={inputStyle}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="CONTRASEÑA"
          required
        />
      </div>
      <button
        type="submit"
        className="border-2 w-[300px] h-[50px] rounded-3xl back bg-blue-500 text-white"
      >
        REGISTRARME
      </button>
    </form>
  );
}
