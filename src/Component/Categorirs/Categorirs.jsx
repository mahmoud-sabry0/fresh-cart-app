import React from 'react'

import axios from "axios";

import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorirsSlider() {
 
 function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  
  let { data } = useQuery('Categories', getCategories);
  console.log(data?.data.data);
  return <>
       <div className="row  ">
      
          {data?.data.data.map(category =>
         
          
          <div key={category._id} className=" col-md-4 mt-5  mata">
              <div className="img p-4 ">
                <img src={category?.image} height={300} className="w-100" alt={category.name}/>
                <h4 className='titl  '>{category.name}</h4>
              </div>
            </div>
           
          )}
         </div>
      
    </>
  
}

