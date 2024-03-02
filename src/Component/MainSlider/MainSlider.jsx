import React from 'react'
import im from '../../imges/mahmou1 (2).jpg'
import img from '../../imges/mahmou1 (5).jpg'
import im1 from '../../imges/mahmou1 (3).jpg'
import img4 from '../../imges/mahmou1 (4).jpg'
import Slider from 'react-slick';
export default function MainSlider() {
    var settings ={
        dots:false,
        autoplay:true,
        infinite:true,
        autoplaySpeed:5000,
        speed:200 ,
        slidesToShow:1 ,
        slidesToScroll:1,
        arrows:false,
      };
  return<>
  <div className="row my-3 gx-0 Slider">
    <div className="col-md-8 ">
        <Slider {...settings}>
            <img src={im} height={400} className='w-50  ' alt=''/>
            <img src={img}  height={400}  className='w-50  ' alt=''/>
            
        </Slider>
    </div>
    <div className="col-md-4 ">
        <div className="images">
            
        <img src={im1} height={200} className='w-100' alt=''/>
            <img src={img4}  height={200}  className='w-100 ' alt=''/>
            
        </div>
    </div>
  </div>
  </>
}
