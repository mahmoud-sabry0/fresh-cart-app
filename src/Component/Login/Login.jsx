
import  './Login.module.css';



import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  console.log("🚀 ~ Login ~ apiError:", apiError)
  let navigate = useNavigate()

  async function loginSubmit(values) {
    setLoading(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
    .then(res => {
      setApiError(false)

      console.log("🚀 ~ loginSubmit ~ res:", res)
    })
    .catch((err) => {
       
        setApiError(err.response.data.message)
      })
      .finally((res) => {
        setLoading(false)

      })

    if (data.message =='success') {
     
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      navigate('/')
    }
  }

  let validationSchema = Yup.object({
   
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "invalid password ex(Ahmed123)"),
   
  })

  let formik = useFormik({
    initialValues: {
    
      email: '',
      password: '',
     
    },
    validationSchema,
    onSubmit: loginSubmit,
  });
  return  <>
      <div className="w-75 mx-outo py-4">
        <h2>login Naw</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
         
       

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

         

        
        
          {loading ? <button  type="button" className="btn bg-dark text-light " > <ClockLoader color="#36d7b7" /> </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-dark text-light" >
             login
            </button>
          }
          
          <Link className="ps-3 "to={'/register'}>Register Now</Link>
        </form>
      </div>
    </>
    
  
}
