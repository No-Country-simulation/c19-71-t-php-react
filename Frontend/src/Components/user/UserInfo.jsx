import Button from "../ui/Button";

function UserInfo() {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex justify-between  gap-2 items-center">
        <h2 className="text-xl font-semibold">Camila Marcianetti</h2>
        <Button type="primary">Seguir</Button>
      </div>

      <div className="flex gap-6 items-center ">
        <p className="text-lg  font-medium">18 publicaciones</p>
        <p className="text-lg font-medium">55 seguidores</p>
      </div>

      <p className="text-base">
        🎬 Amante del cine | 🌟 Crítica aficionada | 🍿 Siempre en busca de la
        próxima película favorita | 🎥 ¡Comparte tus recomendaciones! #Cinefilia
        #Películas #CineLover
      </p>
    </div>
  );
}

export default UserInfo;
