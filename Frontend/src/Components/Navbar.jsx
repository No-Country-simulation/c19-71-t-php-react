import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({ setUser }) {
  const linkStyle = "p-4 border-2  uppercase text-center font-bold bg-white";

  const links = [
    { name: "perfil", path: "profile" },
    { name: "feed", path: "feed" },
    { name: "crear post", path: "createPost" },
    { name: "editar perfil", path: "updateProfile" },
  ];
  return (
    <div className="fixed h-full right-0  bg-black p-4 flex items-center">
      <ul className=" flex flex-col    gap-10  ">
        {links.map((link) => (
          <li key={link.name} className="grid">
            <Link to={`/${link.path}`} className={linkStyle}>
              {link.name}
            </Link>
          </li>
        ))}
        <li className="grid">
          <a
            className={linkStyle}
            onClick={() => {
              sessionStorage.removeItem("authToken");
              setUser("");
            }}
          >
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
}
