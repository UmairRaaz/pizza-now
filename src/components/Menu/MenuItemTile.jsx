import Image from "next/image";
import React from "react";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { name, description, basePrice, sizes, extraIngredientPrice } = item;
  return (
    <div className="bg-gray-200 hover:shadow-md hover:shadow-black/25 p-4 rounded-lg text-center hover:bg-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center flex-col">
      <div className="text-center">
        <Image
          src={"/pizza.png"}
          width={150}
          height={150}
          className="max-h-24 mx-auto rounded-full"
          alt="pizza"
        />
      </div>

      <h4 className="font-semibold text-xl my-2">{name} </h4>
      <p className="text-gray-500 text-sm">{description}</p>
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary mt-4 text-center text-white rounded-full px-8 py-3 focus:outline-none hover:bg-primary-dark transition-all duration-300 ease-in-out text-sm w-[75%] flex items-center"
      >
        <span>
          {sizes?.length > 0 || extraIngredientPrice?.length > 0 ? (
            <span>Add to Cart (from ${basePrice})</span>
          ) : (
            <span>Add to Cart ${basePrice}</span>
          )}
        </span>
      </button>
    </div>
  );
};

export default MenuItemTile;
