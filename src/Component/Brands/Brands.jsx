import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../Redux/brandsSlice";
import { ClockLoader } from "react-spinners";

export default function Brands() {
  let { brands, isLoading, error } = useSelector(({ brand }) => brand);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <>
      <h2 className="pt-5">Brands</h2>

      {isLoading ? (
        <div className="loadeng nul">
          <ClockLoader color="#36d7b7" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row g-3 py-2 brands">
          {brands.map((brand) => (
            <div key={brand._id} className="col-6 col-md-3">
              <div className="product p-2">
                <img src={brand.image} className="w-100" alt={brand.name} />
                <p>{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
