import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import Category from "../Components/Category";
import { useSearchParams } from "react-router-dom";

import { Sidebar } from "../Components/Sidebar";

const numberOfPostToFetch = 8;

export default function Feed({ user, setUser }) {
  const [posts, setPosts] = useState([]); // Use an empty array for initial state
  const [numberOfPostFetched, setNumberOfPostFetched] =
    useState(numberOfPostToFetch);

  ////////////////////////////

  const [searchParams] = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get("categoria") || "all";
  // let filteredPosts;

  console.log(filterValue);

  ////////////////////////////

  useEffect(() => {
    async function fetchPosts() {
      const apiUrlFromEnv = import.meta.env.VITE_API_URL;
      const apiUrl = `${apiUrlFromEnv}/posts?limit=${numberOfPostFetched}${
        searchParams ? `&${searchParams}` : ""
      }`;
      try {
        const response = await fetch(apiUrl); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    }

    fetchPosts(); //
  }, [numberOfPostFetched, searchParams]);

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
    <div className="relative">
      <div className=" flex bg-red-400">
        <Category />
        <Sidebar setUser={setUser} />
      </div>

      {!posts ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="flex flex-col   items-center  ">
          {posts.map((post) => (
            <Post key={post._id} data={post} currentUser={user} />
          ))}
        </ul>
      )}
    </div>
  );
}
