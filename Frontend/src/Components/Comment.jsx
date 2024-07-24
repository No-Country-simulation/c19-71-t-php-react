import React from "react";
import Avatar from "./Avatar";
export default function Comment({
  className,
  date,
  message,
  author,
  getPublicationDate,
}) {
  return (
    <div className={className}>
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
