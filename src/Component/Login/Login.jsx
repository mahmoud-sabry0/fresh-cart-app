import "./Login.module.css";

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClockLoader } from "react-spinners";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { api, getErrorMessage } from "../../Api/api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setLoading(true);
    setApiError(null);
    try {
      const { data } = await api.post("/auth/signin", values);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // password format is enforced at registration only
  let validationSchema = Yup.object({
    email: Yup.string().trim().required("email is required").email("invalid email"),
    password: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => loginSubmit({ ...values, email: values.email.trim() }),
  });

  if (userToken) return <Navigate to={"/"} replace />;

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}

          {/* not disabled until "dirty": browser autofill doesn't fire onChange */}
          <button
            disabled={loading}
            type="submit"
            className="btn bg-dark text-light"
          >
            {loading ? <ClockLoader color="#36d7b7" size={20} /> : "login"}
          </button>

          <Link className="ms-3 btn bg-dark text-light link" to={"/register"}>
            Register Now
          </Link>
        </form>
      </div>
    </>
  );
}
