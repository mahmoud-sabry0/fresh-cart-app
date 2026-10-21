import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, safeRequest } from "../../Api/api";
import { UserContext } from "./UserContext";

export let CartContext = createContext();

// defined outside the provider so their identity is stable across renders
function checkOutSession(cartId, shippingAddress) {
  // the API redirects to `${url}/allorders` after a successful payment
  const returnUrl = window.location.origin + process.env.PUBLIC_URL;
  return safeRequest(
    api.post(
      `/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      { shippingAddress }
    )
  );
}

function addToCart(productId) {
  return safeRequest(api.post(`/cart`, { productId }));
}

function getCartItems() {
  return safeRequest(api.get(`/cart`));
}

function deleteCartItems(productId) {
  return safeRequest(api.delete(`/cart/${productId}`));
}

function updateCartItems(productId, count) {
  return safeRequest(api.put(`/cart/${productId}`, { count }));
}

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const { userToken } = useContext(UserContext);

  const refreshCartCount = useCallback(async () => {
    const { data } = await getCartItems();
    setNumOfCartItems(data?.status === "success" ? data.numOfCartItems : 0);
  }, []);

  useEffect(() => {
    if (userToken) refreshCartCount();
    else setNumOfCartItems(0);
  }, [userToken, refreshCartCount]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItems,
        deleteCartItems,
        updateCartItems,
        checkOutSession,
        numOfCartItems,
        setNumOfCartItems,
        refreshCartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
