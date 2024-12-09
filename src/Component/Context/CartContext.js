import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  let headers = { token: localStorage.getItem("userToken") };

  console.log("🚀 ~ CartContextProvider ~ headers:", headers);
  async function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}url=http://localhost:3000`,
        {
          shippingAddress,
        },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  async function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function getCartItems() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  async function deleteCartItems(productId, count) {
    if (count)
      return axios
        .delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          { headers }
        )
        .then((response) => response)
        .catch((err) => err);

    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }

  async function UpdataCartItems(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  async function gatUserCart() {
    let { data } = await getCartItems();
    console.log(data);
    setNumOfCartItems(data?.numOfCartItems || 0);
  }
  useEffect(() => {
    gatUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        deleteCartItems,
        UpdataCartItems,
        checkOutSession,
        numOfCartItems,
        setNumOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
