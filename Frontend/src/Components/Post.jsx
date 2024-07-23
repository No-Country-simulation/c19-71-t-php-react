import React from "react";
import Avatar from "./Avatar";
export default function Post({ imageUrl, author, date, avatar }) {
  return (
    <div>
      <div>
        <Avatar imageUrl={avatar} />
        {author}

        {date}
      </div>
      <img src={imageUrl} alt="" />
    </div>
  );
}
