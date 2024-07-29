import { useEffect, useState } from "react";

import UserInfo from "./UserInfo";
import UserPublication from "./UserPublication";
import Avatar from "../Avatar";
import Spinner from "../Spinner";

function UserProfile({ user }) {
  return (
    <div className=" grid grid-cols-[16rem_1fr] min-h-screen gap-10">
      <div className=" bg-gray-200">sidebar</div>

      <section className="py-[50px] px-[50px]  h-full lg:py-[76px] lg:px-[150px]">
        <div className="  flex flex-col gap-7 pb-[30px] md:flex-row  md:items-center">
          <Avatar imageUrl={user.imageURL} />
          <UserInfo user={user} />
        </div>

        <UserPublication publication={[]} />
      </section>
    </div>
  );
}

export default UserProfile;
