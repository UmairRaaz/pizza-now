"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [creatingUser, setcreatingUser] = useState(false);
  const [userCreated, setuserCreated] = useState(false)
  const [error, seterror] = useState(false);
  let handleSubmit = async (e) => {
    e.preventDefault();
    setcreatingUser(true);
    seterror(false)
    setuserCreated(false)
    let response = await fetch("/api/register", {
      method: "Post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    if(response.ok){
      setuserCreated(true)
    }
    else{
      seterror(true);
    }
    setcreatingUser(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          <h1>
            User Created. <br /> now you can{" "}
            <Link className="underline" href={"/login"}>
              Login
            </Link>{" "}
          </h1>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An Error has occured <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          disabled={creatingUser}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" className="mt-5 md:mt-0" disabled={creatingUser}>
          Register
        </button>  
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{' '} <Link className="underline " href={"/login"}>Login Here</Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
