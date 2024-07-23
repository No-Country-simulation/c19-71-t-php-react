import React from "react";

export default function Avatar({ imageUrl }) {
  return (
    <img
      src={imageUrl}
      className="w-[56px] rounded-full border-2 border-solid border-black"
    />
  );
}
