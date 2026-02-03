import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetBrand } from '../Redux/ActionCreators/BrandActionCreator'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import db from "../data/data.json"
// import required modules
import { FreeMode, Autoplay } from 'swiper/modules';
function getSlideView() {
  if (window.innerWidth < 480)
    return 2
  else if (window.innerWidth < 768)
    return 3
  else if (window.innerWidth < 1279)
    return 4
  else
    return 6
}
export default function BrandSlider() {
  let brandStateData = db.brands
  let Dispatch = useDispatch()
  useEffect(() => { Dispatch(GetBrand()) }, [brandStateData.length])

  let [slidePerView, setSlidePerView] = useState(getSlideView())
  useEffect(() => {
    const handleResize = () => { setSlidePerView(getSlideView()) }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <>
      <>
        {/*start Brands*/}
        <section className="section-padding">
          <div className="container">
            <div className="text-center pb-3">
              <h3 className="mb-0 h3 fw-bold">Shop By Brands</h3>
              <p className="mb-0 text-capitalize">
                Select your favorite brands and purchase
              </p>
            </div>
            <div className="brands">


              <Swiper
                slidesPerView={slidePerView}
                spaceBetween={30}
                freeMode={true}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false, }}
                modules={[FreeMode, Autoplay]}
                className="mySwiper">

                {brandStateData.filter(x => x.active).map(item => {
                  return <SwiperSlide key={item.id}> <div className="col">
                    <div className="p-4 border rounded brand-box d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                      <div className="d-flex align-items-center">
                        <a href="javascript:;">
                          <img style={{ maxHeight: '200px' }}
                            src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic}`}
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div></SwiperSlide>
                })}
              </Swiper>


              {/*end row*/}
            </div>
          </div>
        </section>
        {/*end Brands*/}
      </>

    </>
  )
}
