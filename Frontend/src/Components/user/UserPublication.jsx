import { useEffect, useState } from "react";

function UserPublication({ userId }) {
  const [posts, setPosts] = useState();
  useEffect(() => {
    async function fetchPosts() {
      const apiUrl = `http://localhost:3000/posts?userId=${userId}`;
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
  }, []);

  return (
    <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 p-2">
      {posts ? (
        posts.map((post) => (
          <li key={post._id}>
            <img
              src={post.imageURL}
              className="w-full h-[100%] object-cover block"
            />
          </li>
        ))
      ) : (
        <p className="col-span-3 text-center mt-4 text-lg  font-medium">
          Aún no hay publicaciones.
        </p>
      )}
    </ul>
  );
}

export default UserPublication;
