"use client";
import React from "react";
import Link from "next/link";
import { useState, useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import { FiShoppingCart } from "react-icons/fi";
const Navbar = () => {
  const session = useSession();
  const { cartProducts } = useContext(CartContext);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { status } = session;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header className="flex justify-between items-center">
      <nav className="flex gap-8 text-gray-500 font-semibold items-center">
        <Link href={"/"} className="text-primary font-semibold text-2xl">
          PIZZA NOW
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center font-semibold gap-4 text-gray-500">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"}>{userName}</Link>
            <button
              onClick={() => signOut()}
              className="bg-primary text-white px-6 rounded-full py-2"
            >
              Logout
            </button>
          </>
        )}
        {status !== "authenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary text-white px-6 rounded-full py-2"
            >
              Register
            </Link>
          </>
        )}
        <Link href={"/cart"} className="relative">
          <FiShoppingCart size={25}/>
          <span className="absolute -top-4 -right-4 bg-primary text-white p-1 text-sm rounded-full leading-3">{cartProducts.length}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
