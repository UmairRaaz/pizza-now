"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../components/Layout/Tabs";
import { useProfile } from "../../components/UseProfile";
import { POST } from "../api/auth/[...nextauth]/route";
import toast from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";

const CategoriesPage = () => {
  const [categoryName, setcategoryName] = useState("");
  const { data: profileData, loading: profileLoading } = useProfile();
  const [categories, setcategories] = useState([]);
  const [editedCategory, seteditedCategory] = useState(null);
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = () => {
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setcategories(data));
  };
  let handleCategorySubmit = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      let data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setcategoryName("");
      fetchCategory();
      seteditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating Category"
        : "Creating your new category",
      success: editedCategory ? "Updated Category" : "Category created",
      error: "Error, sorry...",
    });
    
  };
  let handleDelete = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/categories?_id=${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: "Deleting Category",
      success: "Category Deleted",
      error: "Error, sorry...",
    });
    fetchCategory()
  }
  if (profileLoading) {
    return "Loading user Info....";
  }
  if (!profileData.admin) {
    return "Not a admin";
  }
  return (
    <section className="mt-8 max-w-[35rem] mx-auto">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 justify-center items-center">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category Name" : "New Category Name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              value={categoryName}
              onChange={(e) => setcategoryName(e.target.value)}
              type="text"
            />
          </div>
          <div className="mt-6 flex gap-1">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button type="button"
            onClick={()=> {seteditedCategory(null); setcategoryName("")}}
            >Cancel</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="text-sm mt-8 text-gray-500">Existing Category</h2>
        {categories.length > 0 &&
          categories.map((c) => (
            <div
              key={c.id}
              className="bg-gray-300 rounded-xl p-2 px-4 flex gap-1  mb-1 items-center"
            >
              <div className="grow">
                {c.name}
              </div>
              <div className="flex gap-1">
                <button
                className="border-1 border-white"
                  type="button"
                  onClick={() => {
                    seteditedCategory(c);
                    setcategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton label={"Delete"} onDelete={()=>handleDelete(c._id)} />
                
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
