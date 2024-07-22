import React, { useRef } from "react";

export default function SignIn() {
  const formRef = useRef(null);

  function getFormData() {
    const data = {};
    const formElements = formRef.current.elements;
    const keys = ["name", "subname", "email", "password", "username"];
    keys.forEach((key) => {
      data[key] = formElements[key].value;
    });

    return data;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const apiUrl = "apiurl.com";

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
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const inputStyle = "border-2 p-4 rounded-xl  ";

  return (
    <form
      ref={formRef}
      className="w-[700px] p-10 absolute top-0 border-2 right-0 flex flex-col items-center gap-10 rounded-3xl "
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold">Registrate en</h2>
      <div className="flex flex-wrap gap-10 justify-center  ">
        <input
          className={inputStyle}
          type="text "
          name="name"
          placeholder="NOMBRE"
          required
        />
        <input
          className={inputStyle}
          type="text"
          name="subname"
          placeholder="APELLIDO"
          required
        />
        <input
          className={inputStyle}
          type="text"
          name="username"
          placeholder="USUARIO"
          required
        />
        <input
          className={inputStyle}
          type="email"
          name="email"
          placeholder="EMAIL"
          required
        />
        <input
          className={inputStyle}
          type="password"
          name="password"
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
