import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let { updateCartItems, getCartItems, deleteCartItems, setNumOfCartItems } =
    useContext(CartContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // keeps the page and the navbar badge in sync with the API response
  function applyCartResponse(data) {
    if (data?.status === "success") {
      setCart(data);
      setNumOfCartItems(data.numOfCartItems);
      return true;
    }
    toast.error(data?.message || "Something went wrong");
    return false;
  }

  useEffect(() => {
    async function getItems() {
      const { data } = await getCartItems();
      // the API answers with an error when the user has no cart yet
      if (data?.status === "success") setCart(data);
      setLoading(false);
    }
    getItems();
  }, [getCartItems]);

  async function deleteItem(id) {
    setLoading(true);
    const { data } = await deleteCartItems(id);
    if (applyCartResponse(data)) {
      toast.success("Product deleted successfully");
    }
    setLoading(false);
  }

  async function updateCart(id, count) {
    if (count < 1) return deleteItem(id);
    const { data } = await updateCartItems(id, count);
    applyCartResponse(data);
  }

  const products = cart?.data?.products ?? [];

  return (
    <>
      <div className="bg-primary-light p-2 mt-5">
        {loading ? (
          <div className="loadeng nul">
            <ClockLoader color="#36d7b7" />
          </div>
        ) : products.length ? (
          <>
            <p className="text-primary">numOfCartItems : {cart.numOfCartItems}</p>
            <p className="text-primary">
              totalCartPrice : {cart.data.totalCartPrice} EGP
            </p>

            {products.map((product) => (
              <div
                key={product.product._id}
                className="row align-items-center p-2 m-0 border-bottom"
              >
                <div className="col-md-1">
                  <div className="img">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt={product.product.title}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="item">
                    <h3>
                      {product.product.title.split(" ").slice(0, 4).join(" ")}
                    </h3>
                    <p className="text-primary fw-bold">
                      price : {product.price} EGP
                    </p>
                    <button
                      onClick={() => deleteItem(product.product._id)}
                      className="btn"
                    >
                      <i className="bi bi-trash-fill text-danger"></i>Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-1 ">
                  <div className="count d-flex align-items-center ">
                    <button
                      onClick={() =>
                        updateCart(product.product._id, product.count + 1)
                      }
                      className="btn brdr p-1"
                    >
                      +
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updateCart(product.product._id, product.count - 1)
                      }
                      className="btn brdr p-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to={`/shippingaddress/${cart.data._id}`}
              className="btn bg-primary text-light m-3"
            >
              online Payment
            </Link>
          </>
        ) : (
          <h2>Cart is empty...</h2>
        )}
      </div>
    </>
  );
}
