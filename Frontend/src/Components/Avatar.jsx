import React from "react";

export default function Avatar({ imageUrl }) {
  return (
    <img
      src={imageUrl}
      className="w-[56px] h-[56px] object-cover rounded-full border-2 border-solid border-black"
    />
  );
}
