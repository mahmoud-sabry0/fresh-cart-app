import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { ClockLoader } from "react-spinners";
import toast from "react-hot-toast";
import { api } from "../../Api/api";
import { CartContext } from "../Context/CartContext";

const settings = {
  dots: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function ProductInfo() {
  let { id } = useParams();
  const { addToCart, setNumOfCartItems } = useContext(CartContext);

  const { data, isLoading, isError } = useQuery(["productInfo", id], () =>
    api.get(`/products/${id}`)
  );
  const info = data?.data?.data;

  async function postToCart() {
    const { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success("تم بالفعل", { icon: "👏", duration: 6000 });
      setNumOfCartItems(data.numOfCartItems);
    } else {
      toast.error(data?.message || "Couldn't add the product");
    }
  }

  if (isLoading) {
    return (
      <div className="row justify-content-center align-items-center vh-100">
        <ClockLoader color="black" />
      </div>
    );
  }

  if (isError || !info) {
    return <h2 className="pt-5">Product not found.</h2>;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{info.title}</title>
      </Helmet>
      <div className="row align-items-center pt-5">
        <div className="col-md-4">
          <Slider {...settings}>
            {info.images.map((image) => (
              <img src={image} key={image} className="w-100" alt={info.title} />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3 className="h5">{info.title}</h3>
            <p className="py-3">{info.description}</p>
            <span className="font-sm text-primary">{info.category?.name}</span>
            <div className="d-flex py-3 justify-content-between align-items-center">
              <span className="font-sm">{info.price} EGP</span>
              <span className="font-sm">
                <i className="bi bi-star rating-color  text-danger ms-5"></i>
                {info.ratingsAverage}
              </span>
            </div>
            <button
              onClick={postToCart}
              className="btn bg-primary text-light w-100 btn-sm"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
