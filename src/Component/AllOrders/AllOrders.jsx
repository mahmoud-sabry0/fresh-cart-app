import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { ClockLoader } from "react-spinners";
import { api, getUserIdFromToken } from "../../Api/api";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function AllOrders() {
  const { userToken } = useContext(UserContext);
  const { refreshCartCount } = useContext(CartContext);
  const userId = getUserIdFromToken(userToken);

  // the payment provider redirects here after checkout, which empties the cart
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  const { data, isLoading, isError } = useQuery(
    ["orders", userId],
    () => api.get(`/orders/user/${userId}`),
    { enabled: Boolean(userId) }
  );

  if (isLoading) {
    return (
      <div className="row justify-content-center align-items-center vh-100">
        <ClockLoader color="black" />
      </div>
    );
  }

  if (isError || !userId) {
    return <h2 className="pt-5">Couldn't load your orders, please try again.</h2>;
  }

  // newest first
  const orders = [...(data?.data ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (!orders.length) {
    return <h2 className="pt-5">You have no orders yet.</h2>;
  }

  return (
    <div className="pt-5">
      <h2 className="mb-4">All Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border rounded p-3 mb-4">
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-3">
            <span className="fw-bold">Order #{order.id}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span className={order.isPaid ? "text-success" : "text-danger"}>
              {order.isPaid ? "Paid" : "Not paid"} ({order.paymentMethodType})
            </span>
            <span className={order.isDelivered ? "text-success" : "text-warning"}>
              {order.isDelivered ? "Delivered" : "In delivery"}
            </span>
            <span className="text-primary fw-bold">
              {order.totalOrderPrice} EGP
            </span>
          </div>
          <div className="row g-3">
            {order.cartItems.map((item) => (
              <div key={item._id} className="col-6 col-md-2">
                <img
                  src={item.product?.imageCover}
                  className="w-100"
                  alt={item.product?.title}
                />
                <p className="small mb-0">
                  {item.product?.title?.split(" ").slice(0, 3).join(" ")}
                </p>
                <p className="small text-primary mb-0">
                  {item.count} × {item.price} EGP
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
