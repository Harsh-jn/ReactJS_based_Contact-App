import React from 'react'
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
    return createPortal(
        <>
            {isOpen && (
                <div o className=' absolute grid top-0 z-40 backdrop-blur h-screen w-screen'>
                    <div className='min-h-[200px] m-auto min-w-[35%] z-50 relative bg-white p-4'>
                        <div className='flex justify-end'>
                            <AiOutlineClose onClick={onClose} className='text-2xl' />
                        </div>
                        {children}
                    </div>
        </div>
    )
}
        </>


    ,document.getElementById('modal-root'))
};

export default Modal