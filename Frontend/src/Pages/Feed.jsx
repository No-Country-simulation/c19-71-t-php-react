import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
export default function Feed() {
  const [posts, setPosts] = useState([]); // Use an empty array for initial state
  const [numberOfPostFetched, setNumberOfPostFetched] =
    useState(numberOfPostToFetch);
  const numberOfPostToFetch = 12;
  useEffect(() => {
    async function fetchPosts() {
      const apiUrl = `https://dummyjson.com/products?limit=${numberOfPostFetched}`;
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
  }, [numberOfPostFetched]); // Empty dependency array to fetch posts only once on mount

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setNumberOfPostFetched((prev) => prev + numberOfPostToFetch);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {!posts ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="flex flex-col   items-center">
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
