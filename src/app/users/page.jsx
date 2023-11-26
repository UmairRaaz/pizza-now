"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../components/Layout/Tabs";
import { useProfile } from "../../components/UseProfile";
import Link from "next/link";

const UsersPage = () => {
  const { data, loading } = useProfile();
  const [users, setusers] = useState([]);
  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => setusers(users));
    });
  }, []);
  if (loading) {
    return "Loading user Info....";
  }
  if (!data.admin) {
    return "Not a admin";
  }
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-300 rounded-lg mb-2 p-1 px-4 flex items-center "
            >
              <div className="grid md:grid-cols-3 gap-1 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No Name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={`/users/${user._id}`}>Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
