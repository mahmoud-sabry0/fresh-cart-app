import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useParams } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function ShippingAddress() {
  let { checkOutSession } = useContext(CartContext);
  let { cartId } = useParams();
  const [loading, setLoading] = useState(false);

  async function checkOut(values) {
    setLoading(true);
    const { data } = await checkOutSession(cartId, values);
    if (data?.status === "success") {
      window.location.href = data.session.url;
      return;
    }
    toast.error(data?.message || "Checkout failed");
    setLoading(false);
  }

  let validationSchema = Yup.object({
    details: Yup.string().required("details is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyptain number"),
    city: Yup.string().required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: checkOut,
  });

  function fieldError(name) {
    return formik.errors[name] && formik.touched[name] ? (
      <div className="alert alert-danger py-2">{formik.errors[name]}</div>
    ) : null;
  }

  return (
    <>
      <div className="w-75 mx-auto pt-5">
        <h1>Shipping Address</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">details</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="text" id="details" name="details" className="form-control mb-3" />
          {fieldError("details")}
          <label htmlFor="phone">phone</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" id="phone" name="phone" className="form-control mb-3" />
          {fieldError("phone")}
          <label htmlFor="city">city</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="text" id="city" name="city" className="form-control mb-3" />
          {fieldError("city")}
          {loading ? (
            <button type="button" className="btn bg-primary text-light">
              <ClockLoader color="#fff" size={20} />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-primary text-light "
              type="submit"
            >
              Checkout
            </button>
          )}
        </form>
      </div>
    </>
  );
}
