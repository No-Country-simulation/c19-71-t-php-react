import React from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({ children }) => {
  return createPortal(
    <div className='fixed z-20 top-2/4 left-2/4'>
      {children}
    </div>,
    document.getElementById('modal')
  )
}
