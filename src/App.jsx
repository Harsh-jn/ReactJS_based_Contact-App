import React from 'react'
import Navbar from './components/Navbar';
import { GoSearch } from 'react-icons/go';
import { AiFillPlusCircle } from 'react-icons/ai';

import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import Modal from './components/Modal';
import AddnUpdate from './components/AddnUpdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoContacts from './components/NoContacts';


const App = () => {

  const [contacts, setContacts] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };



  useEffect(() => {

    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef ,(snapshot) =>{
        const contactList = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);  
        return contactList;
        });

      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);


  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef ,(snapshot) =>{
    const contactList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const filteredContacts = contactList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
    setContacts(filteredContacts);  
    return filteredContacts;
    });

  }




  return (
    <>
      <div className='max-w-[370px] mx-auto '>
        <Navbar />
        <div className='flex'>
          <div className='flex relative items-center flex-grow'>
            <GoSearch className='text-white ml-2 text-2xl absolute' />
            <input 
            onChange={filterContacts}
            text="text" placeholder='Search Contact' className='h-[40px] pl-10 text-white  flex-grow border bg-transparent border-white rounded-lg' />
          </div>
          <div>
            <AiFillPlusCircle onClick={onOpen} className='text-white ml-4 cursor-pointer text-5xl' />
          </div>
        </div>
        <div className='mt-4 gap-4 flex flex-col'>
          {
            contacts.length <= 0 ? <NoContacts /> :
            (contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
        
        <AddnUpdate isOpen = {isOpen} onClose = {onClose} />
        <ToastContainer position='bottom-center'/>
    </>


  )
}

export default App