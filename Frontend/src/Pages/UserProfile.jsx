import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfo from "../Components/user/UserInfo.jsx";
import UserPublication from "../Components/user/UserPublication";
import Avatar from "../Components/Avatar";
import Button from "../Components/Button.jsx";
import { Sidebar } from "../Components/Sidebar.jsx";
function UserProfile({ user, setUser }) {
  const location = useLocation();
  const { authorUser: userFromLink } = location.state || {};
  const [posts, setPosts] = useState();
  const data = userFromLink ? userFromLink : user;
  useEffect(() => {
    async function fetchPosts() {
      const apiUrlFromEnv = import.meta.env.VITE_API_URL;
      const apiUrl = `${apiUrlFromEnv}/posts?userId=${data._id}`;
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
    <div className=" grid grid-cols-[16rem_1fr] min-h-screen gap-10">
      <div className=" bg-gray-200">
        <Sidebar setUser={setUser} />
      </div>

      <section className="py-[50px] px-[50px]  h-full lg:py-[76px] lg:px-[150px]">
        <div className="  flex flex-col gap-7 pb-[30px] md:flex-row  md:items-center">
          <Avatar imageUrl={data.avatar} />
          <UserInfo user={data} numberOfPosts={posts?.length}>
            {userFromLink && <Button type="primary">Seguir</Button>}
          </UserInfo>
        </div>

        {posts && <UserPublication posts={posts} currentUser={user} />}
      </section>
    </div>
  );
}

export default UserProfile;
