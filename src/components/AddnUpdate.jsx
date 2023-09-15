import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc ,collection, doc, updateDoc } from 'firebase/firestore'
import { db } from "../config/firebase";
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    phone:Yup.string().required("Phone No. is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required"),


});



const AddnUpdate = ({isOpen , onClose , isUpdate , contact} ) => {

    const addContact =async (contact ,id) => {
        try {
            
            const contactRef = collection(db,"contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Saved Successfully")
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact =async (contact,id) => {
        try {
            
            const contactRef = doc(db,"contacts" ,id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success('Updated Successfuly ')

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
    <Modal isOpen = {isOpen}
      onClose = {onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
        initialValues={isUpdate ? 
            {
                name:contact.name,
                phone:contact.phone,
                email: contact.email 
            }
            :{
            name:"",
            phone:"",
            email:"" 
        }}
        onSubmit={(values)=>{console.log(values);
            isUpdate ? updateContact(values , contact.id) : addContact(values);
        
        
        }}
        >
            
            <Form className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name</label>
                <Field name="name" className="border h-10 rounded-md" />
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name ="name" />
                </div>                    
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor='phone'>Phone No.</label>
                <Field name="phone" className="border h-10 rounded-md" />
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name ="phone" />
                </div>                       
                </div>
                <div className='flex flex-col gap-1 '>
                <label htmlFor='email'>Email</label>
                <Field name="email" className="border h-10 rounded-md" />
                <div className='text-red-500 text-xs'>
                    <ErrorMessage name ="email" />
                </div>                          
                </div>
                <button className='bg-orange px-3 py-1.5 self-end border rounded-md'>{isUpdate ? 'Edit' : "Save"} Contact</button>

            </Form>
        </Formik>
      </Modal>
    </div>
  )
}

export default AddnUpdate