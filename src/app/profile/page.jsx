"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Tabs from "../../components/Layout/Tabs";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import UserFrom from "../../components/Layout/UserFrom";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [user, setuser] = useState(null);
  const [profileSaved, setprofileSaved] = useState(false);
  const [profileSaving, setprofileSaving] = useState(false);

  const [isAdmin, setisAdmin] = useState(false);
  const [profileFetched, setprofileFetched] = useState(false);
  let userEmail = session?.data?.user?.email;
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setuser(data);
          setisAdmin(data.admin);
          setprofileFetched(true);
        });
      });
    }
  }, [session, status]);
  const handleProfileInfo = async (e, data) => {
    e.preventDefault();
    setprofileSaved(false);
    setprofileSaving(true);
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    setprofileSaving(false);
    if (response.ok) {
      setprofileSaved(true);
    }
  };

  if (status === "loading" || !profileFetched) {
    return (
      <div className="text-center mt-8 text-4xl text-primary">Loading...</div>
    );
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="mt-8">
      <div className=" mx-auto mt-8 ">
        <Tabs isAdmin={isAdmin} />
      </div>

      <div className="max-w-[18rem] mx-auto mt-8">
        {profileSaved && (
          <h1 className="text-center bg-green-200 rounded-lg border border-green-300 p-2">
            Profile Saved!
          </h1>
        )}
        {profileSaving && (
          <h1 className="text-center bg-blue-200 rounded-lg border border-blue-300 p-2">
            Saving...
          </h1>
        )}

        <UserFrom user={user} onSave={handleProfileInfo} />
      </div>
    </section>
  );
};

export default ProfilePage;
