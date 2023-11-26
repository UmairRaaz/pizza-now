import Image from "next/image";
import React from "react";
import RightArrow from "../Icons/RightArrow";

const Hero = () => {
  return (
    <div className="hero mt-0 md:mt-8 flex flex-col md:flex-row justify-between px-4 md:px-0">
      <div className="py-12 md:w-1/2 ">
        <h1 className="text-4xl font-semibold ">
          Everything is better <br /> with a{" "}
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Welcome to Pizza Now, your ultimate destination for delightful pizza
          experiences delivered right to your doorstep. Indulge in a culinary
          journey where every slice tells a story of quality ingredients,
          artisanal craftsmanship, and unmatched flavors
        </p>

        <div className="flex gap-4">
          <button className="bg-primary text-white uppercase flex items-center justify-center gap-2 px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-primary">
            Order Now
            <RightArrow className="w-4 h-4" />
          </button>

          <button className="border border-gray-300 text-gray-600 flex justify-center  items-center gap-2 px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-primary">
            Learn More
            <RightArrow className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <div style={{ display: "block" }}>
          <Image src={"/pizza.png"} width={350} height={350} alt="pizza" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
