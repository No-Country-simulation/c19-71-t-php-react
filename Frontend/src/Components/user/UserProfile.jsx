import UserAvatar from "./UserAvatar";
import UserInfo from "./UserInfo";
import UserPublication from "./UserPublication";

function UserProfile() {
  return (
    <div className=" grid grid-cols-[16rem_1fr] min-h-screen gap-10  ">
      <div className=" bg-gray-200">sidebar</div>

      <section className="py-[50px] px-[50px]  h-full lg:py-[76px] lg:px-[150px]">
        <div className="flex flex-col gap-7 pb-[30px] md:flex-row md:justify-between md:items-center">
          <UserAvatar />
          <UserInfo />
        </div>

        <UserPublication />
      </section>
    </div>
  );
}

/*
width: Hug (1,034px)px;
height: Hug (1,067px)px;
padding: 76px 164px 76px 164px;
gap: 10px;
opacity: 0px;

*/

export default UserProfile;
