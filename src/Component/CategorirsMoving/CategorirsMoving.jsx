import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorirsSlider() {
  var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
  };
 function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  
  let { data } = useQuery('Categories', getCategories);
  console.log(data?.data.data);
  return <>
      <div className="row">
        <Slider {...settings}>
          {data?.data.data.map(category =><div key={category._id} className=" col-md-2">
              <div className="img ">
                <img src={category?.image} height={200} className="w-100" alt={category.name}/>
                <h4>{category.name}</h4>
              </div>
            </div>
          )}
        </Slider>
        
      </div>
    </>
  
}

