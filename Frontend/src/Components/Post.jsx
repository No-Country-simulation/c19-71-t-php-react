import React, { useRef } from "react";
import Avatar from "./Avatar";
export default function Post({ imageUrl, author, date, avatar }) {
  const dialogRef = useRef(null);
  function getPublicationDate(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }
    const now = new Date();
    const diff = now - date; // difference in milliseconds
    console.log(`the diff is ${diff}`);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `hace ${days} d`;
    } else if (hours > 0) {
      return `hace ${hours} h`;
    } else {
      return `hace ${minutes} min`;
    }
  }
  function clickOutsideToClose(e) {
    const modal = dialogRef.current;
    if (e.target === modal) {
      modal.close();
    }
  }

  function openModal() {
    const modal = dialogRef.current;
    modal.showModal();
    modal.addEventListener("click", clickOutsideToClose, { once: true });
  }

  return (
    <div>
      <dialog ref={dialogRef}>
        <div className="flex">
          <img src={imageUrl} alt="" className="  h-[90vh]" />
          <div>comments</div>
        </div>
      </dialog>
      <div className="flex flex-col gap-3 py-20">
        <div className="flex gap-3 items-center">
          <Avatar imageUrl={avatar} />
          <p className="font-bold flex gap-2">
            {author}
            <span>•</span>
            <span className="font-normal">{getPublicationDate(date)}</span>
          </p>
        </div>
        <div
          className="w-[468px] h-[585px] border-2 border-solid border-black bg-black flex items-center justify-center"
          onClick={openModal}
        >
          <img src={imageUrl} alt="" className="  bg-white max-h-full   " />
        </div>
      </div>
    </div>
  );
}
