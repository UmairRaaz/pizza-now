'use client'
import Image from "next/image";
import React, {useEffect, useState} from "react";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

const HomeMenu = () => {
  const [bestSeller, setbestSeller] = useState([])
  useEffect(() => {
    fetch("/api/menu-items").then(res => res.json()
    .then(menuItems => {const bestSellers = menuItems.slice(-3);
      setbestSeller(bestSellers)
    })

    )
  }, []);
  return (
    <section className="z-10 mt-8 sm:mt-16 px-4 md:px-0">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="h-48 absolute w-48 -top-12 -left-12 hidden md:block">
          <Image src={"/sallad1.png"} alt="salad" width={180} height={180} />
        </div>
        <div className="h-48 absolute -top-16 right-0 hidden md:block">
          <Image src={"/sallad2.png"} alt="salad" width={157} height={195} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders mainhead={"Menu"} subhead={"Check Out Best Sellers"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {bestSeller?.length > 0 && bestSeller.map(item => (
        <MenuItem key={bestSeller.length} {...item} />
      ))}
      </div>
    </section>
  );
};

export default HomeMenu;
