import "./Register.module.css";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClockLoader } from "react-spinners";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "../../Api/api";
import { UserContext } from "../Context/UserContext";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "password", label: "password", type: "password", autoComplete: "new-password" },
  { name: "rePassword", label: "rePassword", type: "password", autoComplete: "new-password" },
  { name: "phone", label: "phone", type: "tel", autoComplete: "tel" },
];

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);

  async function registerSubmit(values) {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await api.post("/auth/signup", values);
      toast.success("Account created successfully");
      // signup returns a token, so log the user straight in
      if (data?.token) {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  // mirrors the API's own rules, so valid input is never rejected client-side
  let validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Name is required")
      .min(3, "min length is 3")
      .max(50, "max length is 50"),
    email: Yup.string().trim().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .min(6, "password must be at least 6 characters"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and rePassword dont match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "we need egyptain number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) =>
      registerSubmit({ ...values, name: values.name.trim(), email: values.email.trim() }),
  });

  if (userToken) return <Navigate to={"/"} replace />;

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

          {fields.map(({ name, label, type, autoComplete }) => (
            <div key={name}>
              <label htmlFor={name}>{label} :</label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
                type={type}
                id={name}
                name={name}
                autoComplete={autoComplete}
                className="form-control mb-3"
              />
              {formik.errors[name] && formik.touched[name] ? (
                <div className="alert alert-danger py-2">{formik.errors[name]}</div>
              ) : null}
            </div>
          ))}

          <button
            disabled={loading}
            type="submit"
            className="btn bg-dark text-light"
          >
            {loading ? <ClockLoader color="#36d7b7" size={20} /> : "Register"}
          </button>
          <Link className="ms-3 link btn bg-dark text-light" to={"/login"}>
            Login Now
          </Link>
        </form>
      </div>
    </>
  );
}
