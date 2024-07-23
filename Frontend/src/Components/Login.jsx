import React from 'react'

export const Login = () => {
  return (
    <div className=' h-full w-full md:h-[610px] md:w-[539px] bg-[#D9D9D9] rounded-[40px] px-[60px] md:py-[86px] py-10'>

      <div className=' h-full w-full flex flex-col items-center gap-8 md:gap-16'>
        <input type='text' className='md:w-[405px] md:h-[80px] rounded-[10px] md:px-[20px] p-2 md:text-lg' placeholder='USUARIO O CORREO ELECTRÓNICO' />
        <input type='text' className='md:w-[405px] md:h-[80px] rounded-[10px] md:px-[20px] p-2 md:text-lg' placeholder='CONTRASEÑA' />
        <button type='submit' className='bg-primary text-white md:w-[434px] md:h-[88px] rounded-[40px] md:text-xl hover:bg-green-500 p-2'> INICIAR SESIÓN</button>
        <p className='md:text-xl'>¿OLVIDASTE TU CONTRASEÑA?</p>
      </div>
    </div>
  )
}
