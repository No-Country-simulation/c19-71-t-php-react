import React, { useRef, useEffect, useState } from "react";
import Avatar from "./Avatar";
export default function Comment({
  className,
  date,
  message,
  authorId,
  getPublicationDate,
}) {
  const [author, setAuthor] = useState();

  useEffect(() => {
    async function fetchAuthor() {
      const apiUrl = `http://localhost:3000/users/${authorId}`;
      try {
        const response = await fetch(apiUrl); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }

    fetchAuthor(); // Call the function to fetch posts on component mount
  }, []);

  return (
    <div className={className}>
      <Avatar imageUrl={author?.avatar} />
      <div className="flex  flex-col gap-1">
        <p>
          <span>{author?.name}</span>

          {message}
        </p>
        <p>{getPublicationDate(date)}</p>
      </div>
    </div>
  );
}
