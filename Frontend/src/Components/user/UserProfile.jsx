import { useEffect, useState } from "react";

import UserInfo from "./UserInfo";
import UserPublication from "./UserPublication";
import Avatar from "../Avatar";

function UserProfile() {
  const [user, setUser] = useState(null);

  const userId = 2;

  useEffect(() => {
    async function getUser() {
      const apiUrl = `https://dummyjson.com/users/${userId}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        setUser(data);
      } catch (err) {
        console.log("💥ERROR: ", err.message);
      }
    }

    getUser();
  }, [userId]);

  return (
    <div className=" grid grid-cols-[16rem_1fr] min-h-screen gap-10">
      <div className=" bg-gray-200">sidebar</div>

      <section className="py-[50px] px-[50px]  h-full lg:py-[76px] lg:px-[150px]">
        <div className="  flex flex-col gap-7 pb-[30px] md:flex-row  md:items-center">
          <Avatar imageUrl={user?.image} />
          <UserInfo user={user} />
        </div>

        <UserPublication publication={[]} />
      </section>
    </div>
  );
}

export default UserProfile;
