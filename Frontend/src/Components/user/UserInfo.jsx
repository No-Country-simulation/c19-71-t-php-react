import Button from "../Button";

function UserInfo({ user }) {
  // change
  const publications = 0;
  const followers = 0;
  const description =
    "🎬 Amante del cine | 🌟 Crítica aficionada | 🍿 Siempre en busca de la próxima película favorita | 🎥 ¡Comparte tus recomendaciones! #Cinefilia #Películas #CineLover";

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between  gap-2 items-center">
        <h2 className="text-xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h2>

        <Button type="primary">Seguir</Button>
      </div>

      <div className="flex gap-6 items-center ">
        <p className="text-lg  font-medium">
          {publications > 1
            ? `${publications} Publicaciones`
            : `${publications} Publicacion`}
        </p>

        <p className="text-lg font-medium">
          {followers > 1 ? `${followers} Seguidores` : `${followers} Seguidor`}
        </p>
      </div>

      {description !== "" && <p className="text-base">{description}</p>}
    </div>
  );
}

export default UserInfo;
