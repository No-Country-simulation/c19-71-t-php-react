import React from "react";
import Avatar from "./Avatar";
export default function Post({ imageUrl, author, date, avatar }) {
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

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Avatar imageUrl={avatar} />
        <p>
          {author}
          <span className="ml-1">{getPublicationDate(date)}</span>
        </p>
      </div>
      <img src={imageUrl} alt="" />
    </div>
  );
}
