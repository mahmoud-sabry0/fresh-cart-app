import React, { useContext, useState } from "react";
import "./FeaturedProducts.module.css";

import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { api } from "../../Api/api";

function getProducts() {
  return api.get(`/products`);
}

function showImage(e) {
  e.currentTarget.classList.add("loaded");
}

export default function FeaturedProducts() {
  const { addToCart, setNumOfCartItems } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useQuery("featuredProducts", getProducts);

  async function postToCart(id) {
    const { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success("تم بالفعل", {
        icon: "👏",
        duration: 6000,
      });
      setNumOfCartItems(data.numOfCartItems);
    } else {
      toast.error(data?.message || "Couldn't add the product");
    }
  }

  const term = search.trim().toLowerCase();
  const products = (data?.data?.data ?? []).filter((p) =>
    p.title.toLowerCase().includes(term)
  );

  if (isLoading) {
    return (
      <div className="row justify-content-center align-items-center vh-100">
        <ClockLoader color="black" />
      </div>
    );
  }

  if (isError) {
    return <h2 className="pt-5">Couldn't load products, please try again.</h2>;
  }

  return (
    <div className="py-4">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-4"
        type="search"
        placeholder="Search By Name"
        id="seach-by-name"
      />
      {products.length === 0 && <p>No products match "{search}".</p>}

      {/* 2 per row on phones, up to 6 on wide screens */}
      <div className="row g-3">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
            <div className="product h-100 p-2 d-flex flex-column position-relative">
              <Link
                className="link d-flex flex-column flex-grow-1"
                to={`/productinfo/${product.id}`}
              >
                <div className="product-img-wrap">
                  <img
                    src={product.imageCover}
                    className="product-img"
                    alt={product.title}
                    loading="lazy"
                    onLoad={showImage}
                    onError={showImage}
                  />
                </div>
                <span className="product-category">{product.category?.name}</span>
                <h3 className="product-title" title={product.title}>
                  {product.title}
                </h3>
                <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                  <span className="product-price">{product.price} EGP</span>
                  <span className="product-rating">
                    <i className="bi bi-star-fill"></i> {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <i className="bi bi-heart product-wishlist text-danger"></i>
              <button
                onClick={() => postToCart(product.id)}
                className="btn bg-primary text-light w-100 btn-sm mt-2 add-to-cart"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
