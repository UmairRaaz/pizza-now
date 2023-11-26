"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInput from "./AddressInput";

const UserFrom = ({ user, onSave }) => {
  const [userName, setuserName] = useState(user?.name || "");
  console.log(userName);
  const [phone, setphone] = useState(user?.phone || "");
  const [postalCode, setpostalCode] = useState(user?.postalCode || "");
  const [city, setcity] = useState(user?.city || "");
  const [country, setcountry] = useState(user?.country || "");
  const [streetAddress, setstreetAddress] = useState(user?.streetAddress || "");
  const [admin, setadmin] = useState(user?.admin || false)
  const {data:loggedInUserData} = useProfile()

  let handleAddressChange = (propName, val) => {
    if(propName === "phone") setphone(val)
    if(propName === "postalCode") setpostalCode(val)
    if(propName === "city") setcity(val)
    if(propName === "country") setcountry(val)
    if(propName === "streetAddress") setstreetAddress(val)
  }
  return (
    <div className="flex flex-col w-full  gap-2 items-center justify-between">
      <div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={"/profileImage.png"}
            width={80}
            height={80}
            alt="avatar"
          />
        </div>
      </div>
      <div className="w-full">
        <form
          onSubmit={(ev) =>
            onSave(ev, {
              name: userName,
              phone,
              postalCode,
              city,
              country,
              streetAddress,
              admin,
            })
          }
        >
          <input
            type="text"
            className="text-black"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Enter First and Last Name"
          />
          <input type="email" disabled={true} value={user?.email} />
          <AddressInput addressProp={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
          />
          
          {loggedInUserData.admin && (
            <div>
            <label htmlFor="adminCb" className="inline-flex items-center  gap-2 p-2 my-2">
              <input id="adminCb" type="checkbox"
              value={"1"}
              checked={admin}
              onClick={(e)=>setadmin(e.target.checked)}
              />
              <span className=" mt-1" >Admin</span>
            </label>
          </div>
          )}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserFrom;
