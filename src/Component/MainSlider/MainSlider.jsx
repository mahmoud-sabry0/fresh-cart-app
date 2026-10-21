import React from 'react'
import im from '../../imges/mahmou1 (2).jpg'
import img from '../../imges/mahmou1 (5).jpg'
import im1 from '../../imges/mahmou1 (3).jpg'
import img4 from '../../imges/mahmou1 (4).jpg'
import Slider from 'react-slick';

const settings = {
  dots: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 5000,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function MainSlider() {
  return <>
    <div className="row my-3 gx-0 Slider">
      <div className="col-md-8">
        <Slider {...settings}>
          <img src={im} className='main-slide' alt='' />
          <img src={img} className='main-slide' alt='' />
        </Slider>
      </div>
      {/* the side images would just push the products further down on phones */}
      <div className="col-md-4 d-none d-md-block">
        <div className="images">
          <img src={im1} className='side-slide' alt='' />
          <img src={img4} className='side-slide' alt='' />
        </div>
      </div>
    </div>
  </>
}
