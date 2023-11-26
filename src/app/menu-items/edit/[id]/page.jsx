"use client";
import Tabs from "../../../../components/Layout/Tabs";
import RightArrow from "../../../../components/Icons/RightArrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useProfile } from "../../../../components/UseProfile";
import MenuItemForm from "../../../../components/Layout/MenuItemForm";
import DeleteButton from "../../../../components/DeleteButton"
const EditMenuItem = () => {
  const { id } = useParams();
  const [menuItem, setmenuItem] = useState(null);
  const { data, loading } = useProfile();
  const [redirectToItems, setredirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setmenuItem(item);
      });
    });
  }, []);

  let handleFormSubmit = async (e, data) => {
    e.preventDefault();
    console.log(data)
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        let response = await fetch("/api/menu-items", {
          method: "PUT",
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resolve();
        } else {
          // If the response is not okay, reject with an error object
          reject(new Error(`HTTP error! Status: ${response.status}`));
        }
      } catch (error) {
        // Catch any other errors that may occur during the fetch
        reject(error);
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved",
      error: "Oops, Some Error...",
    });
    setredirectToItems(true)
  };

  let handleDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/menu-items?_id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
      await toast.promise(promise, {
        loading: "Deleting item",
        success: "Deleted",
        error: "Oops, Some Error...",
      });
      setredirectToItems(true)
    });
  }
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
        <Link
          href={"/menu-items"}
          className="button gap-2 items-center justify-center"
        >
          <span>Show all menu items</span>
          <RightArrow />
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-sm mx-auto mt-4">
        <DeleteButton label={"Delete this menu item"} onDelete={handleDelete}/>
      </div>
    </section>
  );
};

export default EditMenuItem;
