

import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

import MainSlider from '../MainSlider/MainSlider'

import { Helmet } from 'react-helmet'
import CategorirsMoving from '../CategorirsMoving/CategorirsMoving'

export default function Home() {
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh cart</title>
                
            </Helmet>
 
  <MainSlider/>
  <CategorirsMoving/>
  <FeaturedProducts/>
 
  </>
}

