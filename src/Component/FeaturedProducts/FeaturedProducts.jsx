import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./FeaturedProducts.module.css";

import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { CartContext } from "../Context/CartContext";
import products from "../Products/Products";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // async function getProducts() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setProducts(data.data);
  //   setLoading(false);
  // }
  // useEffect(() => {
  //   getProducts();
  // }, []);
 function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const {setNumOfCartItems}=useContext(CartContext)
  let { data, isLoading,  isFetching,refetch } = useQuery(
    "featuredProducts",
    getProducts,
    // {
    //   refetchInterval: 1000000,
    // }
    );
  let {addToCart} = useContext(CartContext)
  async function postToCart(id) {

    let {data} = await addToCart(id);
   if (data.status=='success') {
    toast.success('تم بالفعل',{
      icon: '👏',
      duration:6000
     
     
    })
    setNumOfCartItems(data.numOfCartItems);
   }
   
  }
///////////////////
const [, setProducts] = useState([]);

function getmeals() {
  console.log(data?.data?.data);
  const allData = data?.data?.data;
  console.log("🚀 ~ getmeals ~ allData:", allData);
  allData && setProducts(allData);

  
}



let searchForProduct = (e) => {
  const value = e.target.value;


  const allData = data?.data?.data;
  const filteredData = allData?.filter((p) => p.title.includes(value));
  setProducts(filteredData)
  
};

useEffect(() => {
  getmeals();
}, [isFetching]);


  

  return (
    <>
      {isLoading ? (
        <div className="row justify-content-center align-items-center vh-100">
          <ClockLoader color="black " />
        </div>
      ) : (
        <div className="row gy-4  teshart">
           <input
            onChange={searchForProduct}
            className="form-control  "
            type="text"
            placeholder="Search By Name"
            id="seach-by-name"
          />
          {data?.data.data.map((product) => (
            <div key={product.id} className="col-lg-2 ">
              <div className="product p-2 position-relative ">
                <Link className="link" to={`/productinfo/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-100 img"
                    alt={product.title}
                  />
                  <span className="font-sm text-primary">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                    <span className="font-sm">{product.price} EGP</span>
                    <span className="font-sm">
                      <i className="bi bi-star-fill"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <i class="bi bi-heart position-absolute top-0 end-0 m-3 text-danger "></i>
                <button
                  onClick={() =>postToCart(product.id)}
                  className="btn bg-primary text-light w-100 btn-sm"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
