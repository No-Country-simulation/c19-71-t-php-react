import React from "react";

export default function CreatePost() {
  return (
    <div className="flex align-middle justify-center">
      <form className="flex flex-col gap-5 items-center">
        <h2>Crea un post</h2>
        <input name="description" type="text" placeholder="descripcion" />
        <input name="imagen" type="text" placeholder="imagen" />
        <button>Crear</button>
      </form>
    </div>
  );
}
