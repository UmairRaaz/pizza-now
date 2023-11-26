"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/Layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import AddressInput from "../../components/Layout/AddressInput";
import { useProfile } from "../../components/UseProfile";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter()
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setaddress] = useState({});
  let handleAdressChange = (propName, val) => {
    setaddress((prevAddress) => ({ ...prevAddress, [propName]: val }));
  };
  const { data: profileData } = useProfile();
  console.log(profileData);
  useEffect(() => {
    if (profileData?.city) {
      const { city, country, phone, postalCode, streetAddress } = profileData;
      const addressFromProfile = {
        city,
        country,
        phone,
        postalCode,
        streetAddress,
      };
      setaddress(addressFromProfile);
    }
  }, [profileData]);
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainhead={"Cart"} />
      </div>
      <div className="grid mt-8 gap-8 grid-cols-1 md:grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex gap-4 mb-2 border-b py-4 items-center"
              >
                <div className="w-24">
                  <Image
                    src={"/pizza.png"}
                    alt="pizza"
                    width={140}
                    height={140}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size : <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-700">
                      Extras:
                      {product.extras.map((extra) => (
                        <div key={product._id}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-lg">
                  ${cartProductPrice(product)}
                </div>
                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => removeCartProduct(index)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          <div>
            <div className="py-4 text-right pr-16">
              <span className="text-gray-500">Subtotal</span> : &nbsp;
              <span className="text-lg font-semibold">${total}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          {!profileData && "Please Signup before ordering"}
          <h2>Checkout</h2>
          <form>
            <AddressInput
              addressProp={address}
              setAddressProp={handleAdressChange}
            />
            <button type="submit" onClick={()=>router.push('/thankyou', )}>Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
