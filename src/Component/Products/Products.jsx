// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { decrease, increase , increaseByAmount} from '../../Redux/CounterSlide'

// export default function Products() {
//   let {count}=useSelector(({counter})=>counter)
//   let dispatch=useDispatch()
//   return <>

//   <h2 className='pt-5'>Products{count}</h2>
//     <button onClick={()=>dispatch(increase())} className='btn btn-info '>increase</button>
//     <button onClick={()=>dispatch(decrease())} className='btn btn-info mx-3'>decrease</button>
//     <button onClick={()=>dispatch(increaseByAmount(100))} className='btn btn-info mx-3'>increaseByAmount</button>

//   </>

// }

// export default function Products() {
//   async function getAPI(result) {

//     let getAPI = await fetch(
//       `https://www.themealdb.com/api/json/v1/1/search.php?f=n`
//     );

//   }
//   getAPI();

//   ;

//   return<>
//       <div>Products</div>

//   </>

// }
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { CartContext } from "../Context/CartContext";
import products from "../Products/Products";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isError, isFetching, refetch } = useQuery(
    "featuredProducts",
    getProducts,
    // {
    //   refetchInterval: 10000,
    // }
  );

  let { addToCart } = useContext(CartContext);

  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      toast.success("تم بالفعل", {
        icon: "👏",
        duration: 6000,
      });
    }
  }

  function getmeals() {
    console.log(data?.data?.data);
    const allData = data?.data?.data;
    console.log("🚀 ~ getmeals ~ allData:", allData);
    allData && setProducts(allData);

    // function showData(list) {
    //   let eatings = "";

    //   for (let index = 0; index < list?.length; index++) {
    //     const element = list[index];

    //     let mainData = `
    //    <div className="row">
    //    <div className="col-md-4">
    //    <img class="w-100" src="${element.imageCover}" alt=${element.name} srcset="">
    //    </div>
    //    </div>
    //   `;

    //     eatings = eatings + mainData;
    //   }

    //   setProducts(eatings);

    //   console.log("halo");
    // }

    // showData(allData);
  }

  let searchForProduct = (e) => {
    const value = e.target.value;
    // function showFilteredData(list) {
    //   let eatings = "";

    //   for (let index = 0; index < list?.length; index++) {
    //     const element = list[index];

    //     let mainData = `
    //    <div className="row">
    //    <div className="col-md-4">
    //    <img class="w-100" src="${element.imageCover}" alt=${element.name} srcset="">
    //    </div>
    //    </div>
    //   `;

    //     eatings = eatings + mainData;
    //   }

    //   console.log("halo");
    // }

    const allData = data?.data?.data;
    const filteredData = allData?.filter((p) => p.title.includes(value));
    setProducts(filteredData)
    // function showProducts() {
    //   console.log("🚀 ~ showProducts ~ filteredData:", filteredData);

    //   filteredData && showFilteredData(filteredData);
    // }
    // showProducts();
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
          {products?.map((product) => (
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
                <i className="bi bi-heart position-absolute top-0 end-0 m-3 text-danger "></i>
                <button
                  onClick={() => postToCart(product.id)}
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
