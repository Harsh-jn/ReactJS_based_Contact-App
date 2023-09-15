import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import AddnUpdate from './AddnUpdate';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


const ContactCard = ({ contact }) => {

    const [isOpen, setOpen ] = useState(false);

    const onOpen = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id))
            toast.success("Contact Deleted Succefully");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div key={contact.id} className='bg-yellow items-center flex p-2 rounded-lg justify-between'>

                <div className='flex gap-2' >
                    <HiOutlineUserCircle className='text-orange text-4xl' />
                    <div>
                        <h1 className='font-medium text-lg'>{contact.name}</h1>
                        <h2 className='font-small text-m'>{contact.phone}</h2>
                        <p className='text-sm'>{contact.email}</p>
                    </div>
                </div>
                <div className='flex text-3xl'>
                    <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                    <IoMdTrash onClick={() => deleteContact(contact.id)} className='text-orange cursor-pointer' />
                </div>
            </div>

            <AddnUpdate isUpdate contact={contact} isOpen = {isOpen} onClose = {onClose} />
        </>

    );
};

export default ContactCard