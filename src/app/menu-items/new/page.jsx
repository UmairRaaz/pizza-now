"use client";
import React, { useState } from "react";
import Tabs from "../../../components/Layout/Tabs";
import { useProfile } from "../../../components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from '../../../components/Icons/RightArrow'
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/Layout/MenuItemForm"
const NewMenuItemPage = () => {
    const [file, setfile] = useState("");
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [basePrice, setbasePrice] = useState("");
    const { data, loading } = useProfile();
    const [redirectToItems, setredirectToItems] = useState(false)
  
    let handleFormSubmit = async (e, data) => {
      e.preventDefault();
      const savingPromise = new Promise(async (resolve, reject) => {
        try {
          let response = await fetch("/api/menu-items", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        } catch (error) {
          reject(error);
        }
      });
    
      await toast.promise(savingPromise, {
        loading: "Saving this tasty item",
        success: "Saved",
        error: "Some Error...", // Removed the comma before the string
      });
    
      setredirectToItems(true);
    };
    
    if(redirectToItems){
      return redirect("/menu-items")
    }
    if (loading) {
      return "Loading user Info....";
    }
    if (!data.admin) {
      return "Not a admin";
    }
  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link href={"/menu-items"} className="button gap-2 items-center justify-center">
          <span>Show all menu items</span>
          <RightArrow/>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  )
}

export default NewMenuItemPage