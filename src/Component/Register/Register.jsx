import "./Register.module.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  let navigate = useNavigate()

  async function registerSubmit(values) {
    setLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then(res => {
      setApiError(false)

    })
    .catch((err) => {
        console.log("🚀 ~ loginSubmit ~ err:", err)
        setApiError(err.response.data.message)
      })
      .finally((res) => {
        setLoading(false)
       
        navigate('/')
      })


    if (data.message =='success') {
      setLoading(false)
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min length is 3")
      .max(10, "max length is 10"),
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "invalid password ex(Ahmed123)"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and rePassword dont match"),
    phone: Yup.string()
      .required(" phone is required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyptain number"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });
  return  <>
      <div className="w-75 mx-outo py-4">
        <h2>Register Naw</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
          <label htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}

          <label htmlFor="rePassword"> rePassword :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="  phone"> phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
          ) : null}

{loading ? <button  type="button" className="btn bg-dark text-light " > <ClockLoader color="#36d7b7" /> </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-dark text-light" >
             login
            </button>
          }
          <Link className="ps-3 "to={'/login'}>Login Now</Link>
        </form>
      </div>
    </>
 
}
