import React, { useEffect, useState } from 'react'
import { GetSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreator'
import { GetProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


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

export default function CategorySlider() {
    let Dispatch = useDispatch()
    let SubCategoryStateData = db['sub-category']
    useEffect(() => { Dispatch(GetSubCategory()) }, [SubCategoryStateData.length])
    let ProductStateData = db.products
    useEffect(() => { Dispatch(GetProduct()) }, [ProductStateData.length])

    let [slidePerView, setSlidePerView] = useState(getSlideView())
    useEffect(() => {
        const handleResize = () => { setSlidePerView(getSlideView()) }
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])
    return (
        <>

            {/*start category slider*/}
            <section className="category-slider section-padding bg-section-2">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">Top Categories</h3>
                        <p className="mb-0 text-capitalize">
                            Select your favorite categories and purchase
                        </p>
                    </div>
                    <div className="category-box">
                        <Swiper
                            slidesPerView={slidePerView}
                            spaceBetween={30}
                            freeMode={true}
                            loop={true}
                            autoplay={{ delay: 2500, disableOnInteraction: false, }}
                            modules={[FreeMode, Autoplay]}
                            className="mySwiper">
                            {SubCategoryStateData.filter(x => x.active).map(item => {
                                const productCount = ProductStateData.filter(p => p.active && p.SubCategory === item.name).length
                                return <SwiperSlide key={item.id}>
                                    <Link to={`/shop/${item.name}`}>
                                        <div className="card" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="overflow-hidden">
                                                    <img
                                                        src={`${item.pic}`}
                                                        className="card-img-top rounded-0"
                                                        alt="..."
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h5 className="mb-1 category-name mt-3 fw-bold">{item.name}</h5>
                                                    <h6 className="mb-0 product-number fw-bold">

                                                        {productCount} Products</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            })}

                        </Swiper>
                    </div>
                </div>
            </section>
            {/*end category slider*/}
        </>


    )
}
