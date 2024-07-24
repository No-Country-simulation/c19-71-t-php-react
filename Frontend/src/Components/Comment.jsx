import React from "react";
import Avatar from "./Avatar";
export default function Comment({ date, message, author, getPublicationDate }) {
  return (
    <div className="flex gap-4  ">
      <Avatar imageUrl={author.avatar} />
      <div className="flex  flex-col gap-1">
        <p>
          <span>{author.name}</span>
          {message}
        </p>
        <p>{getPublicationDate(date)}</p>
      </div>
    </div>
  );
}
