import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { api } from "../../Api/api";

const settings = {
  dots: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 5000,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 4 } },
    { breakpoint: 576, settings: { slidesToShow: 2 } },
  ],
};

function getCategories() {
  return api.get(`/categories`);
}

export default function CategorirsMoving() {
  let { data } = useQuery("Categories", getCategories);
  return (
    <div className="my-3">
      <Slider {...settings}>
        {data?.data.data.map((category) => (
          <div key={category._id} className="category-slide px-1">
            <img src={category?.image} alt={category.name} />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
