import photo from "../../../public/img/default-user.jpg";

function UserAvatar() {
  return (
    <img
      src={photo}
      className="object-cover rounded-full w-[100px] h-[100px]"
    />
  );
}

export default UserAvatar;
