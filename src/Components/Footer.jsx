import React, { useEffect, useState } from 'react'
import Newsletter from "../Components/Newsletter"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetSetting } from '../Redux/ActionCreators/SettingActionCreator'
import { DeleteCart, GetCart } from '../Redux/ActionCreators/CartActionCreator'
export default function Footer() {
  let settingStateData = useSelector(state => state.settingStateData)
  let cartStateData = useSelector(state => state.cartStateData)
  let [cart, setcart] = useState([])
  let [data, setData] = useState({
    map1: "",
    map2: "",
    email: "",
    address: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
    twitter: ""
  })
  let Dispatch = useDispatch()
  function removeItem(id) {
    Dispatch(DeleteCart({ id: id }))
  }

  useEffect(() => {
    Dispatch(GetSetting())

  }, [settingStateData.length])
  useEffect(() => {
    Dispatch(GetCart())
    if (cartStateData.length) {
      setcart(cartStateData.filter(x => x.userid === localStorage.getItem("userid")))
    }
  }, [cartStateData.length])
  useEffect(() => {
    if (settingStateData.length) {
      setData({
        map1: settingStateData[0].map1 ? settingStateData[0].map1 : import.meta.env.VITE_SITE_MAP1,
        map2: settingStateData[0].map2 ? settingStateData[0].map2 : import.meta.env.VITE_SITE_MAP2,
        address: settingStateData[0].address ? settingStateData[0].address : import.meta.env.VITE_SITE_ADDRESS,
        phone: settingStateData[0].phone ? settingStateData[0].phone : import.meta.env.VITE_SITE_PHONE,
        whatsapp: settingStateData[0].whatsapp ? settingStateData[0].whatsapp : import.meta.env.VITE_SITE_WHATSAPP,
        email: settingStateData[0].email ? settingStateData[0].email : import.meta.env.VITE_SITE_EMAIL,
        twitter: settingStateData[0].twitter ? settingStateData[0].twitter : import.meta.env.VITE_SITE_TWITTER,
        instagram: settingStateData[0].instagram ? settingStateData[0].instagram : import.meta.env.VITE_SITE_INSTAGRAM,
        facebook: settingStateData[0].facebook ? settingStateData[0].facebook : import.meta.env.VITE_SITE_FACEBOOK,
      })
    }
    else {
      setData({
        map1: import.meta.env.VITE_SITE_MAP1,
        map2: import.meta.env.VITE_SITE_MAP2,
        address: import.meta.env.VITE_SITE_ADDRESS,
        phone: import.meta.env.VITE_SITE_PHONE,
        whatsapp: import.meta.env.VITE_SITE_WHATSAPP,
        email: import.meta.env.VITE_SITE_EMAIL,
        twitter: import.meta.env.VITE_SITE_TWITTER,
        instagram: import.meta.env.VITE_SITE_INSTAGRAM,
        facebook: import.meta.env.VITE_SITE_FACEBOOK,
      })
    }
  }, [settingStateData])

  return (
    <>
      <Newsletter />
      {/*start footer*/}
      <section className="footer-section bg-section-2 section-padding bg-secondary">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            <div className="col">
              <div className="footer-widget-6">
                <img
                  src="assets/images/logo.webp"
                  className="logo-img mb-3"
                  alt=""
                />
                <h5 className="mb-3 fw-bold text-light">About Us</h5>
                <p className="mb-2 fw-bold text-light">
                  We provide a curated selection of quality products with reliable service. No gimmicks—just a seamless shopping experience built on trust, authenticity, and a passion for delivering value to you.
                </p>

              </div>
            </div>
            <div className="col">
              <div className="footer-widget-7">
                <h5 className="mb-3 fw-bold text-light mt-2">Quick Links</h5>
                <ul className="widget-link list-unstyled ">
                  <li>
                    <Link className='fw-bold text-light' to="/">Home</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="/about">About</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="/features">Features</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="/tesstimonial">Testimonial</Link>
                  </li>


                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-8">
                <h5 className="mb-3 fw-bold text-light mt-2">Policy</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link className='fw-bold text-light' to="#">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="#">Returns</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="#">Refunds</Link>
                  </li>
                  <li>
                    <Link className='fw-bold text-light' to="#">Privacy</Link>
                  </li>
                  <div className="mb-3 mt-3">
                    <h5 className="mb-0 fw-bold text-light">Address</h5>
                    <p className="mb-0 text-muted"><Link className='text-light' to={data.map1} target="_blank">{data.address}</Link></p>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 fw-bold text-light">Follow Us</h5>
                <div className="social-link d-flex align-items-center gap-2">
                  <Link to={data.facebook}>
                    <i className="fw-bold text-light bi bi-facebook" />
                  </Link>
                  <Link to={data.twitter}>
                    <i className="fw-bold text-light bi bi-twitter" />
                  </Link>
                  <Link to={data.instagram}>
                    <i className="fw-bold text-light bi bi-instagram" />
                  </Link>
                </div>
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 fw-bold text-light">Email</h5>
                  <p className="mb-0 text-light"><Link className='text-light' to={`mailto:${data.email}`}>{data.email}</Link></p>
                </div>
                <div className="">
                  <h5 className="mb-0 fw-bold text-light">Phonee</h5>
                  <p className="mb-0 text-light"><Link className='text-light' to={`tel:${data.phone}`}>{data.phone}</Link></p>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}

        </div>
      </section>
      {/*end footer*/}

      <footer className="footer-strip text-center py-3 bg-section-2 border-top positon-absolute bottom-0">
        <p className="mb-0 text-muted">
          © 2025 Saurav Tiwari | All rights reserved.
        </p>
      </footer>
      {/*start cart*/}

      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header bg-section-2">
          <h5 className="mb-0 fw-bold" id="offcanvasRightLabel">
            {cart.length} items in the cart
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        {cart.length ?
          <>
            <div className="offcanvas-body">
              <div className="cart-list">
                {cart.map((item,index) => {
                  return <div key={index}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bottom-product-img">
                        <a href="product-details.html">
                          <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}${item.pic[0]}`} width={60} alt="" />
                        </a>
                      </div>
                      <div className="">
                        <h6 className="mb-0 fw-light mb-1">{item.name}</h6>
                        <p className="mb-0">
                          <strong>{item.quantity} X &#8377;{item.finalPrice}</strong>
                        </p>
                      </div>
                      <div className="ms-auto fs-5">
                        <button onClick={() => { removeItem(item.id) }} className="btn btn-dark">
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>

                })}



              </div>
            </div>
            <div className="offcanvas-footer p-3 border-top">
              <div className="d-grid">
                <Link
                  to="/cart" data-bs-dismiss="offcanvas"
                  className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </>
          : <>
            <p className='text-center p-4'>Add Product to Cart</p>
            <div className="offcanvas-footer p-3 border-top">
              <div className="d-grid">
                <Link
                  to="/shop" data-bs-dismiss="offcanvas"
                  className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>}


      </div>
      {/*end cart*/}

      {/*start quick view*/}
      {/* Modal */}
      <div className="modal fade" id="QuickViewModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-0">
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12 col-xl-6">
                  <div className="wrap-modal-slider">
                    <div className="slider-for">
                      <div>
                        <img
                          src="assets/images/product-images/01.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/02.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/03.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/04.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="slider-nav mt-3">
                      <div>
                        <img
                          src="assets/images/product-images/01.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/02.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/03.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <img
                          src="assets/images/product-images/04.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="product-info">
                    <h4 className="product-title fw-bold mb-1">Check Pink Kurta</h4>
                    <p className="mb-0">
                      Women Pink &amp; Off-White Printed Kurta with Palazzos
                    </p>
                    <div className="product-rating">
                      <div className="hstack gap-2 border p-1 mt-3 width-content">
                        <div>
                          <span className="rating-number">4.8</span>
                          <i className="bi bi-star-fill ms-1 text-success" />
                        </div>
                        <div className="vr" />
                        <div>162 Ratings</div>
                      </div>
                    </div>
                    <hr />
                    <div className="product-price d-flex align-items-center gap-3">
                      <div className="h4 fw-bold">$458</div>
                      <div className="h5 fw-light text-muted text-decoration-line-through">
                        $2089
                      </div>
                      <div className="h4 fw-bold text-danger">(70% off)</div>
                    </div>
                    <p className="fw-bold mb-0 mt-1 text-success">
                      inclusive of all taxes
                    </p>
                    <div className="more-colors mt-3">
                      <h6 className="fw-bold mb-3">More Colors</h6>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <div className="color-box bg-red" />
                        <div className="color-box bg-primary" />
                        <div className="color-box bg-yellow" />
                        <div className="color-box bg-purple" />
                        <div className="color-box bg-green" />
                      </div>
                    </div>
                    <div className="size-chart mt-3">
                      <h6 className="fw-bold mb-3">Select Size</h6>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <div className="">
                          <button type="button" className="rounded-0">
                            XS
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="rounded-0">
                            S
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="rounded-0">
                            M
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="rounded-0">
                            L
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="rounded-0">
                            XL
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="rounded-0">
                            XXL
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-buttons mt-3">
                      <div className="buttons d-flex flex-column gap-3 mt-4">
                        <a
                          href="javascript:;"
                          className="btn btn-lg btn-dark btn-ecomm px-5 py-3 flex-grow-1"
                        >
                          <i className="bi bi-basket2 me-2" />
                          Add to Bag
                        </a>
                        <a
                          href="javascript:;"
                          className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-3"
                        >
                          <i className="bi bi-suit-heart me-2" />
                          Wishlist
                        </a>
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="product-share">
                      <h6 className="fw-bold mb-3">Share This Product</h6>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <div className="">
                          <button type="button" className="btn-social bg-twitter">
                            <i className="bi bi-twitter" />
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="btn-social bg-facebook">
                            <i className="bi bi-facebook" />
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="btn-social bg-linkden">
                            <i className="bi bi-linkedin" />
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="btn-social bg-youtube">
                            <i className="bi bi-youtube" />
                          </button>
                        </div>
                        <div className="">
                          <button type="button" className="btn-social bg-pinterest">
                            <i className="bi bi-pinterest" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end row*/}
            </div>
          </div>
        </div>
      </div>
      {/*end quick view*/}
      {/*Start Back To Top Button*/}
      <a href="javaScript:;" className="back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
      {/*End Back To Top Button*/}
    </>


  )
}
