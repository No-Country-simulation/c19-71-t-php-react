import React from "react";

export default function SignIn() {
  return (
    <div className="w-[500px] p-10 absolute top-0 border-2 right-0 flex flex-col items-center gap-10 rounded-3xl ">
      <h2 className="font-bold">Registrate en</h2>
      <div className="flex flex-wrap gap-10 justify-center text-center">
        <input type="text" placeholder="NOMBRE" />
        <input type="text" placeholder="APELLIDO" />
        <input type="text" placeholder="USUARIO" />
        <input type="text" placeholder="EMAIL" />
        <input type="text" placeholder="CONTRASEÑA" />
      </div>
      <button className="border-2 w-[300px] h-[50px] rounded-3xl back bg-blue-500 text-white">
        REGISTRARME
      </button>
    </div>
  );
}
