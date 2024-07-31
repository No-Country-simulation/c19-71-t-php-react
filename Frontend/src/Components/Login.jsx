import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const apiUrlFromEnv = import.meta.env.VITE_API_URL;
  const API_USERS = `${apiUrlFromEnv}/users/signin`;

  const onSubmit = async (e) => {
    // 'emilys', 'emilyspass'
    e.preventDefault();
    const dataLogin = {
      username: e.target.user.value,
      password: e.target.password.value,
    };

    try {
      const res = await fetch(API_USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataLogin),
      });
      const data = await res.json();
      console.log(data);

      if (data.token) {
        sessionStorage.setItem("authToken", data.token);
        console.log(`token is : ${data.token}`);
        navigate("/feed");
      } else {
        Swal.fire({
          title: "Error",
          text: `Usuario o Contraseña incorrectos`,
          icon: "error",
        });
      }
    } catch (error) {
      // console.log('error')
      Swal.fire({
        title: "Oops",
        text: `Error ${error.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div className=" h-full w-full md:h-[610px] md:w-[539px] bg-[#D9D9D9] rounded-[40px] px-[60px] md:py-[86px] py-10">
      <form onSubmit={onSubmit}>
        <div className=" h-full w-full flex flex-col items-center gap-8 md:gap-16">
          <input
            type="text"
            name="usuio"
            id="user"
            required
            className="md:w-[405px] md:h-[80px] rounded-[10px] md:px-[20px] p-2 md:text-lg"
            placeholder="USUARIO O CORREO ELECTRÓNICO"
          />
          <input
            type="password"
            name="contraseña"
            id="password"
            required
            className="md:w-[405px] md:h-[80px] rounded-[10px] md:px-[20px] p-2 md:text-lg"
            placeholder="CONTRASEÑA"
          />
          <button
            type="submit"
            className="bg-primary text-white md:w-[434px] md:h-[88px] rounded-[40px] md:text-xl hover:bg-green-500 p-2"
          >
            {" "}
            INICIAR SESIÓN
          </button>
          <p className="md:text-xl">¿OLVIDASTE TU CONTRASEÑA?</p>
        </div>
      </form>
    </div>
  );
};
