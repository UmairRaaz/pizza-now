'use client'

import { SessionProvider } from "next-auth/react"
import { createContext, useState, useEffect } from "react"
import toast from "react-hot-toast";

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = Number(cartProduct.basePrice);
    if(cartProduct.size){
        price += cartProduct.size.price
    }
    if(cartProduct.extras.length > 0){
        for (const extra of cartProduct.extras){
            price += extra.price
        }
    }
    return price;
}
export function AppProvider({ children }) {
    const [cartProducts, setcartProducts] = useState([])

    const ls = typeof window !== "undefined" ? window.localStorage : null;
    useEffect(() => {
        if (ls && ls.getItem("cart")) {
            setcartProducts(JSON.parse(ls.getItem("cart")))
        }
    }, [])

    const clearCart = () => {
        setcartProducts([])
        saveCartProductsToLocalStorage([])
    }

    const removeCartProduct = (indexToRemove) => {
        setcartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((val, index) => index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            return newCartProducts;
        })
        toast.success("Product Removed")
    }

    const saveCartProductsToLocalStorage = (cartProducts) => {
        if (ls) {
            ls.setItem("cart", JSON.stringify(cartProducts))
        }
    }

    const addToCart = (product, size = null, extras = []) => {
        setcartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras }
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts;
        })
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts, setcartProducts, addToCart, clearCart, removeCartProduct
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
