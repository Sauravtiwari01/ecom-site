import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import required modules
import { FreeMode, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';
function getSlideView() {
  if (window.innerWidth < 480)
    return 2
  else if (window.innerWidth < 768)
    return 3
  else if (window.innerWidth < 1279)
    return 4
  else
    return 5
}
export default function ProductSlider({title, data }) {
  let [slidePerView, setSlidePerView] = useState(getSlideView())
  useEffect(() => {
    const handleResize = () => { setSlidePerView(getSlideView()) }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])


  return (
    <>
      {/*start Featured Products slider*/}
      <section className="section-padding">
        <div className="container">
          <div className="text-center pb-3">
            <h3 className="mb-0 h3 fw-bold">{title}</h3>
            <p className="mb-0 text-capitalize">The purpose of lorem ipsum</p>
          </div><div className="product-thumb">
            <Swiper
              slidesPerView={slidePerView}
              spaceBetween={30}
              freeMode={true}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false, }}
              modules={[FreeMode, Autoplay]}
              className="mySwiper">
              {data.map(item => {
                return <SwiperSlide key={item.id}>
                  <ProductCard item={item} />
                </SwiperSlide>
              })}

            </Swiper>
          </div>
        </div>
      </section>
      {/*end Featured Products slider*/}

    </>
  )
}
