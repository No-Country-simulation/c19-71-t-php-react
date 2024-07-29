import React, { useState, useEffect } from "react";
import { Login } from "../Components/Login";
import { Modal } from "../Components/Modal";
import SignIn from "../Components/SignIn";

export const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-screen   flex justify-center  ">
      <div className="flex  flex-col md:flex-row  mt-10 md:mt-20 items-center  w-full md:h-[610px] md:w-[1236px]">
        <img
          src="/img/Golbalink-conectados es mejor- version N.png"
          alt="Logo de globalink"
          className=" h-28 w-28   md:h-[379px] md:w-[401px] md:ml-44 "
        />
        <div className="flex flex-col gap-10 md:mt-40 mt-10  ">
          <Login />
          <div className=" flex justify-center">
            <div className="flex justify-center bg-[#D9D9D9] h-auto w-auto rounded-[40px] md:h-[121px] md:w-[541px] items-center md:mr-32 p-2">
              <p className="md:text-xl">¿No tienes cuenta?</p>
              <p
                className="px-4  cursor-pointer md:text-xl text-blue-700 "
                onClick={() => setOpenModal(true)}
              >
                REGISTRATE
              </p>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <div>
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "
            onClick={() => setOpenModal(false)}
          />

          <Modal>
            <SignIn setOpenModal={setOpenModal} />
          </Modal>
        </div>
      )}
    </div>
  );
};
