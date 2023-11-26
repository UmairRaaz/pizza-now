import React from "react";
import { useEffect, useState } from "react";
import MenuItemFormProp from '../../components/Layout/MenuItemPriceProp'
const MenuItemForm = ({ onSubmit, menuItem }) => {
  const apiURl = process.env.API_URL
  const [name, setname] = useState(menuItem?.name || "");
  const [description, setdescription] = useState(menuItem?.description || "");
  const [basePrice, setbasePrice] = useState(menuItem?.basePrice || "");
  const [category, setcategory] = useState(menuItem?.category || "")
  const [sizes, setsizes] = useState(menuItem?.sizes || [])
  const [extraIngredientPrice, setextraIngredientPrice] = useState(menuItem?.extraIngredientPrice ||[])
  
  const [categories, setcategories] = useState([])
  console.log(category)
  useEffect(()=>{
    fetch(`${apiURl}/api/categories`).then(res => res.json().then(categories => setcategories(categories)))
  }, [])
  return (
    <div>
      <form
        className="mt-8 max-w-sm mx-auto"
        onSubmit={(e) => {
          console.log(category)
          onSubmit(e, { name, description, basePrice, sizes, extraIngredientPrice, category });
        }}
      >
        <div className="flex items-start gap-2">
          <div className="grow">
            <label>Menu Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
            <label>Categories</label>
            <select value={category} onChange={ev => setcategory(ev.target.value)}>
              {categories?.length > 0 && categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setbasePrice(e.target.value)}
            />
            <MenuItemFormProp name={"Sizes"} addLabelSize={"Add Item Size"} prop={sizes} setProps={setsizes} />
            <MenuItemFormProp name={"Extra Ingredients"}
             addLabelSize={"Add Ingredients Prices"}
             prop={extraIngredientPrice} setProps={setextraIngredientPrice} />
            <button type="submit" className="text-center">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;
