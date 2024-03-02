import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/brandsSlice'
import { ClockLoader } from 'react-spinners'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Brands() {
  let {brands,isLoading}=useSelector(({brand})=>brand)
  let dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getBrands())
  },[])
  // let {getBrands} = useContext(CartContext)
  async function postToCart(id) {

    let {data} = await getBrands(id);
   if (data.status=='success') {
    toast.success('تم بالفعل',{
      icon: '👏',
      duration:6000
     
    })
   }
  }
  return <>
   
    <div>Brands</div>
   
    {isLoading ? 
          <div className="loadeng nul">
            <ClockLoader color="#36d7b7" />
          </div>: <div className='row py-2 brands'>
            {brands.map(brand=>
               <div key={brand._id} className="col-md-3">
               <div className="product p-2">
                 <img src={brand.image} className='w-100' alt={brand.name}/>
                 <p>{brand.name}</p>
               </div>
             </div>
              )}
           
            </div>}
          

    </>
    
 
}
