'use client'
import Image from "next/image";
import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
const MenuItem = (menuItem) => {
  let { name, description, category, basePrice, sizes, extraIngredientPrice } =
    menuItem;
  const [selectedSize, setselectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setselectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [showPopup, setshowPopup] = useState(false);
  const handleAddToCartButton = () => {
    const hasOptions = sizes.length > 0 || extraIngredientPrice.length > 0;
    if (hasOptions && !showPopup) {
      setshowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setshowPopup(false);
    toast.success("Added To Cart");
  };

  let handleExtraThingClick = (e, extraThing) => {
    const checked = e.target.checked;
    if (checked) {
      setselectedExtras((prev) => [...prev, extraThing]);
    } else {
      setselectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  };
  let selectedPrice = Number(basePrice);

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setshowPopup(false)}
          className="fixed top-0 left-0 right-0 z-30 flex justify-center items-center bg-black/80 h-screen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-[90vh] modal p-6 rounded-lg max-w-md overflow-y-auto"
          >
            <Image
              src={"/pizza.png"}
              alt="pizza"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-center mb-2">{name}</h1>
            <p className="text-center text-gray-500 text-sm mb-4">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className="py-4">
                <h3 className="text-gray-500 text-center mb-2">
                  Pick Your Size
                </h3>
                {sizes.map((size) => (
                  <label
                    key={size._id}
                    className="p-3 flex items-center gap-1 rounded-md border hover:bg-gray-100"
                  >
                    <input
                      onChange={() => setselectedSize(size)}
                      checked={selectedSize?.name === size.name}
                      type="radio"
                      name="size"
                      className="mr-2"
                    />
                    {size.name} ${Number(basePrice) + Number(size.price)}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrice?.length > 0 && (
              <div className="py-4 ">
                <h3 className="text-gray-500 text-center mb-2">Any Extras?</h3>
                {extraIngredientPrice.map((extraThing) => (
                  <label
                    key={extraThing._id}
                    className="p-3 flex items-center gap-1 rounded-md border hover:bg-gray-100"
                  >
                    <input
                      onClick={(e) => handleExtraThingClick(e, extraThing)}
                      type="checkbox"
                      name={`extraThing`}
                      className="mr-2"
                    />
                    {extraThing.name} + ${Number(extraThing.price)}
                  </label>
                ))}
              </div>
            )}
            <button
              className="bg-primary sticky w-full bottom-0 text-white px-4 py-2 rounded-full  mt-4"
              onClick={handleAddToCartButton}
            >
              Add to Cart - ${selectedPrice}
            </button>
            <button
              type="button"
              className="mt-2"
              onClick={() => setshowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButton} {...menuItem} />
    </>
  );
};

export default MenuItem;
