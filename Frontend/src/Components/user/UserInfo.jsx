import Button from "../Button";

function UserInfo({ user }) {
  // change
  const publications = 0;
  const followers = 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between  gap-2 items-center">
        <h2 className="text-xl font-semibold">
          {user.name} {user.lastName}
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

      <p className="text-base">
        {!user.description ? "Sin descripcion" : user.description}
      </p>
    </div>
  );
}

export default UserInfo;
