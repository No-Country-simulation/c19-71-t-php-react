import React from 'react'

export const Home = () => {
  return (
    <div>
      <div className='flex flex-col md:flex-row items-center justify-between mx-28 my-14 h-[610px] w-[1236px]'>
        <img src='/Golbalink-conectados es mejor- version N.png' alt='Logo de globalink' className='h-[379px] w-[401px] ml-44' />
        <div className=' h-[610px] w-[539px] bg-[#D9D9D9] rounded-[40px] px-[60px] py-[86px]'>

          <div className=' h-full w-full flex flex-col items-center  gap-16'>
            <input type='text' className='w-[405px] h-[80px] rounded-[10px] px-[20px]' placeholder='USUARIO O CORREO ELECTRÓNICO' />
            <input type='text' className='w-[405px] h-[80px] rounded-[10px] px-[20px]' placeholder='CONTRASEÑA' />
            <button type='submit' className='bg-primary text-white w-[434px] h-[88px] rounded-[40px] text-xl hover:bg-green-500'> INICIAR SESIÓN</button>
            <p className='text-xl'>¿OLVIDASTE TU CONTRASEÑA?</p>
          </div>
        </div>

      </div>
      <div className=' flex justify-end  '>
        <div className='flex justify-center bg-[#D9D9D9] rounded-[40px] h-[121px] w-[541px] items-center mr-32'>
          <p className='text-xl'>¿No tienes cuenta?</p>
          <p className='px-4 text-blue-700 cursor-pointer text-xl '>REGISTRATE</p>
        </div>
      </div>
    </div>
  )
}
