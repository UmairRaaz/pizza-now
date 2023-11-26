"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginInProgress, setloginInProgress] = useState(false);
  let handleFormSubmit = async (e) => {
    e.preventDefault();
    setloginInProgress(true);

    try {
      console.log("Email:", email);
      console.log("Password:", password);

      await signIn("credentials", { email, password });
    } catch (error) {
      console.error("Authentication error:", error);
    }

    setloginInProgress(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          disabled={loginInProgress}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" className="mt-5 md:mt-0" disabled={loginInProgress}>
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
