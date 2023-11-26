"use client";
import React, { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Tabs from "../../components/Layout/Tabs";
import Link from "next/link";
import RightArrow from "../../components/Icons/RightArrow";
import Image from "next/image";
const MenuItemPage = () => {
  const [menuItems, setmenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setmenuItems(menuItems));
    });
  }, []);
  const { data, loading } = useProfile();
  if (loading) {
    return "Loading user Info....";
  }
  if (!data.admin) {
    return "Not a admin";
  }
  return (
    <section className="mt-8 max-w-md  mx-auto">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex justify-center gap-2 items-center"
          href={"/menu-items/new"}
        >
          <span>Create New Item </span>
          <RightArrow />
        </Link>
      </div>
      <h2 className="text-sm text-gray-500 mt-8">Edit menu Items: </h2>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
        {menuItems?.length > 0 &&
          menuItems.map((items) => (
            <Link
              href={`/menu-items/edit/${items._id}`}
              className="bg-gray-200 rounded-lg p-4 m-2"
              key={items._id}
            >
              <div className="relative">
                <Image
                className=""
                  src={"/pizza.png"}
                  width={100}
                  height={100}
                  alt="pizza"
                />
              </div>
              <div className="text-center">{items.name}</div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default MenuItemPage;
