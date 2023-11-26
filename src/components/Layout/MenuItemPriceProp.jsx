import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
const MenuItemPriceProp = ({ addLabelSize, name, prop, setProps }) => {
  const [isOpen, setisOpen] = useState(false);
  const addProp = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  let editProp = (e, index, prop) => {
    const newValues = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = {
        ...newSizes[index],
        [prop]: newValues,
      };
      return newSizes;
    });
  };

  let removeProp = (indextoRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indextoRemove));
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        className="inline-flex p-1 items-center justify-start gap-1 border-0"
        onClick={() => setisOpen(prev => !prev)}
        type="button"
      >
        {isOpen && <IoIosArrowUp />}
        {!isOpen && <IoIosArrowDown />}

        <span>{name}</span>
        <span>{`(${prop?.length})`}</span>
      </button>

      <div className={isOpen ? "block" : "hidden"}>
        {prop?.length > 0 &&
          prop.map((sizes, index) => (
            <div key={sizes.id} className="flex gap-2  items-center">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size Name"
                  value={sizes.name}
                  onChange={(e) => editProp(e, index, "name")}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="0"
                  value={sizes.price}
                  onChange={(e) => editProp(e, index, "price")}
                />
              </div>
              <button
                type="button"
                className="bg-white p-1 cursor-pointer text-xl rounded-lg mt-5 max-w-[25px] text-center"
                onClick={() => removeProp(index)}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white flex gap-2 text-center justify-center items-center"
        >
          <span>{addLabelSize}</span>
          <FaPlusCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceProp;
