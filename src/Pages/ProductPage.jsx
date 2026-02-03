import React, { useRef, useEffect, useState, useMemo } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { GetProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { GetSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import ProductSlider from '../Components/ProductSlider'
import { CreateCart, GetCart, UpdateCart } from '../Redux/ActionCreators/CartActionCreator'
import { CreateWishlist, GetWishlist } from '../Redux/ActionCreators/WishlistActionCreator'

import toast, { Toaster } from 'react-hot-toast';
import { GetTestimonial } from '../Redux/ActionCreators/TestimonialActionCreator'
import { GetOrder } from '../Redux/ActionCreators/OrderActionCreator'

export default function ProductPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let [quantity, setQuantity] = useState(1)


  let ProductStateData = useSelector(state => state.ProductStateData)
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let cartStateData = useSelector(state => state.cartStateData)
  let wishlistStateData = useSelector(state => state.wishlistStateData)
  let testimonialStateData = useSelector(state => state.testimonialStateData)
  let orderStateData = useSelector((state) => state.orderStateData)
  let dispatch = useDispatch()
  let [data, setData] = useState([])
  let [relatedProducts, setRelatedProducts] = useState([])
  let [color, setColor] = useState("")
  let [size, setSize] = useState("")
  let { id } = useParams()
  let [errorMessage, setErrormessage] = useState({
    color: "Select Color",
    size: "Select Size"
  })
  let [show, setShow] = useState(false)


  let [ratingData, setRatingData] = useState([])
  let [rating, setRating] = useState(0)
  let [buyers, setBuyers] = useState(0)
  const fiveStar = ratingData.filter((x) => x.rating == 5).length
  const fourStar = ratingData.filter((x) => x.rating == 4).length
  const threeStar = ratingData.filter((x) => x.rating == 3).length
  const twoStar = ratingData.filter((x) => x.rating == 2).length
  const oneStar = ratingData.filter((x) => x.rating == 1).length

  function addToCart(e) {
    const colorError = color ? "" : "Select Color";
    const sizeError = size ? "" : "Select Size";

    if (colorError || sizeError) {
      setErrormessage({ color: colorError, size: sizeError });
      setShow(true);
      return;
    }

    let item = cartStateData.find(x => x.id === data.id && x.color === color && x.size === size)
    if (item) {
      setShow(false)
      dispatch(UpdateCart({
        ...item,
        quantity: item.quantity + quantity,

        userid: localStorage.getItem("userid")

      }))

    } else {
      setShow(false)
      dispatch(CreateCart({
        ...data,
        color: color,
        size: size,
        quantity: quantity,

        userid: localStorage.getItem("userid")
      }))

    }
    setColor("")
    setSize("")
    setQuantity(1)
    dispatch(GetCart())
  }
  const notify = (msg) => toast(msg);
  function addToWishlist() {
    let item = wishlistStateData.find(x => x.id === data.id)
    if (item) {
      notify("Product Already in Wishlist")
    }
    else {
      const colorError = color ? "" : "Select Color";
      const sizeError = size ? "" : "Select Size";

      if (colorError || sizeError) {
        setErrormessage({ color: colorError, size: sizeError });
        setShow(true);
        return;
      }
      setShow(false)
      dispatch(CreateWishlist({
        ...data,
        color: color,
        size: size,
      }
      ))
    }
    setColor("")
    setSize("")
    setQuantity(1)
  }
  useEffect(() => { dispatch(GetProduct()) }, [])
  useEffect(() => { dispatch(GetWishlist()) }, [])
  useEffect(() => {

    if (ProductStateData.length) {
      let item = ProductStateData.find(x => x.id === id)
      setData(item)
      setRelatedProducts(ProductStateData.filter(x => x.category === item.category && x.SubCategory === item.SubCategory && x.id !== item.id))
    }
  }, [ProductStateData, id])
  useEffect(() => {
    dispatch(GetCart())
  }, [])
  useEffect(() => {
    dispatch(GetTestimonial())
  }, [])

  useEffect(() => {
    if (testimonialStateData.length) {
      let item = testimonialStateData.filter((x) => x.productID === id && x.rating > 0)
      setRatingData(item)
    }
  }, [testimonialStateData])
  useEffect(() => {
    if (ratingData.length > 0) {
      const total = ratingData.reduce((sum, item) => sum + Number(item.rating), 0)
      const avg = total / ratingData.length
      setRating(avg)
      console.log(rating)
    }
    else
      setRating(0)
  }, [ratingData])
  useEffect(() => {
    dispatch(GetSubCategory())
  }, [SubCategoryStateData.length])

  useEffect(() => { dispatch(GetOrder()) }, [])
  useEffect(() => {
    if (orderStateData.length > 0) {
      let deliveredOrders = orderStateData.filter((x) => x.orderStatus === "Order delivered")
      let deliveredOrdersForThisProduct = deliveredOrders.filter((y) => y.products.some((c) => c.id === id))
      setBuyers(deliveredOrdersForThisProduct.length)
      console.log(buyers)
    }
  }, [orderStateData])
  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Product Details" />
        {/*start product details*/}
        <section className="py-4">
          <div className="container-fluid outline-dark">
            <div className="row g-4">
              <div className="col-12 col-xl-6">
                <div className="product-images">
                  <div className="product-zoom-images">
                    <div className="row row-cols-2 g-3">
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#fff',
                          '--swiper-pagination-color': '#fff',
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false, }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        className="mySwiper2"
                      >
                        {data.pic?.map((item, index) => {
                          return <SwiperSlide key={index}>
                            <div className="col">
                              <div
                                className="img-thumb-container overflow-hidden position-relative"
                                data-fancybox="gallery"
                                data-src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item}`}
                              >

                                <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item}`}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        })}
                      </Swiper>
                    </div>
                    <div className="row row-cols-2 mt-3 outline-dark">
                      <Swiper onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper">


                        {data.pic?.map((item, index) => {
                          return <SwiperSlide key={index}>
                            <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item}`} style={{ width: "100%", height: "100%", aspectRatio: "auto" }} />
                          </SwiperSlide>
                        })}
                      </Swiper>
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div className="product-info">
                  <h4 className="product-title fw-bold mb-1">{data.brand} {data.name}</h4>
                  <p className="mb-0">
                    {data.category} {data.SubCategory}
                  </p>
                  <div className="product-rating">
                    <div className="hstack gap-2 border p-1 mt-3 width-content">
                      <div>
                        <span className="rating-number">{rating.toFixed(1)}</span>
                        <i className="bi bi-star-fill ms-1 text-warning" />
                      </div>
                      <div className="vr" />
                      <div>{ratingData.length} Ratings</div>
                    </div>
                  </div>
                  <hr />
                  <div className="product-price d-flex align-items-center gap-3">
                    <div className="h4 fw-bold">&#8377;{data.finalPrice}</div>
                    <div className="h5 fw-light text-muted text-decoration-line-through">
                      <del>&#8377;{data.basePrice}</del>
                    </div>
                    <div className="h4 fw-bold text-danger">({data.discount}% off)</div>
                  </div>
                  <p className="fw-bold mb-0 mt-1 text-success">
                    inclusive of all taxes
                  </p>
                  <div className="more-colors mt-4">
                    <h6 className="fw-bold mb-3">More Colors</h6>
                    <div className="d-flex align-items-center gap-3">

                      {data.color?.map((item, index) => {
                        return <div key={index} className="">
                          <button type='button' name='color' className={`btn ${color.toLowerCase() === item.toLowerCase() ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setColor(item)} >
                            {item}
                          </button>
                        </div>
                      })}
                    </div>
                  </div>
                  {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                  <div className="more-colors mt-4">
                    <h6 className="fw-bold mb-3">Select Size</h6>
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      {data.size?.map((item, index) => {
                        return <div key={index} className="">
                          <button name='size' className={`btn ${size.toLowerCase() === item.toLowerCase() ? "btn-dark " : "btn-outline-dark"}`} type="button" onClick={() => setSize(item)}>
                            {item.toUpperCase()}
                          </button>
                        </div>
                      })}

                    </div>
                  </div>
                  {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                  {/* Quantity Counter */}
                  <div className='mt-3'>
                    <span className='text-dark'>Quantity</span>
                    <div className="row">
                      <div className="py-2 col-1 btn-group ">
                        <button className='btn btn-dark' onClick={() => { if (quantity > 1) { setQuantity(quantity - 1) } }}><i className='bi bi-dash'></i></button>
                        <div className='btn' >{quantity}</div>
                        <button className='btn btn-dark' onClick={() => { if (quantity < data.stockQuantity) { setQuantity(quantity + 1) } }}><i className='bi bi-plus'></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-buttons mt-3">
                    <div className="buttons d-flex flex-column flex-lg-row gap-3 mt-4">
                      {data.stockQuantity > 0 ? data.stock = true : false}
                      {data.stock === true ? <button
                        onClick={addToCart}
                        className="btn btn-lg btn-dark btn-ecomm px-5 py-3 col-lg-4"
                      >
                        <i className="bi bi-basket2 me-2" />
                        Add to bag
                      </button> : <button

                        className="btn btn-lg btn-dark btn-ecomm px-5 py-3 col-lg-4"
                      >
                        <i className="bi bi-basket2 me-2" />
                        Out Of Stock
                      </button>}

                      <button
                        onClick={addToWishlist}
                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3 col-lg-4"
                      >
                        <i className="bi bi-suit-heart me-2" />
                        Wishlist
                      </button>
                    </div>
                    <Toaster />
                  </div>
                  <hr className="my-3" />
                  <div className="product-info">
                    <h6 className="fw-bold mb-3">Product Details</h6>
                    <div><span dangerouslySetInnerHTML={{ __html: data.productDescription }} ></span></div>
                  </div>
                  <hr className="my-3" />
                  <div className="customer-ratings">
                    <h6 className="fw-bold mb-3">Customer Ratings</h6>
                    <div className="d-flex align-items-center gap-4 gap-lg-5 flex-wrap flex-lg-nowrap">
                      <div className="">
                        <h1 className="mb-2 fw-bold">
                          {rating.toFixed(1)}
                          <span className="fs-5 ms-2 text-warning">
                            <i className="bi bi-star-fill" />
                          </span>
                        </h1>
                        <p className="mb-0">{buyers} Verified Buyers</p>
                      </div>
                      <div className="vr d-none d-lg-block" />
                      <div className="w-100">
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">5</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${fiveStar / buyers * 100}%` }}
                            />
                          </div>
                          <p className="mb-0">{fiveStar}</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">4</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${fourStar / buyers * 100}%` }}
                            />
                          </div>
                          <p className="mb-0">{fourStar}</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">3</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: `${threeStar / buyers * 100}%` }}
                            />
                          </div>
                          <p className="mb-0">{threeStar}</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">2</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: `${twoStar / buyers * 100}%` }}
                            />
                          </div>
                          <p className="mb-0">{twoStar}</p>
                        </div>
                        <div className="rating-wrrap hstack gap-2 align-items-center">
                          <p className="mb-0">1</p>
                          <div className="">
                            <i className="bi bi-star" />
                          </div>
                          <div
                            className="progress flex-grow-1 mb-0 rounded-0"
                            style={{ height: 4 }}
                          >
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: `${oneStar / buyers * 100}%` }}
                            />
                          </div>
                          <p className="mb-0">{oneStar}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="customer-reviews">
                    <h6 className="fw-bold mb-3">Customer Reviews ({ratingData.length})</h6>
                    <div className="reviews-wrapper">
                      {ratingData.map((item) => {
                        return <div key={item.id} className="d-flex flex-column flex-lg-row gap-3">
                          <div className="">
                            <span className="badge bg-green rounded-0">
                              {item.rating}<i className="bi bi-star-fill ms-1" />
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-2">
                              {item.review}
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                              <div className="hstack flex-grow-1 gap-3">
                                <p className="mb-0">{item.BuyerName}</p>
                                <div className="vr" />
                                <div className="date-posted">12 June 2020</div>
                              </div>
                              <div className="hstack">
                                <div className="">
                                  <i className="bi bi-hand-thumbs-up me-2" />
                                  68
                                </div>
                                <div className="mx-3" />
                                <div className="">
                                  <i className="bi bi-hand-thumbs-down me-2" />
                                  24
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      })}

                      <hr />

                      <div className="text-center">
                        <a
                          href="javascript:;"
                          className="btn btn-ecomm btn-outline-dark"
                        >
                          View All Reviws
                          <i className="bi bi-arrow-right ms-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {relatedProducts.length ? < ProductSlider data={relatedProducts} title={"Similar Products"} /> : null}
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
    </>

  )
}
