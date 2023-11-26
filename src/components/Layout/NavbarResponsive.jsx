"use client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../AppContext";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Menu", href: "/menu", current: false },
  { name: "About", href: "/#about", current: false },
  { name: "Contact", href: "#contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const session = useSession();
  const { cartProducts } = useContext(CartContext);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { status } = session;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <Disclosure as="nav" className="bg-white ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-primary cursor-pointer hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center cursor-pointer">
                  <Link href={"/"} className="md:text-3xl uppercase text-primary font-bold">Pizza Now</Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "rounded-md px-3 py-2 text-md cursor-pointer font-semibold",
                          {
                            "bg-primary text-white": item.current,
                            "text-gray-700 hover:bg-primary hover:text-white":
                              !item.current,
                          }
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 justify-center ">
                <div className="hidden sm:block ">
                  {status === "authenticated" ? (
                    <div className="flex items-center gap-4">
                      <Link href={"/profile"}>{userName}</Link>
                      <button
                        onClick={() => signOut()}
                        className="bg-primary text-white px-6 rounded-full py-2 "
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link href={"/login"}>Login</Link>
                      <Link
                        href={"/register"}
                        className="bg-primary text-white px-6 rounded-full py-2"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
                <Link href={"/cart"} className="relative ml-6">
                  <FiShoppingCart size={25} />
                  <span className="absolute -top-4 -right-4 bg-primary text-white p-1 text-sm rounded-full leading-3">
                    {cartProducts.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {status === "authenticated" ? (
                <div className="flex justify-between items-center mb-4">
                  <Link href={"/profile"} className="uppercase text-md">{userName}</Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-primary text-white px-6 rounded-full py-2 w-24"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-4">
                  <Link className="uppercase text-md" href={"/login"}>Login</Link>
                  <Link
                    href={"/register"}
                    className="bg-primary text-white px-6 rounded-full w-24"
                  >
                    Register
                  </Link>
                </div>
              )}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
