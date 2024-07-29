import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { GoZoomIn } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

export const Sidebar = () => {
  return (
    <nav className=' pt-20 pl-8 bg-gray-200 fixed z-10 h-full w-64'>
        <ul className='flex flex-col gap-4 '>
            <li>
                <NavLink to='/feed' className='flex gap-2 items-center hover:text-primary'>
                <IoHomeOutline />  Inicio
                </NavLink>
            </li>
            <li>
                <NavLink to='/myProfile' className='flex gap-2 items-center hover:text-primary'>
                  <IoPersonOutline/>  Mi perfil
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary'>
                  <IoSearchOutline/>  Buscar
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary'>
                 <GoZoomIn/>   Explorar
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary'>
                   <IoStarOutline/> Notificaciones
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary'>
                 <IoCloudUploadOutline/>   Subir
                </NavLink>
            </li>
            <li>
                <NavLink className='flex gap-2 items-center hover:text-primary'>
                  <IoLogOutOutline/>  Cerrar sesión
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}
