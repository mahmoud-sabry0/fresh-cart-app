import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ShippingAddress from "../ShippingAddress/ShippingAddress";

export default function Cart() {
  let { UpdataCartItems, getCartItems, deleteCartItems } =useContext(CartContext);



  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  async function getItems() {
    let { data } = await getCartItems();
    console.log(data);
    setCart(data);
    setLoading(false);
  }
 


  

  async function deleteIteme(id) {
    setLoading(true);
    let { data } = await deleteCartItems(id);
    console.log(data);
    setCart(data);
    if (data.status=='success') {
      toast.error('Product deleted Successfully')
    }
    setLoading(false);
  }
  async function updateCart(id , count) {
    if (count < 1) {
      let { data } = await deleteCartItems(id);
      setCart(data);
    } else {
      let { data } = await UpdataCartItems(id, count);
      setCart(data);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

 




  return (
    <>
      <div className="bg-primary-light p-2 mt-5">
        {loading ? 
          <div className="loadeng nul">
            <ClockLoader color="#36d7b7" />
          </div>
         : cart? <>
          
            <p className="text-primary">
              numOfCartItems :{cart?.numOfCartItems}
            </p>
            <p className="text-primary">
           
              totalCartPrice :{cart?.data?.totalCartPrice}EGP
            </p>
            
            {cart?.data.products.map((product,index) => (
              <div
                key={index}
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
                      price :{product.price}EGP{" "}
                    </p>
                    <button
                      onClick={() => deleteIteme(product?.product?._id)}
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
                        updateCart(product.product.id, product.count + 1)
                      }
                      className="btn brdr p-1"
                    >
                      +
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updateCart(product.product.id, product.count - 1)
                      }
                      className="btn brdr p-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link to={'/ShippingAddress'} className="btn bg-primary text-light m-3">online Payment</Link>
          </>:<h2>Cart is empty...........</h2> }
      </div>
    </>
  );
}
