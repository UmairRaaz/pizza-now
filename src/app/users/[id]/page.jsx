'use client'
import React, { useEffect, useState } from 'react'
import Tabs from '../../../components/Layout/Tabs'
import { useProfile } from '../../../components/UseProfile';
import UserFrom from '../../../components/Layout/UserFrom';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const EditUserPage = () => {
    const { data, loading } = useProfile();
    const [user, setuser] = useState(null)
    
    const {id} = useParams()
    useEffect(() => {
      fetch(`/api/profile?id=${id}`)
        .then(res => res.json())
        .then(user => {
          setuser(user)
        });
    }, [id]);

    const handleSaveButtonLink = async (ev, data) => {
      ev.preventDefault();
      const promise = new Promise (async(resolve, reject)=> {
        let response = await fetch("/api/profile", {
          method: "PUT",
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify({...data, _id: id})
        })
        if(response.ok){
          resolve()
        }else{
          reject()
        }
      })
      await toast.promise(promise, {
        loading : "User Saving...",
        success : "User Saved",
        error : "Oops, Error"
      })
      
      
    }
    if (loading) {
       return "Loading user Info....";
     }
     if (!data.admin) {
       return "Not a admin";
     }
  return (
    <section className='mt-8 mx-auto max-w-2xl'>
        <Tabs isAdmin={true}/>
        <div className='mt-8'>
            <UserFrom user={user} onSave={handleSaveButtonLink}/>
        </div>
    </section>
  )
}

export default EditUserPage