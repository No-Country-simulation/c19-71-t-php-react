import React, { useState, useEffect, useRef } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    //
    console.log(formData);
  }, [formData]);

  function getFormData() {
    const data = {};
    const formElements = formRef.current.elements;
    const keys = ["name", "subname", "email", "password", "username"];
    keys.forEach((key) => {
      data[key] = formElements[key].value;
    });

    return data;
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormData(getFormData());
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
