import { useRef, useState } from "react";
import { TfiPencilAlt } from "react-icons/tfi";

// cambiar con la actual foto del usuario
import userPhoto from "../../../public/img/default-user.jpg";

function UserAvatarEdit({ setPhoto }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    setPhoto(file);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <button
      type="button"
      className="group relative col-span-full justify-self-center rounded-full w-[120px] h-[120px] border-2 hover:border-[#2c48d1]  "
      onClick={handlePickClick}
    >
      <img
        src={pickedImage || userPhoto}
        alt="User Avatar"
        className="object-cover rounded-full w-[100%] h-[100%]"
      />

      <span className=" absolute top-[5px] right-[-25px] stroke-1 ">
        <TfiPencilAlt className=" w-[25px] h-[25px] fill-[#eaeaeada] group-hover:fill-[#2c48d1]" />
      </span>

      <input
        id="photo"
        name="photo"
        type="file"
        hidden
        accept="image/png, image/jpeg"
        ref={imageInput}
        onChange={handleImageChange}
      />
    </button>
  );
}

export default UserAvatarEdit;
