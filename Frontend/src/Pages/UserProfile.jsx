import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfo from "../Components/user/UserInfo.jsx";
import UserPublication from "../Components/user/UserPublication";
import Avatar from "../Components/Avatar";
import Button from "../Components/Button.jsx";
function UserProfile({ user }) {
  const location = useLocation();
  const { authorUser: userFromLink } = location.state || {};

  const data = userFromLink ? userFromLink : user;

  return (
    <div className=" grid grid-cols-[16rem_1fr] min-h-screen gap-10">
      <div className=" bg-gray-200">sidebar</div>

      <section className="py-[50px] px-[50px]  h-full lg:py-[76px] lg:px-[150px]">
        <div className="  flex flex-col gap-7 pb-[30px] md:flex-row  md:items-center">
          <Avatar imageUrl={data.avatar} />
          <UserInfo user={data}>
            {userFromLink && <Button type="primary">Seguir</Button>}
          </UserInfo>
        </div>

        <UserPublication publication={[]} />
      </section>
    </div>
  );
}

export default UserProfile;
