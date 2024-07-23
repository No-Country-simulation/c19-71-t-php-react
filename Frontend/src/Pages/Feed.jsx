import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
export default function Feed() {
  const [posts, setPosts] = useState([]); // Use an empty array for initial state

  useEffect(() => {
    async function fetchPosts() {
      const apiUrl = "https://dummyjson.com/products";
      try {
        const response = await fetch(apiUrl); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setPosts(data.products);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }

    fetchPosts(); // Call the function to fetch posts on component mount
  }, []); // Empty dependency array to fetch posts only once on mount

  return (
    <div>
      {!posts ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <Post
              key={post.id}
              author={post?.brand}
              imageUrl={post.images[0]}
              date={post.reviews[0].date}
              avatar={post.thumbnail}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
