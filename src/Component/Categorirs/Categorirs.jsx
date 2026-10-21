import React from "react";
import { useQuery } from "react-query";
import { ClockLoader } from "react-spinners";
import { api } from "../../Api/api";

function getCategories() {
  return api.get(`/categories`);
}

export default function Categorirs() {
  // same query key as the home slider, so the data is shared from cache
  let { data, isLoading, isError } = useQuery("Categories", getCategories);

  if (isLoading) {
    return (
      <div className="row justify-content-center align-items-center vh-100">
        <ClockLoader color="black" />
      </div>
    );
  }

  if (isError) {
    return <h2 className="pt-5">Couldn't load categories, please try again.</h2>;
  }

  return (
    <>
      <div className="row  ">
        {data?.data.data.map((category) => (
          <div key={category._id} className=" col-md-4 mt-5  mata">
            <div className="img p-4 ">
              <img src={category?.image} height={300} className="w-100" alt={category.name} />
              <h4 className="titl  ">{category.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
