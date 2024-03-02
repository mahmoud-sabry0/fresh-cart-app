import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ClockLoader } from "react-spinners";


export default function ProductInfo() {
var settings ={
  dots:false,
  autoplay:true,
  infinite:true,
  autoplaySpeed:2000,
  speed:500 ,
  slidesToShow:1 ,
  slidesToScroll:1,
  arrows:false,
};



  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  async function getProductInfo(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setInfo(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductInfo(id);
  }, []);
  return (
    <>
     
      {loading ? (

        <div className="row justify-content-center align-items-center vh-100">
          <ClockLoader color="black " />{" "}
        </div>
      ) : (
        <> <Helmet>
        <meta charSet="utf-8" />
        <title>info.title</title>
        
    </Helmet>
        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {info.images.map(image => <img src={image} key={info.id} className="w-100" alt={info.title}/>)}
            </Slider>
          </div>
          <div className="col-md-8">
            <div className="details">
            
                  <h3 className="h5">
                    {info.title}
                  </h3>
                  <p className="py-3">{info.description}</p>
                  <span className="font-sm text-primary">
                    {info.category.name}
                  </span>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                
                  

                  <span className="font-sm">{info.price} EGP</span>
                  <span className="font-sm">
                    <i className="bi bi-star rating-color  text-danger ms-5"></i>
                    {info.ratingsAverage}
                  </span>
                  </div>
                  <button className="btn bg-primary text-light w-100 btn-sm">
                    Add To Cart
                  </button>

            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
