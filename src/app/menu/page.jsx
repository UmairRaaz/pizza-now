"use client";
import React, { useState, useEffect } from "react";
import SectionHeaders from "../../components/Layout/SectionHeaders";
import MenuItem from "../../components/Menu/MenuItem";

const MenuPage = () => {
  const [categories, setcategories] = useState("");
  const [menuItems, setmenuItems] = useState("");
  useEffect(() => {
    fetch("/api/categories").then((res) =>
      res.json().then((categories) => setcategories(categories))
    );
    fetch("/api/menu-items").then((res) =>
      res.json().then((menuItems) => setmenuItems(menuItems))
    );
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div>
              <SectionHeaders mainhead={c.name} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 mb-12 gap-4">
              {/* Check if menuItems is available before mapping */}
              {menuItems.length > 0 &&
                menuItems
                  .filter((item) => item.category === c._id)
                  .map((item) => (
                    <div key={item._id}>
                      <MenuItem {...item} />
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
