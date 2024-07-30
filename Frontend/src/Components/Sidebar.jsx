import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { GoZoomIn } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";

export const Sidebar = ({ setUser }) => {
  return (
    <nav className=' pt-20 pl-8 bg-gray-200 fixed z-10 h-full w-64'>
        <ul className='flex flex-col gap-4 '>
            <li>
                <NavLink to='/feed' className='flex gap-2 items-center hover:text-primary text-lg'>
                <IoHomeOutline />  Inicio
                </NavLink>
            </li>
            <li>
                <NavLink to='/profile' className='flex gap-2 items-center hover:text-primary text-lg'>
                  <IoPersonOutline/>  Mi perfil
                </NavLink>
            </li>
            <li>
                <NavLink to='/updateProfile' className='flex gap-2 items-center hover:text-primary text-lg'>
                  <LiaUserEditSolid/>  Editar perfil
                </NavLink>
            </li>
            <li>
                <NavLink to='/createPost' className='flex gap-2 items-center hover:text-primary text-lg'>
                 <IoCloudUploadOutline/>   Nuevo post
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary text-lg'>
                <IoSearchOutline/>   Buscar
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary text-lg'>
                   <IoStarOutline/> Notificaciones
                </NavLink>
            </li>
           
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary text-lg' 
                onClick={() => {
              sessionStorage.removeItem("authToken");
              setUser("");
            }}>
                  <IoLogOutOutline/>  Cerrar sesión
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
