// import { useFormik } from 'formik'
// import React, { useContext } from 'react'
// import { CartContext } from '../Context/CartContext'
// import { useParams } from 'react-router-dom'

// export default function ShippingAddress() {
// let { checkOutSession}=useContext(CartContext)
// let {cartId}=useParams()
// console.log(cartId)
// async function checkOut(values){
//   let {data}=await checkOutSession(cartId,values)
//   console.log(data)
// }
// let formik =useFormik({
//   initialValues:{
//     details:'',
//     phone:'',
//     city:''
//   },onSubmit: checkOut
// })

//   return <>
//    <h1>ShippingAddress</h1>
//  <div className="w-75 mx-aut">
//   <form onSubmit={formik.handleSubmit}>
//     <label htmlFor='details'>details</label>
//     <input onChange={formik.handleChange} type='text' id='details' name='details' className='form-control mb-3'></input>
//     <label htmlFor='phone'>details</label>
//     <input onChange={formik.handleChange} type='tel' id='phone' name='phone' className='form-control mb-3'></input>
//     <label htmlFor='city'>details</label>
//     <input onChange={formik.handleChange} type='text' id='city' name='city' className='form-control mb-3'></input>
//     <button className='btn bg-primary text-light ' type='submit'>Checkout</button>
//   </form>
//  </div>
//   </>
   
// }
